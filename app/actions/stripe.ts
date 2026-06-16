"use server"

import { stripe } from "@/lib/stripe"
import { getProductById } from "@/lib/products"
import { stullerApi } from "@/lib/stuller-api"

export async function startCheckoutSession(cartItems: Array<{ productId: string; quantity: number }>) {
  const lineItems = await Promise.all(
    cartItems.map(async (item) => {
      const product = await getProductById(item.productId)
      if (!product) {
        throw new Error(`Product with id "${item.productId}" not found`)
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `${product.metal} • ${product.width} • ${product.finish}`,
            metadata: {
              stuller_series_id: product.id,
            },
          },
          unit_amount: product.priceInCents,
        },
        quantity: item.quantity,
      }
    }),
  )

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
    metadata: {
      cart_items: JSON.stringify(cartItems),
    },
  })

  return session.client_secret
}

export async function handlePaymentSuccess(sessionId: string) {
  try {
    // Retrieve the session with line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details"],
    })

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed")
    }

    // If Stuller API is configured, submit order for dropshipping
    if (stullerApi.isConfigured() && session.customer_details) {
      const cartItems = JSON.parse(session.metadata?.cart_items || "[]")

      const stullerOrder = await stullerApi.submitOrder({
        customerInfo: {
          name: session.customer_details.name || "Customer",
          email: session.customer_details.email || "",
          phone: session.customer_details.phone || undefined,
          shippingAddress: {
            line1: session.customer_details.address?.line1 || "",
            line2: session.customer_details.address?.line2 || undefined,
            city: session.customer_details.address?.city || "",
            state: session.customer_details.address?.state || "",
            postalCode: session.customer_details.address?.postal_code || "",
            country: session.customer_details.address?.country || "US",
          },
        },
        items: cartItems.map((item: { productId: string; quantity: number }) => ({
          seriesId: item.productId,
          quantity: item.quantity,
        })),
        dropship: true,
      })

      console.log("[v0] Stuller order submitted:", stullerOrder)
      return { success: true, stullerOrderId: stullerOrder?.orderId }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Payment success handler error:", error)
    throw error
  }
}
