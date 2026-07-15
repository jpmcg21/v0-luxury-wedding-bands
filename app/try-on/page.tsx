"use client"

import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { LiveTryOn, type LiveTryOnHandle } from "@/components/TryOn/LiveTryOn"
import { RingSelector } from "@/components/TryOn/RingSelector"
import { SaveModal } from "@/components/TryOn/SaveModal"
import type { ShopifyProduct } from "@/lib/shopify/types"

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || ""

export default function TryOnPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const liveTryOnRef = useRef<LiveTryOnHandle>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const data: ShopifyProduct[] = await response.json()
          setProducts(data)
          setSelectedProduct((current) => current ?? data[0] ?? null)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [])

  const ringImageUrl = selectedProduct?.images.edges[0]?.node.url ?? null
  const productUrl =
    selectedProduct && STORE_DOMAIN ? `https://${STORE_DOMAIN}/products/${selectedProduct.handle}` : undefined

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center mb-10">
            <p className="text-sm tracking-widest text-muted-foreground mb-4">TRY ON</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium mb-4 text-balance">
              See It On Your Hand
            </h1>
            <p className="text-lg text-muted-foreground">
              Point your camera at your hand and watch the ring follow it live.
            </p>
          </div>

          <div className="max-w-md mx-auto flex flex-col items-center gap-8">
            <LiveTryOn ref={liveTryOnRef} ringImageUrl={ringImageUrl} />

            <div className="w-full">
              <p className="text-sm font-medium mb-3">Choose a band</p>
              {isLoadingProducts ? (
                <p className="text-sm text-muted-foreground">Loading rings…</p>
              ) : (
                <RingSelector
                  products={products}
                  selectedProductId={selectedProduct?.id ?? null}
                  onSelect={setSelectedProduct}
                />
              )}
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!selectedProduct}
              onClick={() => setIsSaveModalOpen(true)}
            >
              Save My Look
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      <SaveModal
        open={isSaveModalOpen}
        onOpenChange={setIsSaveModalOpen}
        getScreenshot={() => liveTryOnRef.current?.captureScreenshot() ?? Promise.resolve(null)}
        productTitle={selectedProduct?.title}
        productUrl={productUrl}
      />
    </div>
  )
}
