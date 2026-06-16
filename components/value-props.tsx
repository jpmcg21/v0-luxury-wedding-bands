export function ValueProps() {
  const benefits = [
    {
      title: "Canadian-Owned",
      description: "Proudly Canadian. Domestic shipping means no surprise duties or customs fees.",
    },
    {
      title: "Fair Pricing",
      description: "Quality wedding bands at honest, transparent prices.",
    },
    {
      title: "Premium Materials",
      description: "14k Gold and Platinum sourced from ethical suppliers.",
    },
    {
      title: "Free Shipping & Returns",
      description: "Try at home risk-free. 30-day return policy, no questions asked.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
