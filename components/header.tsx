"use client"

import { useState } from "react"
import { Menu, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useShopifyCart } from "@/contexts/shopify-cart-context"

const NAV_LINKS = [
  { href: "/#collection", label: "Shop" },
  { href: "/try-on", label: "Try On", icon: Sparkles },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const { totalItems, openCart } = useShopifyCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/">
              <h1 className="text-xl font-semibold tracking-tight">JUST BANDS</h1>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={
                    Icon
                      ? "text-sm flex items-center gap-1.5 text-foreground/90 hover:text-foreground transition-colors"
                      : "text-sm hover:text-foreground/70 transition-colors"
                  }
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-secondary relative" onClick={openCart}>
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-secondary"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-3/4 sm:max-w-xs">
          <SheetTitle className="px-4 pt-4">Menu</SheetTitle>
          <nav className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 py-3 text-base border-b border-border last:border-b-0 hover:text-foreground/70 transition-colors"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
