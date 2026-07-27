export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  credits: number
  is_subscribed: boolean
  subscription_end_date: string | null
  created_at: string
}

export interface Tokens {
  access: string
  refresh: string
}

export interface GoogleLoginResponse {
  user: User
  tokens: Tokens
  is_new_user: boolean
}

export interface EmailLoginResponse {
  user: User
  tokens: Tokens
}

export interface Option {
  id: number
  name: string
  slug: string
}

export interface GenerationOptions {
  body_types: Option[]
  fit_preferences: Option[]
  occasions: Option[]
}

export interface GeneratedImage {
  id: number
  image: string
  created_at: string
}

export type GenerationStatus = "pending" | "processing" | "completed" | "failed"

export interface Generation {
  id: number
  person_image: string
  cloth_image: string
  body_type: Option
  fit_preference: Option
  occasion: Option
  num_samples: number
  prompt_used: string
  status: GenerationStatus
  error_message: string
  created_at: string
  completed_at: string | null
  images: GeneratedImage[]
}

export interface Plan {
  id: number
  name: string
  price: string
  duration_days: number
  credits_granted: number
  unlimited: boolean
  description: string
}

export interface CashfreeOrder {
  order_id: string
  payment_session_id: string
  order_amount: number
  order_currency: string
  env: string
}

export interface SubscriptionStatus {
  is_subscribed: boolean
  credits: number
  subscription: {
    id: number
    plan: Plan
    status: string
    started_at: string
    expires_at: string
  } | null
}
