export function Hero() {
  return (
    <section className="font-karla mt-[65px] bg-[#f4ede0]">
      <div className="px-10 py-14 md:px-16 md:py-16 lg:px-20 lg:py-[52px] text-center border-b-[1.5px] border-[#2b2620]">
        <div className="mb-4 text-[11px] tracking-[0.18em] uppercase text-[#a8532f]">
          No. 014 in a series of honest rings
        </div>
        <h1 className="mx-auto mb-[18px] max-w-[560px] md:max-w-[680px] text-[46px] md:text-[58px] lg:text-[64px] font-light leading-[1.15] text-[#2b2620]">
          Same gold, same shine, way less drama.
        </h1>
        <p className="mx-auto mb-[26px] max-w-[420px] md:max-w-[480px] text-[15px] md:text-base leading-[1.6] text-[#4a4137]">
          14k gold and platinum, cast the same way jewelers have cast them for a century. We just skip the markup
          they add for the showroom.
        </p>
        <a
          href="/#collection"
          className="inline-block border-[1.5px] border-[#2b2620] px-[30px] py-3 text-[13px] font-bold tracking-[0.04em] text-[#2b2620] transition-colors hover:bg-[#2b2620] hover:text-[#f4ede0]"
        >
          Browse the Catalog →
        </a>
        <div className="mt-5 text-xs tracking-[0.04em] text-[#8a7d6a]">
          Bands from $299 · Free shipping, easy returns
        </div>
      </div>

      <div className="h-[220px] md:h-[280px] lg:h-[340px] border-b-[1.5px] border-[#2b2620] overflow-hidden">
        <img
          src="/luxury-wedding-rings-on-elegant-marble-surface-wit.jpg"
          alt="Wedding bands on marble"
          className="photo-vintage h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
