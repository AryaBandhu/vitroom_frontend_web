import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { Download, Loader2, Sparkles, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ImageUploader } from "@/components/image-uploader"
import { CreditsBadge } from "@/components/credits-badge"
import { useAuth } from "@/context/auth-context"
import { generationApi, mediaUrl } from "@/lib/api"
import { downloadImage } from "@/lib/download"
import type { Generation, GenerationOptions, Option } from "@/lib/types"

function OptionSelect({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: Option[]; placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="border-border focus:ring-orange-500/30">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={String(o.id)}>{o.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function GeneratePage() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()

  const [options, setOptions] = useState<GenerationOptions | null>(null)
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [personFile, setPersonFile] = useState<File | null>(null)
  const [clothFile, setClothFile] = useState<File | null>(null)
  const [bodyType, setBodyType] = useState("")
  const [fitPreference, setFitPreference] = useState("")
  const [occasion, setOccasion] = useState("")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<Generation | null>(null)

  useEffect(() => {
    let active = true
    generationApi.options()
      .then((data) => { if (active) setOptions(data) })
      .catch(() => toast.error("Could not load options."))
      .finally(() => { if (active) setOptionsLoading(false) })
    return () => { active = false }
  }, [])

  const noCredits = Boolean(user && !user.is_subscribed && user.credits <= 0)
  const canSubmit = personFile && clothFile && bodyType && fitPreference && occasion && !generating && !noCredits

  async function handleGenerate() {
    if (!personFile || !clothFile || !bodyType || !fitPreference || !occasion) {
      toast.error("Please upload both photos and fill in all options.")
      return
    }
    const formData = new FormData()
    formData.append("person_image", personFile)
    formData.append("cloth_image", clothFile)
    formData.append("body_type_id", bodyType)
    formData.append("fit_preference_id", fitPreference)
    formData.append("occasion_id", occasion)
    formData.append("num_samples", "1")

    setGenerating(true)
    setResult(null)
    try {
      const gen = await generationApi.generate(formData)
      setResult(gen)
      if (gen.status === "failed") {
        toast.error(gen.error_message || "Generation failed. Please try again.")
      } else {
        toast.success("Your try-on is ready! ✨")
      }
      refreshUser()
    } catch (err) {
      const ax = err as AxiosError<{ error?: string }>
      if (ax.response?.status === 402) {
        toast.error(ax.response.data?.error || "No credits remaining.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            <span className="gradient-text">Try On</span> a clothing item
          </h1>
          <p className="mt-1 text-muted-foreground">Upload your photo and a clothing item, and let AI dress you up.</p>
        </div>
        {user && <CreditsBadge user={user} />}
      </div>

      {noCredits && (
        <Card className="mb-6 border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-fuchsia-500/5">
          <CardContent className="flex flex-col items-center justify-between gap-3 p-5 sm:flex-row">
            <p className="text-sm">You're out of credits. Subscribe to keep generating unlimited try-ons.</p>
            <Link to="/pricing">
              <Button className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0">
                <Sparkles className="size-4" /> View plans
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Your photo</Label>
            <ImageUploader label="person" file={personFile} onChange={setPersonFile} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Clothing item photo</Label>
            <ImageUploader label="cloth" file={clothFile} onChange={setClothFile} />
          </div>

          <Card className="border-border">
            <CardContent className="space-y-5 p-6">
              {optionsLoading || !options ? (
                <div className="grid grid-cols-1 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <OptionSelect label="Body type" value={bodyType} onChange={setBodyType} options={options.body_types} placeholder="Select body type" />
                  <OptionSelect label="Fit preference" value={fitPreference} onChange={setFitPreference} options={options.fit_preferences} placeholder="Select fit" />
                  <OptionSelect label="Occasion" value={occasion} onChange={setOccasion} options={options.occasions} placeholder="Select occasion" />
                </div>
              )}

              <Button
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0 shadow-lg shadow-orange-500/20"
                disabled={!canSubmit}
                onClick={handleGenerate}
              >
                {generating ? (
                  <><Loader2 className="size-4 animate-spin" /> Generating…</>
                ) : (
                  <><Wand2 className="size-4" /> Try It On</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: result */}
        <div>
          <Card className="min-h-[400px] border-border">
            <CardContent className="p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="size-4 text-orange-500" /> Result
              </h2>

              {generating ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-fuchsia-500/30 rounded-2xl blur-xl animate-pulse" />
                    <span className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20">
                      <Sparkles className="size-10 text-orange-500 animate-pulse" />
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">Creating your try-on…</p>
                    <p className="text-sm text-muted-foreground">This can take 10–30 seconds. Hang tight!</p>
                  </div>
                  <Skeleton className="aspect-[3/4] w-full rounded-xl mt-4" />
                </div>
              ) : result && result.images.length > 0 ? (
                <div className="space-y-4">
                  {result.images.map((img, i) => (
                    <div key={img.id} className="space-y-3">
                      <div className="group relative overflow-hidden rounded-xl border border-orange-500/20">
                        <img
                          src={mediaUrl(img.image)}
                          alt={`Try-on result ${i + 1}`}
                          className="w-full object-cover rounded-xl"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                          <Badge className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0 text-xs">
                            {result.fit_preference.name} · {result.occasion.name}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0"
                        onClick={() => downloadImage(img.image, `vitroom-${result.id}-${i + 1}.jpg`)}
                      >
                        <Download className="size-4" /> Download Image
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full border-orange-500/30 hover:border-orange-500/60" onClick={() => navigate(`/history/${result.id}`)}>
                    View details
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-muted-foreground">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-fuchsia-500/10 rounded-2xl blur-xl" />
                    <span className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/10 to-fuchsia-500/10">
                      <Wand2 className="size-10 text-orange-500/50" />
                    </span>
                  </div>
                  <p className="max-w-xs text-sm">Your try-on result will appear here. Upload your photo, a clothing item, and hit Try It On.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
