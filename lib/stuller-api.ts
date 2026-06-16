// Stuller API Client
// Base API URL
const STULLER_API_BASE = "https://api.stuller.com/v2"

// Types based on Stuller's API structure
export interface StullerProduct {
  seriesId: string
  groupDescription: string
  description: string
  metalType: string
  metalKarat: string
  width: number
  yourCost: number
  retailPrice: number
  imagePath: string
  status: string
  qualityLevel: string
  gender: string
  // Additional fields from Stuller API
  weight?: number
  finish?: string
  inStock?: boolean
}

export interface StullerApiCredentials {
  username: string
  password: string
}

class StullerApiClient {
  private credentials: StullerApiCredentials | null = null

  constructor() {
    // Initialize with environment variables if available
    if (process.env.STULLER_API_USERNAME && process.env.STULLER_API_PASSWORD) {
      this.credentials = {
        username: process.env.STULLER_API_USERNAME,
        password: process.env.STULLER_API_PASSWORD,
      }
    }
  }

  private getAuthHeader(): string {
    if (!this.credentials) {
      throw new Error("Stuller API credentials not configured")
    }
    const encoded = Buffer.from(`${this.credentials.username}:${this.credentials.password}`).toString("base64")
    return `Basic ${encoded}`
  }

  /**
   * Search for wedding bands using advanced product filters
   * Stuller API endpoint: POST /api/v2/products/advancedproductfilters
   */
  async searchWeddingBands(filters?: {
    metalType?: string[]
    width?: number[]
    minPrice?: number
    maxPrice?: number
    qualityLevel?: string[]
  }): Promise<StullerProduct[]> {
    try {
      const response = await fetch(`${STULLER_API_BASE}/products/advancedproductfilters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthHeader(),
        },
        body: JSON.stringify({
          productTypes: ["Wedding Bands", "Plain Metal Bands"],
          metalTypes: filters?.metalType || ["14K Yellow Gold", "Platinum"],
          widths: filters?.width,
          minPrice: filters?.minPrice,
          maxPrice: filters?.maxPrice,
          qualityLevels: filters?.qualityLevel || ["Good", "Better", "Best"],
          inStockOnly: true,
        }),
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Stuller API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.products || []
    } catch (error) {
      console.error("[v0] Stuller API search error:", error)
      // Return empty array on error - site will fall back to mock data
      return []
    }
  }

  /**
   * Get product details by series ID
   * Stuller API endpoint: GET /api/v2/products/{seriesId}
   */
  async getProductById(seriesId: string): Promise<StullerProduct | null> {
    try {
      const response = await fetch(`${STULLER_API_BASE}/products/${seriesId}`, {
        method: "GET",
        headers: {
          Authorization: this.getAuthHeader(),
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Stuller API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Stuller API product fetch error:", error)
      return null
    }
  }

  /**
   * Submit order to Stuller
   * Stuller API endpoint: POST /api/v2/orders
   */
  async submitOrder(orderData: {
    customerInfo: {
      name: string
      email: string
      phone?: string
      shippingAddress: {
        line1: string
        line2?: string
        city: string
        state: string
        postalCode: string
        country: string
      }
    }
    items: Array<{
      seriesId: string
      quantity: number
      size?: string
    }>
    dropship?: boolean
  }): Promise<{ orderId: string; status: string } | null> {
    try {
      const response = await fetch(`${STULLER_API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthHeader(),
        },
        body: JSON.stringify({
          ...orderData,
          dropship: orderData.dropship ?? true, // Default to dropship
        }),
      })

      if (!response.ok) {
        throw new Error(`Stuller API order error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Stuller API order submission error:", error)
      return null
    }
  }

  /**
   * Check if API credentials are configured
   */
  isConfigured(): boolean {
    return this.credentials !== null
  }
}

// Export singleton instance
export const stullerApi = new StullerApiClient()

/**
 * Transform Stuller API product to our Product format
 */
export function transformStullerProduct(stullerProduct: StullerProduct): import("./products").Product {
  // Map Stuller metal types to our simplified types
  const metalMap: Record<string, "14k Gold" | "Platinum"> = {
    "14K Yellow Gold": "14k Gold",
    "14K White Gold": "14k Gold",
    "14K Rose Gold": "14k Gold",
    Platinum: "Platinum",
  }

  // Convert width from Stuller format (may be in mm)
  const widthMap: Record<number, "2mm" | "3mm" | "4mm" | "5mm" | "6mm"> = {
    2: "2mm",
    3: "3mm",
    4: "4mm",
    5: "5mm",
    6: "6mm",
  }

  return {
    id: stullerProduct.seriesId,
    name: stullerProduct.groupDescription || stullerProduct.description,
    description: stullerProduct.description,
    priceInCents: Math.round(stullerProduct.yourCost * 100),
    retailPriceInCents: Math.round(stullerProduct.retailPrice * 100),
    metal: metalMap[stullerProduct.metalType] || "14k Gold",
    width: widthMap[stullerProduct.width] || "4mm",
    finish: stullerProduct.finish || "Polished",
    image: stullerProduct.imagePath || "/placeholder.svg?height=400&width=400",
  }
}
