"use client"

import { useState } from "react"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useShopifyCart } from "@/contexts/shopify-cart-context"

const NAV_LINKS = [
  { href: "/#collection", label: "Shop" },
  { href: "/try-on", label: "Try On" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const { totalItems, openCart } = useShopifyCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="font-karla fixed top-0 left-0 right-0 z-50 bg-[#f4ede0] border-b-[1.5px] border-[#2b2620]">
      <div className="flex items-center justify-between px-10 py-4 md:px-16 lg:px-20">
        <a href="/" className="text-[19px] font-bold tracking-[0.02em] text-[#2b2620]">
          Just Bands
        </a>
        <nav className="hidden md:flex items-center gap-[26px]">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={label} href={href} className="text-[13px] text-[#2b2620] hover:opacity-60 transition-opacity">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-none text-[#2b2620] hover:bg-[#2b2620] hover:text-[#f4ede0]"
            onClick={openCart}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#a8532f] text-[#f4ede0] text-xs font-bold w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-none text-[#2b2620] hover:bg-[#2b2620] hover:text-[#f4ede0]"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="font-karla w-3/4 sm:max-w-xs bg-[#f4ede0]">
          <SheetTitle className="px-4 pt-4 text-[#2b2620]">Menu</SheetTitle>
          <nav className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="py-3 text-base border-b border-[#d8cdb8] last:border-b-0 text-[#2b2620] hover:opacity-60 transition-opacity"
              >
                {label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
