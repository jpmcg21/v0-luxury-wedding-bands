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
  getImageDataUrl: () => string | null
  productTitle?: string
}

export function SaveModal({ open, onOpenChange, getImageDataUrl, productTitle }: SaveModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedImage, setSavedImage] = useState<string | null>(null)

  const reset = () => {
    setName("")
    setEmail("")
    setError(null)
    setSavedImage(null)
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

    const imageDataUrl = getImageDataUrl()
    if (!imageDataUrl) {
      setError("We couldn't capture your try-on image. Please try again.")
      return
    }

    setIsSubmitting(true)
    try {
      await fetch("/api/try-on/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, productTitle }),
      })

      setSavedImage(imageDataUrl)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {savedImage ? (
          <>
            <DialogHeader>
              <DialogTitle>Your look is saved</DialogTitle>
              <DialogDescription>Download it below and share it however you like.</DialogDescription>
            </DialogHeader>
            <img
              src={savedImage || "/placeholder.svg"}
              alt="Your try-on"
              className="w-full rounded-lg border border-border"
            />
            <DialogFooter>
              <a href={savedImage} download="trybands-try-on.png" className="w-full sm:w-auto">
                <Button className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Image
                </Button>
              </a>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Save Your Try-On</DialogTitle>
              <DialogDescription>Enter your name and email to save and download your look.</DialogDescription>
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
                  Save & Download
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
