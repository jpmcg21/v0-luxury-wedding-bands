export function Footer() {
  const links = [
    { href: "/#collection", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ]

  return (
    <footer className="font-karla bg-[#f4ede0] border-t-[1.5px] border-[#2b2620] px-10 py-[22px] md:px-16 lg:px-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-[11px] tracking-[0.03em] text-[#8a7d6a]">
        <span>© 2026 Just Bands</span>
        <nav className="flex flex-wrap gap-x-2 gap-y-1 md:justify-end">
          {links.map((link, index) => (
            <span key={link.href} className="flex items-center gap-2">
              <a href={link.href} className="hover:text-[#2b2620] transition-colors">
                {link.label}
              </a>
              {index < links.length - 1 && <span aria-hidden="true">·</span>}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}
