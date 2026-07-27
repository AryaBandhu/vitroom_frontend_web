import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThreeBackground } from "@/components/three-background"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { authApi } from "@/lib/api"

type Step = "register" | "verify"

export function SignupPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>("register")
  const [submitting, setSubmitting] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")

  // register form
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "", confirm_password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // otp
  const [otp, setOtp] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match.")
      return
    }
    setSubmitting(true)
    try {
      await authApi.signup(form)
      setRegisteredEmail(form.email)
      toast.success("OTP sent to your email. Please verify.")
      setStep("verify")
    } catch (err: any) {
      const data = err?.response?.data
      if (data && typeof data === "object") {
        const first = Object.values(data).flat()[0]
        if (typeof first === "string") { toast.error(first); return }
      }
      toast.error("Signup failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await authApi.verifyEmail(registeredEmail, otp)
      login(res.user, res.tokens)
      toast.success(`Welcome, ${res.user.first_name || res.user.email.split("@")[0]}! 🎉 You have 3 free credits.`)
      navigate("/dashboard", { replace: true })
    } catch {
      toast.error("Invalid or expired OTP.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResend() {
    try {
      await authApi.signup({ ...form, email: registeredEmail })
    } catch {
      // ignore — user already exists, backend still resends
    }
    toast.success("OTP resent to your email.")
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      <ThreeBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background pointer-events-none" />

      <header className="relative z-10 flex h-16 items-center justify-between px-4 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="relative mx-auto mb-5 flex size-16 items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-fuchsia-600 rounded-2xl blur-lg opacity-50 animate-pulse" />
              <span className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white shadow-xl">
                <Sparkles className="size-8" />
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {step === "register" ? <>Create your <span className="gradient-text">Spacia</span> account</> : "Verify your email"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {step === "register" ? "Start redesigning your space with AI — free." : `We sent a 6-digit OTP to ${registeredEmail}`}
            </p>
          </div>

          <Card className="border-orange-500/20 shadow-2xl shadow-orange-500/10 backdrop-blur-sm bg-card/90">
            <CardContent className="p-8">
              {step === "register" ? (
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input id="first_name" name="first_name" placeholder="John" value={form.first_name} onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input id="last_name" name="last_name" placeholder="Doe" value={form.last_name} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={handleChange} required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <div className="relative">
                      <Input id="confirm_password" name="confirm_password" type={showConfirm ? "text" : "password"} placeholder="••••••••" value={form.confirm_password} onChange={handleChange} required />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white mt-1">
                    {submitting ? <Loader2 className="size-4 animate-spin" /> : "Create Account"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-500 hover:underline font-medium">Sign in</Link>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      placeholder="6-digit OTP"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="text-center text-2xl tracking-widest"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white">
                    {submitting ? <Loader2 className="size-4 animate-spin" /> : "Verify & Continue"}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <button type="button" onClick={() => setStep("register")} className="text-muted-foreground hover:text-foreground transition-colors">
                      ← Change email
                    </button>
                    <button type="button" onClick={handleResend} className="text-orange-500 hover:underline">
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <Link to="/terms" className="text-orange-500 hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}
