"use client"

import { useState } from "react"
import { ShoppingBag, Loader2 } from "lucide-react"
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
    <div className="font-karla group">
      {/* Product Image */}
      <div className="relative h-[150px] bg-[#e3d9c4] overflow-hidden mb-2.5">
        {image ? (
          <img
            src={image.url || "/placeholder.svg"}
            alt={image.altText || product.title}
            className="photo-vintage w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-[#8a7d6a]" />
          </div>
        )}

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-full bg-[#f4ede0] border-[1.5px] border-[#2b2620] py-2 text-xs font-bold tracking-[0.03em] text-[#2b2620] flex items-center justify-center gap-1.5 hover:bg-[#2b2620] hover:text-[#f4ede0] transition-colors disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={isAdding || cartLoading || !firstVariant || !product.availableForSale}
          >
            {isAdding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingBag className="h-3.5 w-3.5" />}
            {!product.availableForSale ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-[#2b2620] text-[#f4ede0] px-2 py-1 text-[10px] font-bold tracking-[0.03em]">
            SAVE {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="text-[13px] font-bold text-[#2b2620]">{product.title}</h3>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-xs text-[#a8532f]">
          ${price.toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}
        </span>
        {hasDiscount && <span className="text-xs text-[#8a7d6a] line-through">${compareAtPrice.toFixed(2)}</span>}
      </div>
    </div>
  )
}
