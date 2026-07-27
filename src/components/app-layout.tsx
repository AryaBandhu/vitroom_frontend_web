import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/navbar"

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
