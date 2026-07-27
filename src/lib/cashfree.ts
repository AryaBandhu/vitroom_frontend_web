import { subscriptionApi } from "./api"
import type { User } from "./types"

declare global {
  interface Window {
    Cashfree?: any
  }
}

let scriptPromise: Promise<boolean> | null = null

function loadCashfreeScript(): Promise<boolean> {
  if (window.Cashfree) return Promise.resolve(true)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.onload = () => resolve(true)
    script.onerror = () => {
      scriptPromise = null
      resolve(false)
    }
    document.body.appendChild(script)
  })
  return scriptPromise
}

interface CheckoutArgs {
  planId: number
  user: User | null
}

export async function startCashfreeCheckout({ planId, user }: CheckoutArgs) {
  const loaded = await loadCashfreeScript()
  if (!loaded) {
    throw new Error("Could not load the payment gateway. Please try again.")
  }

  const order = await subscriptionApi.createOrder(planId)

  const cashfree = window.Cashfree({
    mode: order.env === "PRODUCTION" ? "production" : "sandbox",
  })

  return new Promise<{ orderId: string }>((resolve, reject) => {
    cashfree
      .checkout({
        paymentSessionId: order.payment_session_id,
        redirectTarget: "_modal",
      })
      .then((result: any) => {
        if (result.error) {
          reject(new Error(result.error.message || "Payment failed"))
        } else if (result.redirect) {
          // Payment is being redirected — handled by return_url
          resolve({ orderId: order.order_id })
        } else if (result.paymentDetails) {
          // Payment completed in modal
          resolve({ orderId: order.order_id })
        } else {
          resolve({ orderId: order.order_id })
        }
      })
      .catch((err: any) => {
        reject(new Error(err?.message || "Payment cancelled"))
      })
  })
}
