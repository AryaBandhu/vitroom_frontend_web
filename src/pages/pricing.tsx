import { useEffect, useState } from "react"
import { Check, Loader2, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { subscriptionApi } from "@/lib/api"
import type { Plan } from "@/lib/types"
import { useAuth } from "@/context/auth-context"
import { startCashfreeCheckout } from "@/lib/cashfree"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export function PricingPage() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [purchasingId, setPurchasingId] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    subscriptionApi
      .plans()
      .then((res) => {
        if (active) setPlans(res)
      })
      .catch(() => toast.error("Could not load plans"))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleBuy = async (plan: Plan) => {
    if (!user) {
      navigate("/login")
      return
    }
    setPurchasingId(plan.id)
    try {
      const { orderId } = await startCashfreeCheckout({ planId: plan.id, user })
      // Verify payment on backend
      await subscriptionApi.verifyPayment({ plan_id: plan.id, order_id: orderId })
      await refreshUser()
      toast.success("Subscription activated successfully!")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Payment could not be completed"
      if (message !== "Payment cancelled") toast.error(message)
    } finally {
      setPurchasingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 h-3 w-3" />
          Pricing
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Subscribe for unlimited designs
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Choose a plan that fits your needs. Subscribers get unlimited AI
          generations.
        </p>
      </div>

      {loading ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={
                "relative flex flex-col" +
                (index === 1
                  ? " border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                  : "")
              }
            >
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-3">Most popular</Badge>
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
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">
                      {plan.unlimited
                        ? "Unlimited AI generations"
                        : `${plan.credits_granted} AI generations`}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">
                      All design styles & themes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">
                      Up to 4 samples per generation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">
                      {plan.duration_days} days access
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => handleBuy(plan)}
                  disabled={purchasingId !== null}
                >
                  {purchasingId === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {user && !user.is_subscribed && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          You currently have {user.credits} free credits remaining.
        </p>
      )}

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Payments are securely processed by Cashfree. All major cards, UPI, and
        netbanking supported.
      </p>
    </div>
  )
}
