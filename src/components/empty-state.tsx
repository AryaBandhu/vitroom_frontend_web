import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export function EmptyState({ icon: Icon, title, description, action }: {
  icon: LucideIcon; title: string; description: string; action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-fuchsia-500/5 px-6 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 text-orange-500">
        <Icon className="size-8" />
      </span>
      <div className="max-w-sm space-y-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}
