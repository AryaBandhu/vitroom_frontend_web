import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { authApi, tokenStore } from "@/lib/api"
import type { Tokens, User } from "@/lib/types"

interface AuthContextValue {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (user: User, tokens: Tokens) => void
  logout: () => void
  setUser: (user: User) => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    tokenStore.clear()
    setUserState(null)
  }, [])

  const login = useCallback((nextUser: User, tokens: Tokens) => {
    tokenStore.set(tokens)
    setUserState(nextUser)
  }, [])

  const setUser = useCallback((nextUser: User) => {
    setUserState(nextUser)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const me = await authApi.me()
      setUserState(me)
    } catch {
      // handled by interceptor / logout event
    }
  }, [])

  // Bootstrap: if a token exists, fetch the current user.
  useEffect(() => {
    let active = true
    async function bootstrap() {
      if (!tokenStore.getAccess()) {
        setLoading(false)
        return
      }
      try {
        const me = await authApi.me()
        if (active) setUserState(me)
      } catch {
        tokenStore.clear()
      } finally {
        if (active) setLoading(false)
      }
    }
    bootstrap()
    return () => {
      active = false
    }
  }, [])

  // Listen for forced logout dispatched by the axios interceptor.
  useEffect(() => {
    const handler = () => logout()
    window.addEventListener("clothing:logout", handler)
    return () => window.removeEventListener("clothing:logout", handler)
  }, [logout])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      setUser,
      refreshUser,
    }),
    [user, loading, login, logout, setUser, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
