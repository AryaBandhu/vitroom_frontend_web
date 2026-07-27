import { Link } from "react-router-dom"
import { Mail, MapPin, Building2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "support@kalkinso.in",
    href: "mailto:support@kalkinso.in",
  },
  {
    icon: Building2,
    title: "Company",
    value: "Kalkinso Software (OPC) Private Limited",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "506 SHUKL PURE NANHA, SHUKL AINDHA, Aindha, Pratapgarh, Kunda, Uttar Pradesh, India, 230204",
  },
]

export function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400">
          Contact
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Have questions about viTroom, feedback, or need support? Reach out to us and we'll get back to you as soon as possible.
        </p>

        <div className="mt-12 grid gap-6">
          {contactDetails.map((item) => (
            <Card key={item.title} className="hover:border-orange-500/30 transition-colors">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 text-orange-500">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="mt-1 text-sm text-orange-500 hover:underline">{item.value}</a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-fuchsia-500/5 p-6">
          <p className="text-sm text-muted-foreground">
            For privacy-related queries, account deletion requests, or legal matters, email us at{" "}
            <a href="mailto:support@kalkinso.in" className="text-orange-500 hover:underline">support@kalkinso.in</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
