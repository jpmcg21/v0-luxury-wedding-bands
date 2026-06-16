"use client"

import { useState } from "react"
import { ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShopifyCart } from "@/contexts/shopify-cart-context"
import type { ShopifyProduct } from "@/lib/shopify/types"

interface ShopifyProductCardProps {
  product: ShopifyProduct
}

export function ShopifyProductCard({ product }: ShopifyProductCardProps) {
  const { addItem, isLoading: cartLoading } = useShopifyCart()
  const [isAdding, setIsAdding] = useState(false)

  const image = product.images.edges[0]?.node
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice
    ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null
  const hasDiscount = compareAtPrice && compareAtPrice > price

  // Get the first available variant
  const firstVariant = product.variants.edges[0]?.node

  const handleAddToCart = async () => {
    if (!firstVariant) return
    setIsAdding(true)
    try {
      await addItem(firstVariant.id)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
        {image ? (
          <img
            src={image.url || "/placeholder.svg"}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isAdding || cartLoading || !firstVariant || !product.availableForSale}
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingBag className="h-4 w-4 mr-2" />}
            {!product.availableForSale ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-foreground text-background px-2 py-1 text-xs font-medium rounded">
            SAVE {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium">{product.title}</h3>
        {product.productType && <p className="text-sm text-muted-foreground">{product.productType}</p>}
        <div className="flex items-center gap-2">
          <span className="font-medium">
            ${price.toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">${compareAtPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
