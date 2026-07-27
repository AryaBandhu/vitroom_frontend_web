import { useEffect, useState } from "react"
import { History as HistoryIcon, Wand2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { generationApi } from "@/lib/api"
import type { Generation } from "@/lib/types"
import { GenerationCard } from "@/components/generation-card"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export function HistoryPage() {
  const navigate = useNavigate()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    let active = true
    generationApi
      .history()
      .then((data) => {
        if (active) setGenerations(data)
      })
      .catch(() => toast.error("Failed to load history"))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const filtered =
    statusFilter === "all"
      ? generations
      : generations.filter((g) => g.status === statusFilter)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your History
          </h1>
          <p className="mt-1 text-muted-foreground">
            Browse every outfit you&apos;ve tried on.
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title="No try-ons yet"
          description="Once you try on a clothing item, all your results will appear here."
          action={
            <Link to="/generate">
              <Button>
                <Wand2 className="mr-2 h-4 w-4" />
                Create your first try-on
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <GenerationCard key={g.id} generation={g} />
          ))}
        </div>
      )}
    </div>
  )
}
