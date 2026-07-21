"use client"

interface ProductFiltersProps {
  selectedMetal: string
  selectedWidth: string
  onMetalChange: (metal: string) => void
  onWidthChange: (width: string) => void
}

export function ProductFilters({ selectedMetal, selectedWidth, onMetalChange, onWidthChange }: ProductFiltersProps) {
  const metals = ["all", "14k Gold", "Platinum"]
  const widths = ["all", "2mm", "3mm", "4mm", "5mm", "6mm"]

  return (
    <div className="font-karla flex flex-col md:flex-row gap-8 items-start md:items-center justify-center mb-10">
      <div className="flex flex-col gap-3">
        <label className="text-[11px] tracking-[0.1em] uppercase text-[#8a7d6a]">Metal Type</label>
        <div className="flex gap-2 flex-wrap">
          {metals.map((metal) => (
            <button
              key={metal}
              onClick={() => onMetalChange(metal)}
              className={`px-4 py-1.5 text-xs capitalize border-[1.5px] transition-colors ${
                selectedMetal === metal
                  ? "bg-[#2b2620] text-[#f4ede0] border-[#2b2620]"
                  : "bg-transparent text-[#2b2620] border-[#2b2620] hover:bg-[#2b2620]/10"
              }`}
            >
              {metal === "all" ? "All Metals" : metal}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[11px] tracking-[0.1em] uppercase text-[#8a7d6a]">Band Width</label>
        <div className="flex gap-2 flex-wrap">
          {widths.map((width) => (
            <button
              key={width}
              onClick={() => onWidthChange(width)}
              className={`px-4 py-1.5 text-xs capitalize border-[1.5px] transition-colors ${
                selectedWidth === width
                  ? "bg-[#2b2620] text-[#f4ede0] border-[#2b2620]"
                  : "bg-transparent text-[#2b2620] border-[#2b2620] hover:bg-[#2b2620]/10"
              }`}
            >
              {width === "all" ? "All Widths" : width}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
