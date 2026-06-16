export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  retailPriceInCents?: number
  metal: "14k Gold" | "Platinum"
  width: "2mm" | "3mm" | "4mm" | "5mm" | "6mm"
  finish: string
  image: string
  weightGrams: number // added weight for transparency
}

// Source of truth for all products
export const PRODUCTS: Product[] = [
  {
    id: "classic-gold-2mm",
    name: "Classic Gold Band",
    description: "Timeless 14k gold band with polished finish",
    priceInCents: 29900, // $299 CAD
    metal: "14k Gold",
    width: "2mm",
    finish: "Polished",
    image: "/elegant-14k-gold-wedding-band-on-white-surface.jpg",
    weightGrams: 3,
  },
  {
    id: "classic-gold-4mm",
    name: "Classic Gold Band",
    description: "Timeless 14k gold band with polished finish",
    priceInCents: 54900, // $549 CAD
    metal: "14k Gold",
    width: "4mm",
    finish: "Polished",
    image: "/elegant-14k-gold-wedding-band-4mm-on-white-surface.jpg",
    weightGrams: 6,
  },
  {
    id: "classic-gold-6mm",
    name: "Classic Gold Band",
    description: "Timeless 14k gold band with polished finish",
    priceInCents: 84900, // $849 CAD
    metal: "14k Gold",
    width: "6mm",
    finish: "Polished",
    image: "/elegant-14k-gold-wedding-band-6mm-on-white-surface.jpg",
    weightGrams: 10,
  },
  {
    id: "brushed-gold-3mm",
    name: "Brushed Gold Band",
    description: "Modern 14k gold with brushed matte finish",
    priceInCents: 39900, // $399 CAD (between 2mm and 4mm classic)
    metal: "14k Gold",
    width: "3mm",
    finish: "Brushed",
    image: "/brushed-matte-14k-gold-wedding-band-on-marble.jpg",
    weightGrams: 4.5,
  },
  {
    id: "brushed-gold-5mm",
    name: "Brushed Gold Band",
    description: "Modern 14k gold with brushed matte finish",
    priceInCents: 69900, // $699 CAD (between 4mm and 6mm classic)
    metal: "14k Gold",
    width: "5mm",
    finish: "Brushed",
    image: "/brushed-matte-14k-gold-wedding-band-5mm-on-marble.jpg",
    weightGrams: 8,
  },
  {
    id: "platinum-2mm",
    name: "Platinum Classic",
    description: "Premium platinum band with mirror polish",
    priceInCents: 49900, // $499 CAD (entry platinum)
    metal: "Platinum",
    width: "2mm",
    finish: "Polished",
    image: "/platinum-wedding-band-polished-on-white-background.jpg",
    weightGrams: 3.5,
  },
  {
    id: "platinum-4mm",
    name: "Platinum Classic",
    description: "Premium platinum band with mirror polish",
    priceInCents: 89900, // $899 CAD
    metal: "Platinum",
    width: "4mm",
    finish: "Polished",
    image: "/platinum-wedding-band-4mm-polished-on-white-backgr.jpg",
    weightGrams: 7,
  },
  {
    id: "platinum-6mm",
    name: "Platinum Classic",
    description: "Premium platinum band with mirror polish",
    priceInCents: 144900, // $1,449 CAD
    metal: "Platinum",
    width: "6mm",
    finish: "Polished",
    image: "/platinum-wedding-band-6mm-polished-on-white-backgr.jpg",
    weightGrams: 11.5,
  },
  {
    id: "platinum-brushed-5mm",
    name: "Platinum Brushed",
    description: "Contemporary platinum with brushed finish",
    priceInCents: 119900, // $1,199 CAD
    metal: "Platinum",
    width: "5mm",
    finish: "Brushed",
    image: "/brushed-platinum-wedding-band-on-elegant-surface.jpg",
    weightGrams: 9.5,
  },
]

// Simple functions that return mock data - no API calls
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.id === id)
}
