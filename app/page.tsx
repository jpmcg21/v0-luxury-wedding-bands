import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ValueProps } from "@/components/value-props"
import { ShopifyProductGrid } from "@/components/shopify-product-grid"
import { Footer } from "@/components/footer"
import { ShopifyCartSidebar } from "@/components/shopify-cart-sidebar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProps />
      <ShopifyProductGrid />
      <Footer />
      <ShopifyCartSidebar />
    </main>
  )
}
