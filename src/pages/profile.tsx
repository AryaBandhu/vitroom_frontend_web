import { useState } from "react"
import { LogOut, Save, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { authApi } from "@/lib/api"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function ProfilePage() {
  const { user, logout, setUser } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user?.first_name ?? "")
  const [lastName, setLastName] = useState(user?.last_name ?? "")
  const [saving, setSaving] = useState(false)

  const initials =
    `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`
      .toUpperCase() || user?.username?.[0]?.toUpperCase() || "U"

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || ""

  async function handleSave() {
    setSaving(true)
    try {
      const updated = await authApi.updateProfile({
        first_name: firstName,
        last_name: lastName,
      })
      setUser(updated)
      toast.success("Profile updated!")
    } catch {
      toast.error("Could not update profile.")
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Profile
      </h1>
      <p className="mt-1 text-muted-foreground">
        Manage your account and view your subscription.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-5">
        {/* Account Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-lg font-semibold">{fullName}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Joined {formatDate(user.created_at)}
            </p>
            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => {
                logout()
                navigate("/")
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </CardContent>
        </Card>

        {/* Credits & Subscription */}
        <Card className="md:col-span-3">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Subscription & Credits</CardTitle>
              <CardDescription>Your current plan status</CardDescription>
            </div>
            <Sparkles className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="text-3xl font-bold">{user.credits}</p>
              </div>
              <div className="ml-8">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={user.is_subscribed ? "default" : "secondary"}>
                  {user.is_subscribed ? "Pro (Active)" : "Free"}
                </Badge>
              </div>
            </div>
            {user.is_subscribed && user.subscription_end_date && (
              <p className="text-sm text-muted-foreground">
                Subscription expires: {formatDate(user.subscription_end_date)}
              </p>
            )}
            {!user.is_subscribed && (
              <Button className="w-full" onClick={() => navigate("/pricing")}>
                Upgrade to Pro
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Edit Profile</CardTitle>
          <CardDescription>Update your display name.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">First name</Label>
              <Input
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-4 gap-2" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
