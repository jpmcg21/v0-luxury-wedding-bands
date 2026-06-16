"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShopifyCart } from "@/contexts/shopify-cart-context"

export function Header() {
  const { totalItems, openCart } = useShopifyCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/">
              <h1 className="text-xl font-semibold tracking-tight">JUST BANDS</h1>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/#collection" className="text-sm hover:text-foreground/70 transition-colors">
                Shop
              </a>
              <a href="/about" className="text-sm hover:text-foreground/70 transition-colors">
                About
              </a>
              <a href="/blog" className="text-sm hover:text-foreground/70 transition-colors">
                Journal
              </a>
              <a href="/contact" className="text-sm hover:text-foreground/70 transition-colors">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary relative" onClick={openCart}>
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
