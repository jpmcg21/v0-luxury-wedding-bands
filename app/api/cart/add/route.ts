import { NextResponse } from "next/server"
import { addToCart } from "@/lib/shopify"

export async function POST(request: Request) {
  try {
    const { cartId, lines } = await request.json()

    if (!cartId || !lines) {
      return NextResponse.json({ error: "Cart ID and lines required" }, { status: 400 })
    }

    const cart = await addToCart(cartId, lines)
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
