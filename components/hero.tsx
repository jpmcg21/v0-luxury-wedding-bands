export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <img
        src="/luxury-wedding-rings-on-elegant-marble-surface-wit.jpg"
        alt="Premium wedding bands"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="inline-block mb-6 px-4 py-2 bg-foreground/5 backdrop-blur-sm text-sm font-medium tracking-wide">
          CANADIAN-OWNED • PREMIUM QUALITY • FAIR PRICES
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 text-balance leading-[1.1]">
          Premium Wedding Bands
          <br />
          Fairly Priced
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
          Beautifully crafted 14k gold and platinum wedding bands. Quality materials, honest prices, made to last a
          lifetime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#products"
            className="px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            Shop Wedding Bands
          </a>
          <div className="text-sm text-muted-foreground">Starting at $299 • Free Canadian Shipping • No Duties</div>
        </div>
      </div>
    </section>
  )
}
