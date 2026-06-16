import { NextResponse } from "next/server"
import { updateCart } from "@/lib/shopify"

export async function POST(request: Request) {
  try {
    const { cartId, lines } = await request.json()

    if (!cartId || !lines) {
      return NextResponse.json({ error: "Cart ID and lines required" }, { status: 400 })
    }

    const cart = await updateCart(cartId, lines)
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}
