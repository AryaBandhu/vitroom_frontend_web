import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { API_BASE_URL } from "@/lib/api"
import type { Plan } from "@/lib/types"

export function PublicPricingPage() {
  const { isAuthenticated } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch(`${API_BASE_URL}/subscriptions/plans-public/`)
      .then((r) => r.json())
      .then((data) => {
        if (active) setPlans(data)
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0">
                  Get started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400">
              <Sparkles className="mr-1 h-3 w-3" />
              Pricing
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free with 3 credits. Upgrade when you need more.
            </p>
          </div>

          {loading ? (
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Card
                  key={plan.id}
                  className={
                    "relative flex flex-col transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10" +
                    (index === 1
                      ? " border-orange-500/50 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/30"
                      : "")
                  }
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0 px-3">
                        Most popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        ₹{plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        / {plan.duration_days} days
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span className="text-muted-foreground">
                          {plan.unlimited
                            ? "Unlimited AI generations"
                            : `${plan.credits_granted} AI generations`}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span className="text-muted-foreground">
                          All design styles & themes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span className="text-muted-foreground">
                          Up to 4 samples per generation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span className="text-muted-foreground">
                          {plan.duration_days} days access
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to={isAuthenticated ? "/pricing" : "/login"} className="w-full">
                      <Button
                        className={
                          "w-full gap-2" +
                          (index === 1
                            ? " bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0"
                            : "")
                        }
                        variant={index === 1 ? "default" : "outline"}
                      >
                        Get started <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Payments are securely processed by Cashfree. All major cards, UPI, and netbanking supported.
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
