"use client"

import { cn } from "@/lib/utils"
import type { ShopifyProduct } from "@/lib/shopify/types"

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || ""

interface RingSelectorProps {
  products: ShopifyProduct[]
  selectedProductId: string | null
  onSelect: (product: ShopifyProduct) => void
}

export function RingSelector({ products, selectedProductId, onSelect }: RingSelectorProps) {
  if (products.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-6">No rings available yet.</p>
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 px-1 snap-x snap-mandatory">
      {products.map((product) => {
        const image = product.images.edges[0]?.node
        const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
        const isSelected = product.id === selectedProductId

        return (
          <div key={product.id} className="flex-shrink-0 w-28 snap-start text-center">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className={cn(
                "w-28 h-28 rounded-lg overflow-hidden bg-muted border-2 transition-colors",
                isSelected ? "border-foreground" : "border-transparent hover:border-border",
              )}
            >
              {image ? (
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                  No image
                </div>
              )}
            </button>
            <a
              href={STORE_DOMAIN ? `https://${STORE_DOMAIN}/products/${product.handle}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-xs font-medium truncate hover:underline"
              title={product.title}
            >
              {product.title}
            </a>
            <span className="block text-xs text-muted-foreground">${price.toFixed(2)}</span>
          </div>
        )
      })}
    </div>
  )
}
