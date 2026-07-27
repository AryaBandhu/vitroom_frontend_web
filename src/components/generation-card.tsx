import { Link } from "react-router-dom"
import { ImageOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { mediaUrl } from "@/lib/api"
import type { Generation } from "@/lib/types"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}

export function GenerationCard({ generation }: { generation: Generation }) {
  const preview = generation.images[0]
  const thumb = preview ? mediaUrl(preview.image) : mediaUrl(generation.person_image)

  return (
    <Link to={`/history/${generation.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 group-hover:border-orange-500/40 group-hover:shadow-lg group-hover:shadow-orange-500/10">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {thumb ? (
            <img
              src={thumb}
              alt={`${generation.occasion.name} try-on`}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <ImageOff className="size-8" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute left-3 top-3">
            <StatusBadge status={generation.status} />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <h3 className="truncate font-bold text-sm group-hover:text-orange-500 transition-colors">
            {generation.occasion.name} · {generation.fit_preference.name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {generation.body_type.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{formatDate(generation.created_at)}</p>
        </div>
      </Card>
    </Link>
  )
}
