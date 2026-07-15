import { NextResponse } from "next/server"
import { createCartWithAttributes } from "@/lib/shopify"

// Variant id for the manually-created $1 "Try-On Save" product in Shopify admin.
const TRY_ON_SAVE_VARIANT_ID = process.env.SHOPIFY_TRY_ON_VARIANT_ID || ""

export async function POST(request: Request) {
  try {
    if (!TRY_ON_SAVE_VARIANT_ID) {
      return NextResponse.json(
        { error: "Try-on checkout is not configured yet. Set SHOPIFY_TRY_ON_VARIANT_ID." },
        { status: 501 },
      )
    }

    const { name, email, tryOnId } = await request.json()

    if (!name || !email || !tryOnId) {
      return NextResponse.json({ error: "name, email, and tryOnId are required" }, { status: 400 })
    }

    const cart = await createCartWithAttributes(
      TRY_ON_SAVE_VARIANT_ID,
      [
        { key: "try_on_id", value: tryOnId },
        { key: "try_on_name", value: name },
      ],
      email,
    )

    return NextResponse.json({ checkoutUrl: cart.checkoutUrl })
  } catch (error) {
    console.error("Error creating try-on checkout:", error)
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 })
  }
}
