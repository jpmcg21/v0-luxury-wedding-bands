"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SaveModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  getScreenshot: () => Promise<string | null>
  productTitle?: string
  productUrl?: string | null
}

export function SaveModal({ open, onOpenChange, getScreenshot, productTitle, productUrl }: SaveModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentImage, setSentImage] = useState<string | null>(null)

  const reset = () => {
    setName("")
    setEmail("")
    setError(null)
    setSentImage(null)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) reset()
    onOpenChange(next)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.")
      return
    }

    setIsSubmitting(true)
    try {
      const imageDataUrl = await getScreenshot()
      if (!imageDataUrl) {
        throw new Error("We couldn't capture your try-on image. Please try again.")
      }

      const response = await fetch("/api/send-tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, imageDataUrl, productTitle, productUrl }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || "Failed to send your look. Please try again.")
      }

      setSentImage(imageDataUrl)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {sentImage ? (
          <>
            <DialogHeader>
              <DialogTitle>Your look is on its way</DialogTitle>
              <DialogDescription>Check your inbox — we've sent your look to {email}.</DialogDescription>
            </DialogHeader>
            <img src={sentImage || "/placeholder.svg"} alt="Your try-on" className="w-full rounded-lg border border-border" />
            <DialogFooter>
              <a href={sentImage} download="trybands-try-on.jpg" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Image
                </Button>
              </a>
              <Button className="w-full sm:w-auto" onClick={() => handleOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Save My Look</DialogTitle>
              <DialogDescription>
                Enter your name and email and we'll send your try-on photo straight to your inbox — free.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="tryon-name">Name</Label>
                <Input
                  id="tryon-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tryon-email">Email</Label>
                <Input
                  id="tryon-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto gap-2">
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save My Look
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
