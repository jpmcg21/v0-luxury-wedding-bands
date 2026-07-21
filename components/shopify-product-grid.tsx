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
      <section className="font-karla bg-[#f4ede0] border-b-[1.5px] border-[#2b2620] px-10 py-9 pb-2.5 md:px-16 lg:px-20 lg:py-9">
        <div className="mb-5 text-[22px] font-light text-[#2b2620]">The Collection</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-9">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-[#e3d9c4] h-[150px] mb-2.5" />
              <div className="h-3 bg-[#e3d9c4] w-3/4 mb-2" />
              <div className="h-3 bg-[#e3d9c4] w-1/3" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="collection" className="font-karla bg-[#f4ede0] border-b-[1.5px] border-[#2b2620] px-10 py-9 pb-2.5 md:px-16 lg:px-20 lg:py-9">
      <div className="mb-5 text-[22px] font-light text-[#2b2620]">The Collection</div>

      <ProductFilters
        selectedMetal={metalFilter}
        selectedWidth={widthFilter}
        onMetalChange={setMetalFilter}
        onWidthChange={setWidthFilter}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#6b5f4f]">No products found. Try adjusting your filters.</p>
          <p className="text-sm text-[#8a7d6a] mt-2">Add products in your Shopify admin to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-9">
          {filteredProducts.map((product) => (
            <ShopifyProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
