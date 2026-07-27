import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Crown, History, ImageIcon, Plus, Sparkles, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/empty-state"
import { GenerationCard } from "@/components/generation-card"
import { useAuth } from "@/context/auth-context"
import { generationApi } from "@/lib/api"
import type { Generation } from "@/lib/types"

export function DashboardPage() {
  const { user, refreshUser } = useAuth()
  const [history, setHistory] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    refreshUser()
    generationApi.history()
      .then((data) => { if (active) setHistory(data) })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Welcome back, <span className="gradient-text">{user.first_name || user.username}</span> 👋
          </h1>
          <p className="mt-1 text-muted-foreground">Ready to try on another outfit?</p>
        </div>
        <Link to="/generate">
          <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0 shadow-lg shadow-orange-500/20">
            <Plus className="size-4" /> New Try-On
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="border-border hover:border-orange-500/30 transition-colors">
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-500">
              {user.is_subscribed ? <Crown className="size-6" /> : <Sparkles className="size-6" />}
            </span>
            <div>
              <p className="text-sm text-muted-foreground">{user.credits === -1 ? "Generations" : "Credits remaining"}</p>
              <p className="text-2xl font-extrabold gradient-text">{user.credits === -1 ? "∞" : user.credits}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:border-fuchsia-500/30 transition-colors">
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500">
              <Crown className="size-6" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Subscription</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-2xl font-extrabold">{user.is_subscribed ? "Active" : "Free"}</p>
                {user.is_subscribed ? (
                  <Badge className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0 text-xs">Subscribed</Badge>
                ) : (
                  <Link to="/pricing">
                    <Badge variant="outline" className="cursor-pointer border-orange-500/40 text-orange-500 text-xs hover:bg-orange-500/10">Upgrade</Badge>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:border-orange-500/30 transition-colors">
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 text-orange-500">
              <ImageIcon className="size-6" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Total try-ons</p>
              <p className="text-2xl font-extrabold gradient-text">{loading ? "—" : history.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History className="size-5 text-orange-500" /> Your generations
          </h2>
          {history.length > 0 && (
            <Link to="/history" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
              View all →
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <EmptyState
            icon={Wand2}
            title="No try-ons yet"
            description="Upload your photo and a clothing item to see how it looks on you. Your results will appear here."
            action={
              <Link to="/generate">
                <Button className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0">
                  <Plus className="size-4" /> Try your first outfit
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {history.slice(0, 6).map((gen) => (
              <GenerationCard key={gen.id} generation={gen} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
