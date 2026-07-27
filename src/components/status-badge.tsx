import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { GenerationStatus } from "@/lib/types"

const config: Record<
  GenerationStatus,
  { label: string; variant: "success" | "warning" | "destructive" | "secondary"; icon: typeof Clock; spin?: boolean }
> = {
  completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
  processing: { label: "Processing", variant: "warning", icon: Loader2, spin: true },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  failed: { label: "Failed", variant: "destructive", icon: XCircle },
}

export function StatusBadge({ status }: { status: GenerationStatus }) {
  const c = config[status] ?? config.pending
  const Icon = c.icon
  return (
    <Badge variant={c.variant}>
      <Icon className={c.spin ? "size-3 animate-spin" : "size-3"} />
      {c.label}
    </Badge>
  )
}
