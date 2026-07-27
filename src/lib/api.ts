import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import type {
  GenerationOptions,
  Generation,
  GoogleLoginResponse,
  EmailLoginResponse,
  Plan,
  CashfreeOrder,
  SubscriptionStatus,
  Tokens,
  User,
} from "./types"

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || "http://localhost:8000"

const ACCESS_KEY = "clothing_access"
const REFRESH_KEY = "clothing_refresh"

export const tokenStore = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (tokens: Tokens) => {
    localStorage.setItem(ACCESS_KEY, tokens.access)
    localStorage.setItem(REFRESH_KEY, tokens.refresh)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

export const api = axios.create({
  baseURL: API_BASE_URL,
})

// Attach bearer token to every request.
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh on 401.
let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStore.getRefresh()
  if (!refresh) return null
  try {
    const { data } = await axios.post<Tokens>(`${API_BASE_URL}/auth/refresh/`, {
      refresh,
    })
    tokenStore.set(data)
    return data.access
  } catch {
    tokenStore.clear()
    return null
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes("/auth/refresh/")
    ) {
      original._retry = true
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null
        })
      }
      const newToken = await refreshPromise
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      }
      // Refresh failed -> force logout.
      window.dispatchEvent(new Event("clothing:logout"))
    }
    return Promise.reject(error)
  },
)

// Resolve relative media URLs returned by the backend.
export function mediaUrl(url: string): string {
  if (!url) return ""
  if (url.startsWith("http")) return url
  return `${MEDIA_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`
}

// ---- Auth ----
export const authApi = {
  googleLogin: (token: string) =>
    api.post<GoogleLoginResponse>("/auth/google/", { token }).then((r) => r.data),
  emailLogin: (email: string, password: string) =>
    api.post<EmailLoginResponse>("/auth/login/", { email, password }).then((r) => r.data),
  signup: (payload: { first_name: string; last_name: string; email: string; password: string; confirm_password: string }) =>
    api.post<{ detail: string }>("/auth/signup/", payload).then((r) => r.data),
  verifyEmail: (email: string, otp: string) =>
    api.post<EmailLoginResponse>("/auth/verify-email/", { email, otp }).then((r) => r.data),
  forgotPassword: (email: string) =>
    api.post<{ detail: string }>("/auth/forgot-password/", { email }).then((r) => r.data),
  verifyOtp: (email: string, otp: string) =>
    api.post<{ detail: string }>("/auth/verify-otp/", { email, otp }).then((r) => r.data),
  resetPassword: (email: string, otp: string, password: string, confirm_password: string) =>
    api.post<{ detail: string }>("/auth/reset-password/", { email, otp, password, confirm_password }).then((r) => r.data),
  me: () => api.get<User>("/auth/me/").then((r) => r.data),
  updateProfile: (payload: Partial<Pick<User, "first_name" | "last_name" | "username">>) =>
    api.patch<User>("/auth/me/", payload).then((r) => r.data),
}

// ---- Generation ----
export const generationApi = {
  options: () =>
    api.get<GenerationOptions>("/generation/options/").then((r) => r.data),
  generate: (formData: FormData) =>
    api
      .post<Generation>("/generation/generate/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
  history: () =>
    api.get<Generation[]>("/generation/history/").then((r) => r.data),
  detail: (id: string | number) =>
    api.get<Generation>(`/generation/history/${id}/`).then((r) => r.data),
}

// ---- Subscriptions ----
export const subscriptionApi = {
  plans: () => api.get<Plan[]>("/subscriptions/plans/").then((r) => r.data),
  createOrder: (planId: number) =>
    api
      .post<CashfreeOrder>("/subscriptions/create-order/", { plan_id: planId })
      .then((r) => r.data),
  verifyPayment: (payload: {
    plan_id: number
    order_id: string
  }) =>
    api
      .post<{ status: string }>("/subscriptions/verify-payment/", payload)
      .then((r) => r.data),
  status: () =>
    api.get<SubscriptionStatus>("/subscriptions/status/").then((r) => r.data),
}
