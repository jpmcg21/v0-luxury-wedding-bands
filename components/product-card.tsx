"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const price = (product.priceInCents / 100).toFixed(0)

  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-secondary relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2 text-card-foreground">{product.name}</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          <span>{product.metal}</span>
          <span>{"•"}</span>
          <span>{product.width}</span>
        </div>
        <p className="text-2xl font-semibold text-card-foreground mb-4">
          {"$"}
          {price}
        </p>
        <Button
          className="w-full bg-foreground text-background hover:bg-foreground/90"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}
