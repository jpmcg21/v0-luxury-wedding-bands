"use client"

import { useState, useEffect } from "react"
import { ShopifyProductCard } from "./shopify-product-card"
import { ProductFilters } from "./product-filters"
import type { ShopifyProduct } from "@/lib/shopify/types"

export function ShopifyProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [metalFilter, setMetalFilter] = useState<string>("all")
  const [widthFilter, setWidthFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
          setFilteredProducts(data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (metalFilter !== "all") {
      filtered = filtered.filter((product) => {
        const metalOption = product.options.find((opt) => opt.name.toLowerCase() === "metal")
        return (
          metalOption?.values.some((v) => v.toLowerCase().includes(metalFilter.toLowerCase())) ||
          product.title.toLowerCase().includes(metalFilter.toLowerCase()) ||
          product.productType?.toLowerCase().includes(metalFilter.toLowerCase())
        )
      })
    }

    if (widthFilter !== "all") {
      filtered = filtered.filter((product) => {
        const widthOption = product.options.find((opt) => opt.name.toLowerCase() === "width")
        return (
          widthOption?.values.some((v) => v.includes(widthFilter)) || product.title.toLowerCase().includes(widthFilter)
        )
      })
    }

    setFilteredProducts(filtered)
  }, [products, metalFilter, widthFilter])

  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Our Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Loading products...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted aspect-square rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="collection" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Our Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium wedding bands at fair prices. No middlemen, no markups.
          </p>
        </div>

        {/* Filters */}
        <ProductFilters
          metalFilter={metalFilter}
          widthFilter={widthFilter}
          onMetalChange={setMetalFilter}
          onWidthChange={setWidthFilter}
        />

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
            <p className="text-sm text-muted-foreground mt-2">Add products in your Shopify admin to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ShopifyProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
