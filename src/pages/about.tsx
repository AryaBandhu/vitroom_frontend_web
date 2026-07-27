import { Link } from "react-router-dom"
import { ArrowRight, Heart, Lightbulb, Shield, Sparkles, Users, Zap } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We push the boundaries of what AI can do for everyday fashion and shopping." },
  { icon: Heart, title: "Accessibility", desc: "Virtual try-on should be available to everyone, not just those with expensive tools." },
  { icon: Shield, title: "Privacy", desc: "Your photos and data are yours. We never share or train on your uploads." },
  { icon: Users, title: "Community", desc: "Built for shoppers, fashion lovers, stylists, and creators alike." },
]

const stats = [
  { value: "50K+", label: "Outfits tried on" },
  { value: "6+", label: "Occasion styles" },
  { value: "< 30s", label: "Average generation time" },
  { value: "4.9★", label: "User rating" },
]

export function AboutPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/dashboard"><Button className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0">Dashboard</Button></Link>
            ) : (
              <Link to="/login"><Button className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0">Sign in</Button></Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-fuchsia-500/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <Badge className="mb-6 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400">
            <Sparkles className="size-3.5 mr-1" /> Our Story
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            We believe everyone deserves to <span className="gradient-text">look their best</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            viTroom was born from a simple idea: what if anyone could see exactly how a clothing item looks on them before buying? We built the AI tools to make that possible.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold gradient-text">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <Badge variant="secondary" className="mb-3">Our Mission</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Democratizing fashion with AI</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Buying clothes online is a gamble — sizes vary, colors look different on screen, and returns are a hassle. We built viTroom to eliminate that problem — giving everyone the power to see exactly how any outfit looks on their own body before buying.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our AI understands body types, fabric draping, fit preferences, and styling for different occasions. It doesn't just overlay a garment — it genuinely renders you wearing it.
            </p>
            <Link to="/generate" className="mt-8 inline-block">
              <Button className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0">
                Try it free <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl" />
            <div className="relative grid grid-cols-2 gap-3">
              {values.map((v) => (
                <Card key={v.title} className="hover:border-orange-500/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 text-orange-500 mb-3">
                      <v.icon className="size-5" />
                    </div>
                    <p className="font-semibold text-sm">{v.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <Zap className="size-10 mx-auto mb-4 text-orange-500" />
          <h2 className="text-3xl font-bold">Ready to try on your next outfit?</h2>
          <p className="mt-3 text-muted-foreground">Start with 20 free credits. No credit card required.</p>
          <Link to={isAuthenticated ? "/generate" : "/login"} className="mt-8 inline-block">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0 shadow-lg shadow-orange-500/30">
              Get started free <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

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
