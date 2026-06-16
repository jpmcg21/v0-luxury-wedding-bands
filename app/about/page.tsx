export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-balance">
          Wedding Bands Without the Markup
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-xl text-foreground">
            Just Bands is a Canadian-owned company founded on a simple belief: premium wedding bands shouldn't cost a
            fortune.
          </p>

          <p>
            Traditional jewelry retailers mark up wedding bands by 200-300%. We eliminate the middleman and pass those
            savings directly to you. By cutting unnecessary costs, we offer the same premium materials and craftsmanship
            at transparent, fair prices.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">The Canadian Advantage</h2>

          <p>
            As a proudly Canadian-owned business, we ship domestically to customers across all provinces. This means no
            surprise customs fees, no duties, and no hidden charges at delivery. When you order from Just Bands, the
            price you see is the price you pay.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Our Approach</h2>

          <p>
            We source certified premium materials - 14k gold, platinum, and other fine metals. Every band is crafted to
            the same standards you'd find at luxury retailers, but without the traditional retail markup.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Quality Commitment</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium">•</span>
              <span>Certified precious metals from trusted suppliers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium">•</span>
              <span>Professional craftsmanship and quality control</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium">•</span>
              <span>Free shipping and hassle-free 30-day returns</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium">•</span>
              <span>Lifetime warranty on all wedding bands</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Transparent Pricing</h2>

          <p>
            We believe you deserve to know what you're paying for. Our prices reflect the true cost of premium materials
            and craftsmanship, plus a fair margin to sustain our business. No hidden fees, no artificial markups - just
            honest pricing for your most important jewelry purchase.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            Shop Wedding Bands
          </a>
        </div>
      </div>
    </div>
  )
}
