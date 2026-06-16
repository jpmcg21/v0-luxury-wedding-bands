export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4 text-card-foreground">JUST BANDS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium wedding bands at fair prices. Direct from our workshop to you.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-card-foreground">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Wedding Bands
                </a>
              </li>
              <li>
                <a href="/#products" className="text-muted-foreground hover:text-foreground transition-colors">
                  14k Gold Bands
                </a>
              </li>
              <li>
                <a href="/#products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Platinum Bands
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-card-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-card-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Just Bands. Premium quality at fair prices.</p>
        </div>
      </div>
    </footer>
  )
}
