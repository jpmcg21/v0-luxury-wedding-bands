export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">Shipping & Returns</h1>

        <div className="space-y-12">
          <section className="p-6 bg-secondary/30 border border-border">
            <h2 className="text-2xl font-semibold mb-4">Canadian Customers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a Canadian-owned business, we ship domestically within Canada. This means:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>
                  <strong>No customs fees or duties</strong> - what you see is what you pay
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>
                  <strong>No surprise charges</strong> at delivery
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>
                  <strong>Prices in CAD</strong> - no currency conversion fees
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>
                  <strong>Fast domestic shipping</strong> across all provinces
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Free Shipping</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We offer free standard shipping on all orders within Canada. Your wedding band will be shipped via insured
              carrier with signature confirmation for security.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span>•</span>
                <span>Standard shipping: 5-7 business days</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Express shipping available at checkout (2-3 business days)</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>All packages are fully insured and require signature</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">30-Day Returns</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We want you to be completely satisfied with your wedding band. If for any reason you're not happy with
              your purchase, you can return it within 30 days for a full refund.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span>•</span>
                <span>30-day return window from delivery date</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Free return shipping via prepaid label</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Full refund to original payment method</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Bands must be in original condition</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Ring Sizing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Not sure about your size? We offer free ring sizing exchanges within 60 days of purchase. Simply return
              your band and we'll send you the correct size at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Lifetime Warranty</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every Just Bands wedding band comes with a lifetime warranty covering manufacturing defects. We stand
              behind the quality of our products and will repair or replace any band with manufacturing issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
