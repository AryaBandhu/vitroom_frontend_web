import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <img src="/icon.png" alt="logo" className="size-9 rounded-xl" />
      <span className="font-bold text-xl tracking-tight gradient-text">
        viTroom
      </span>
    </Link>
  )
}
