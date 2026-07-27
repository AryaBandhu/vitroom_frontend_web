import { Coins, Infinity as InfinityIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { User } from "@/lib/types"

export function CreditsBadge({ user, className }: { user: User; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
      user.credits === -1
        ? "border-fuchsia-500/30 bg-gradient-to-r from-orange-500/10 to-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400"
        : "border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400",
      className,
    )}>
      {user.credits === -1 ? (
        <><InfinityIcon className="size-4" /><span>Unlimited</span></>
      ) : (
        <><Coins className="size-4" /><span>{user.credits} credits</span></>
      )}
    </span>
  )
}
