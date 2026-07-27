import { mediaUrl } from "./api"

export async function downloadImage(url: string, filename: string) {
  const resolved = mediaUrl(url)
  try {
    const res = await fetch(resolved, { mode: "cors" })
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = objectUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    // Fallback: open in a new tab if CORS blocks the fetch.
    window.open(resolved, "_blank")
  }
}
