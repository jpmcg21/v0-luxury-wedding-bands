export function ValueProps() {
  const benefits = [
    {
      label: "I. Fair, Ledgered Pricing",
      description: "Material plus labour. We show our work.",
    },
    {
      label: "II. Real Materials",
      description: "14k gold, platinum. Nothing plated, nothing thin.",
    },
    {
      label: "III. 30-Day Returns",
      description: "Try it at home. Send it back if it's not right.",
    },
  ]

  return (
    <section className="font-karla bg-[#f4ede0] border-b-[1.5px] border-[#2b2620]">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.label}
            className={`px-[18px] py-[22px] border-[#d8cdb8] ${
              index < benefits.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
            }`}
          >
            <div className="mb-1.5 text-[13px] font-bold text-[#2b2620]">{benefit.label}</div>
            <div className="text-xs leading-[1.5] text-[#6b5f4f]">{benefit.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
