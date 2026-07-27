import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Download } from "lucide-react"
import { generationApi, mediaUrl } from "@/lib/api"
import { downloadImage } from "@/lib/download"
import type { Generation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

export function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let active = true
    generationApi.detail(id)
      .then((data) => { if (active) setGeneration(data) })
      .catch(() => toast.error("Could not load details."))
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="aspect-[3/4] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!generation) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-center">
        <p className="text-muted-foreground">Generation not found.</p>
        <Link to="/history">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to history
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link to="/history" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to history
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">
          {generation.occasion.name} · {generation.fit_preference.name}
        </h1>
        <StatusBadge status={generation.status} />
      </div>

      {/* Metadata */}
      <Card className="mb-6">
        <CardContent className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Body Type</p>
            <p className="font-medium">{generation.body_type.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Fit Preference</p>
            <p className="font-medium">{generation.fit_preference.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Occasion</p>
            <p className="font-medium">{generation.occasion.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Samples</p>
            <p className="font-medium">{generation.num_samples}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="font-medium">{formatDate(generation.created_at)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="font-medium">{formatDate(generation.completed_at)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-medium capitalize">{generation.status}</p>
          </div>
        </CardContent>
      </Card>

      {/* Input Images */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Your Photo</h2>
          <img
            src={mediaUrl(generation.person_image)}
            alt="Person"
            className="w-full rounded-xl border object-cover aspect-[3/4]"
            crossOrigin="anonymous"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Clothing Item</h2>
          <img
            src={mediaUrl(generation.cloth_image)}
            alt="Clothing"
            className="w-full rounded-xl border object-cover aspect-[3/4]"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {/* Generated Images */}
      {generation.images.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-3">Try-On Results</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {generation.images.map((img, i) => (
              <div key={img.id} className="space-y-3">
                <div className="overflow-hidden rounded-xl border">
                  <img
                    src={mediaUrl(img.image)}
                    alt={`Try-on result ${i + 1}`}
                    className="aspect-[3/4] w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <Button
                  size="sm"
                  className="w-full gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0"
                  onClick={() => downloadImage(img.image, `vitroom-${generation.id}-${i + 1}.jpg`)}
                >
                  <Download className="h-4 w-4" /> Download Image
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

      {generation.error_message && (
        <Card className="mt-6 border-destructive/50">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{generation.error_message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
