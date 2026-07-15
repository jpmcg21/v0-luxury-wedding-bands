"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Download, Loader2, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

type TryOnRecord = {
  id: string
  name: string
  imageDataUrl: string
  productTitle?: string
}

function TryOnSuccessContent() {
  const searchParams = useSearchParams()
  const [record, setRecord] = useState<TryOnRecord | null>(null)
  const [status, setStatus] = useState<"loading" | "found" | "not-found">("loading")

  useEffect(() => {
    async function fetchRecord() {
      const emailFromUrl = searchParams.get("email")
      const idFromUrl = searchParams.get("id")

      let pending: { id?: string; email?: string } = {}
      try {
        pending = JSON.parse(localStorage.getItem("trybands_pending_tryon") || "{}")
      } catch {
        pending = {}
      }

      const id = idFromUrl || pending.id
      const email = emailFromUrl || pending.email

      const query = id ? `id=${encodeURIComponent(id)}` : email ? `email=${encodeURIComponent(email)}` : null

      if (!query) {
        setStatus("not-found")
        return
      }

      try {
        const response = await fetch(`/api/try-on/save?${query}`)
        if (!response.ok) {
          setStatus("not-found")
          return
        }
        const data = await response.json()
        setRecord(data)
        setStatus("found")
        localStorage.removeItem("trybands_pending_tryon")
      } catch (error) {
        console.error("Error fetching try-on:", error)
        setStatus("not-found")
      }
    }

    fetchRecord()
  }, [searchParams])

  const handleShare = async () => {
    if (!record) return
    if (navigator.share) {
      try {
        const blob = await (await fetch(record.imageDataUrl)).blob()
        const file = new File([blob], "trybands-try-on.png", { type: "image/png" })
        await navigator.share({ files: [file], title: "My Try Bands look" })
      } catch (error) {
        console.error("Share failed:", error)
      }
    }
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-sm">Finding your saved try-on…</p>
      </div>
    )
  }

  if (status === "not-found" || !record) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h1 className="text-2xl font-medium">We couldn't find your try-on</h1>
        <p className="text-muted-foreground">
          If you just completed payment, this can take a moment to process. Otherwise, head back and start a new
          try-on.
        </p>
        <Link href="/try-on">
          <Button>Back to Try On</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div>
        <p className="text-sm tracking-widest text-muted-foreground mb-4">SAVED</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-medium mb-4 text-balance">
          Thanks, {record.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Your try-on{record.productTitle ? ` with ${record.productTitle}` : ""} is saved. Download it below — we've
          also sent it to your email.
        </p>
      </div>

      <img src={record.imageDataUrl || "/placeholder.svg"} alt="Your try-on" className="w-full rounded-lg border border-border" />

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href={record.imageDataUrl} download="trybands-try-on.png">
          <Button className="w-full sm:w-auto gap-2">
            <Download className="w-4 h-4" />
            Download Image
          </Button>
        </a>
        <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      <Link href="/try-on" className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors">
        Try on another band
      </Link>
    </div>
  )
}

export default function TryOnSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <Suspense fallback={<div className="py-20" />}>
            <TryOnSuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
