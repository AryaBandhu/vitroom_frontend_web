import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
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
import { renderGoogleButton } from "@/lib/google"

type Tab = "google" | "email"
type ForgotStep = "email" | "otp" | "reset"

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const buttonRef = useRef<HTMLDivElement>(null)

  const [tab, setTab] = useState<Tab>("google")
  const [submitting, setSubmitting] = useState(false)
  const [gsiError, setGsiError] = useState(false)

  // email login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // forgot password
  const [showForgot, setShowForgot] = useState(false)
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email")
  const [forgotEmail, setForgotEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const from = (location.state as { from?: string } | null)?.from || "/dashboard"

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    if (tab !== "google" || !buttonRef.current) return
    let mounted = true

    async function handleCredential(idToken: string) {
      setSubmitting(true)
      try {
        const res = await authApi.googleLogin(idToken)
        if (!mounted) return
        login(res.user, res.tokens)
        const name = res.user.username || res.user.email?.split("@")[0] || "there"
        toast.success(res.is_new_user ? `Welcome, ${name}! 🎉 You have 3 free credits.` : `Welcome back, ${name}! 👋`)
        navigate(from, { replace: true })
      } catch {
        if (!mounted) return
        toast.error("Sign-in failed. Please try again.")
        setSubmitting(false)
      }
    }

    renderGoogleButton(buttonRef.current, handleCredential).catch((err) => {
      console.error("GSI load error:", err)
      if (mounted) setGsiError(true)
    })

    return () => { mounted = false }
  }, [tab])

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await authApi.emailLogin(email, password)
      login(res.user, res.tokens)
      const name = res.user.first_name || res.user.email.split("@")[0]
      toast.success(`Welcome back, ${name}! 👋`)
      navigate(from, { replace: true })
    } catch {
      toast.error("Invalid email or password.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleForgotEmail(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await authApi.forgotPassword(forgotEmail)
      toast.success("OTP sent to your email.")
      setForgotStep("otp")
    } catch {
      toast.error("Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await authApi.verifyOtp(forgotEmail, otp)
      toast.success("OTP verified.")
      setForgotStep("reset")
    } catch {
      toast.error("Invalid or expired OTP.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }
    setSubmitting(true)
    try {
      await authApi.resetPassword(forgotEmail, otp, newPassword, confirmPassword)
      toast.success("Password reset successful. Please log in.")
      setShowForgot(false)
      setForgotStep("email")
      setForgotEmail("")
      setOtp("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      toast.error("Failed to reset password. Try again.")
    } finally {
      setSubmitting(false)
    }
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
              Welcome to <span className="gradient-text">Spacia</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Sign in to start redesigning your space with AI.</p>
          </div>

          <Card className="border-orange-500/20 shadow-2xl shadow-orange-500/10 backdrop-blur-sm bg-card/90">
            <CardContent className="p-8">
              {showForgot ? (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-center">
                    {forgotStep === "email" && "Forgot Password"}
                    {forgotStep === "otp" && "Enter OTP"}
                    {forgotStep === "reset" && "Reset Password"}
                  </h2>

                  {forgotStep === "email" && (
                    <form onSubmit={handleForgotEmail} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="forgot-email">Email</Label>
                        <Input id="forgot-email" type="email" placeholder="you@example.com" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white">
                        {submitting ? <Loader2 className="size-4 animate-spin" /> : "Send OTP"}
                      </Button>
                    </form>
                  )}

                  {forgotStep === "otp" && (
                    <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground text-center">OTP sent to <strong>{forgotEmail}</strong></p>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="otp">OTP</Label>
                        <Input id="otp" type="text" placeholder="6-digit OTP" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} required />
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white">
                        {submitting ? <Loader2 className="size-4 animate-spin" /> : "Verify OTP"}
                      </Button>
                    </form>
                  )}

                  {forgotStep === "reset" && (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input id="new-password" type={showNew ? "text" : "password"} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Input id="confirm-password" type={showConfirm ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white">
                        {submitting ? <Loader2 className="size-4 animate-spin" /> : "Reset Password"}
                      </Button>
                    </form>
                  )}

                  <button onClick={() => { setShowForgot(false); setForgotStep("email") }} className="text-sm text-muted-foreground hover:text-foreground text-center transition-colors">
                    ← Back to login
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Tabs */}
                  <div className="flex rounded-lg bg-muted p-1 gap-1">
                    <button onClick={() => setTab("google")} className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${tab === "google" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      Google
                    </button>
                    <button onClick={() => setTab("email")} className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${tab === "email" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      Email
                    </button>
                  </div>

                  {submitting ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-muted-foreground">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-fuchsia-500/30 rounded-full blur-lg animate-pulse" />
                        <Loader2 className="relative size-8 animate-spin text-orange-500" />
                      </div>
                      <p className="text-sm">Signing you in…</p>
                    </div>
                  ) : (
                    <>
                      {tab === "google" && (
                        <>
                          <div ref={buttonRef} className="flex min-h-[44px] justify-center w-full" />
                          {gsiError && (
                            <p className="text-center text-sm text-destructive">
                              Could not load Google Sign-In. Please disable any ad blockers and refresh.
                            </p>
                          )}
                        </>
                      )}

                      {tab === "email" && (
                        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password">Password</Label>
                              <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-orange-500 hover:underline">
                                Forgot password?
                              </button>
                            </div>
                            <div className="relative">
                              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                              </button>
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white">
                            Sign In
                          </Button>
                          <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-orange-500 hover:underline font-medium">Sign up</Link>
                          </p>
                        </form>
                      )}

                      <div className="w-full rounded-xl bg-gradient-to-r from-orange-500/10 to-fuchsia-500/10 border border-orange-500/20 p-4 text-center">
                        <p className="text-sm font-medium">🎉 New users get <span className="text-orange-500 font-bold">3 free credits</span></p>
                        <p className="text-xs text-muted-foreground mt-1">No credit card required</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms" className="text-orange-500 hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
          </p>
          <p className="mt-3 text-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">← Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
