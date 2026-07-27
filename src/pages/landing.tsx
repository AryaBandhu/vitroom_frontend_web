import { Link } from "react-router-dom"
import { ArrowRight, Image as ImageIcon, Shirt, Sparkles, Star, Wand2, Zap, Shield, Clock } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThreeBackground } from "@/components/three-background"
import { useAuth } from "@/context/auth-context"

const steps = [
  { icon: ImageIcon, title: "Upload your photo", desc: "Take a clear photo of yourself — full body works best for the most accurate try-on.", color: "from-orange-500 to-amber-400" },
  { icon: Shirt, title: "Upload the clothing", desc: "Add a photo of any clothing item you want to try on — from any store or website.", color: "from-fuchsia-500 to-pink-400" },
  { icon: Wand2, title: "See yourself in it", desc: "AI generates a photorealistic image of you wearing the outfit in seconds.", color: "from-orange-500 to-fuchsia-500" },
]

const features = [
  { icon: Zap, title: "Instant results", desc: "AI generates your try-on in under 30 seconds." },
  { icon: Shield, title: "Privacy first", desc: "Your photos are never shared or used for training." },
  { icon: Clock, title: "Full history", desc: "All your try-ons saved and accessible anytime." },
  { icon: Sparkles, title: "Any clothing", desc: "Tops, dresses, jackets, ethnic wear and more." },
]

const testimonials = [
  { name: "Ananya Sharma", role: "Fashion enthusiast, Bengaluru", quote: "I tried on 20 outfits before buying anything. Saved me so many returns and so much money!" },
  { name: "Rahul Mehta", role: "Online shopper", quote: "I always struggled with online shopping. Now I can see exactly how clothes will look on my body before ordering." },
  { name: "Priya Nair", role: "Stylist, Mumbai", quote: "I use this to show clients outfit options instantly. It's completely changed how I work with them." },
]

export function LandingPage() {
  const { isAuthenticated } = useAuth()
  const startHref = isAuthenticated ? "/generate" : "/login"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/plans" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
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
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">Sign in</Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <ThreeBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32 z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 gap-2 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400 px-4 py-1.5">
              <Sparkles className="size-3.5" />
              Powered by Generative AI
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
              <span className="gradient-text">Try on</span> any outfit
              <br />before you <span className="gradient-text">buy</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Upload your photo and any clothing item. Our AI generates a photorealistic image of you wearing it — in seconds. No fitting room required.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to={startHref}>
                <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0 shadow-lg shadow-orange-500/30 px-8 text-base">
                  Try it free <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/plans">
                <Button size="lg" variant="outline" className="px-8 text-base border-orange-500/30 hover:border-orange-500/60">
                  View pricing
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              ✨ Start free with 20 credits — no credit card required
            </p>
          </div>

          {/* Before/After */}
          <div className="mt-20 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="space-y-2">
              <Badge variant="outline" className="bg-card/80 backdrop-blur">Before</Badge>
              <div className="aspect-[3/4] rounded-2xl border border-border bg-muted overflow-hidden shadow-xl">
                <img src="/hero-before.jpg" alt="Before" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-2 pt-8">
              <Badge className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white border-0 gap-1">
                <Sparkles className="size-3" /> After
              </Badge>
              <div className="aspect-[3/4] rounded-2xl border border-orange-500/30 bg-muted overflow-hidden shadow-2xl glow-orange">
                <img src="/hero-after.jpg" alt="After" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3">How it works</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three steps to your perfect outfit</h2>
            <p className="mt-3 text-muted-foreground">Simple, fast, and stunning results every time.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={step.title} className="relative overflow-hidden border-border hover:border-orange-500/40 transition-colors group">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                    <step.icon className="size-7" />
                  </div>
                  <span className="absolute right-6 top-6 text-5xl font-black text-muted/20">0{i + 1}</span>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-3">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to shop smarter</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Virtual try-on technology that actually works — no AR glasses needed.</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 text-orange-500">
                    <f.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl" />
            <img src="/hero-after.jpg" alt="AI try-on result" className="relative rounded-2xl border border-orange-500/20 shadow-2xl w-full object-cover aspect-[3/4]" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by shoppers & stylists</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="hover:border-orange-500/30 transition-colors">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5 text-orange-500">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
                  <div className="mt-auto pt-2 border-t border-border">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-fuchsia-500/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to try on your next outfit?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Join thousands shopping smarter with AI. Get your first 20 try-ons free.</p>
          <Link to={startHref} className="mt-8 inline-block">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-600 hover:to-fuchsia-700 text-white border-0 shadow-lg shadow-orange-500/30 px-10 text-base">
              Try it free <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Logo />
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">AI-powered virtual try-on for everyone. See yourself in any outfit in seconds.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/generate" className="hover:text-foreground transition-colors">Try On</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/history" className="hover:text-foreground transition-colors">History</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} viTroom. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
