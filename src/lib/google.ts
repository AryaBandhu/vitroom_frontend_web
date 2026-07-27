import { GOOGLE_CLIENT_ID } from "./constants"

interface GoogleCredentialResponse {
  credential: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
          prompt: () => void
        }
      }
    }
  }
}

function waitForGoogle(): Promise<NonNullable<Window["google"]>> {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval)
        resolve(window.google)
      } else if (attempts++ > 50) {
        clearInterval(interval)
        reject(new Error("Google Identity Services failed to load"))
      }
    }, 100)
  })
}

export async function renderGoogleButton(
  parent: HTMLElement,
  onCredential: (idToken: string) => void,
) {
  const google = await waitForGoogle()
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
  })
  google.accounts.id.renderButton(parent, {
    theme: "outline",
    size: "large",
    width: 320,
    text: "continue_with",
    shape: "pill",
    logo_alignment: "center",
  })
}
