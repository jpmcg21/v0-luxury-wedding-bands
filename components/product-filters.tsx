"use client"

import { Button } from "@/components/ui/button"

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
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-center">
      <div className="flex flex-col gap-3">
        <label className="text-sm tracking-wider uppercase text-muted-foreground">Metal Type</label>
        <div className="flex gap-2 flex-wrap">
          {metals.map((metal) => (
            <Button
              key={metal}
              variant={selectedMetal === metal ? "default" : "outline"}
              size="sm"
              onClick={() => onMetalChange(metal)}
              className="capitalize"
            >
              {metal === "all" ? "All Metals" : metal}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm tracking-wider uppercase text-muted-foreground">Band Width</label>
        <div className="flex gap-2 flex-wrap">
          {widths.map((width) => (
            <Button
              key={width}
              variant={selectedWidth === width ? "default" : "outline"}
              size="sm"
              onClick={() => onWidthChange(width)}
              className="capitalize"
            >
              {width === "all" ? "All Widths" : width}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
