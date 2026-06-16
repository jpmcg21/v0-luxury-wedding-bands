"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { getProducts, type Product } from "@/lib/products"

export function ProductGrid() {
  const [selectedMetal, setSelectedMetal] = useState<string>("all")
  const [selectedWidth, setSelectedWidth] = useState<string>("all")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("[v0] Failed to load products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const metalMatch = selectedMetal === "all" || product.metal === selectedMetal
    const widthMatch = selectedWidth === "all" || product.width === selectedWidth
    return metalMatch && widthMatch
  })

  return (
    <section id="products" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Premium Wedding Bands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The same quality as luxury retailers, at a fraction of the price. No middlemen, no markup.
          </p>
        </div>

        <ProductFilters
          selectedMetal={selectedMetal}
          selectedWidth={selectedWidth}
          onMetalChange={setSelectedMetal}
          onWidthChange={setSelectedWidth}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No products match your filters. Please adjust your selection.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
