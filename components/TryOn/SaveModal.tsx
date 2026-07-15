"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
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
  getImageDataUrl: () => string | null
  productTitle?: string
}

export function SaveModal({ open, onOpenChange, getImageDataUrl, productTitle }: SaveModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.")
      return
    }

    const imageDataUrl = getImageDataUrl()
    if (!imageDataUrl) {
      setError("We couldn't capture your try-on image. Please try again.")
      return
    }

    setIsSubmitting(true)
    try {
      const saveResponse = await fetch("/api/try-on/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, imageDataUrl, productTitle }),
      })

      if (!saveResponse.ok) {
        throw new Error("Failed to save your try-on")
      }
      const { id } = await saveResponse.json()

      localStorage.setItem("trybands_pending_tryon", JSON.stringify({ id, name, email }))

      const checkoutResponse = await fetch("/api/try-on/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, tryOnId: id }),
      })

      if (!checkoutResponse.ok) {
        const body = await checkoutResponse.json().catch(() => ({}))
        throw new Error(body.error || "Failed to start checkout")
      }

      const { checkoutUrl } = await checkoutResponse.json()
      window.location.href = checkoutUrl
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save & Share Your Try-On</DialogTitle>
          <DialogDescription>
            $1 CAD to save your look — we use this to cover processing costs and will send your saved image to your
            email.
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
              Pay $1 & Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
