"use client"

import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShopifyCart } from "@/contexts/shopify-cart-context"

export function ShopifyCartSidebar() {
  const { cart, isOpen, closeCart, updateItem, removeItem, totalItems, totalPrice, isLoading } = useShopifyCart()

  if (!isOpen) return null

  const cartLines = cart?.lines.edges || []

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-medium">Shopping Cart ({totalItems})</h2>
          <button onClick={closeCart} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartLines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={closeCart} className="mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartLines.map(({ node: item }) => {
                const image = item.merchandise.product.images.edges[0]?.node
                const price = Number.parseFloat(item.merchandise.price.amount)

                return (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {image ? (
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.altText || item.merchandise.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.merchandise.product.title}</h3>
                      {item.merchandise.title !== "Default Title" && (
                        <p className="text-sm text-muted-foreground">{item.merchandise.title}</p>
                      )}
                      <p className="text-sm font-medium mt-1">
                        ${price.toFixed(2)} {item.merchandise.price.currencyCode}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateItem(item.id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                          className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="ml-auto text-sm text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartLines.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal</span>
              <span>
                ${totalPrice.toFixed(2)} {cart?.cost.totalAmount.currencyCode}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout</p>
            <Button
              className="w-full"
              size="lg"
              disabled={isLoading}
              onClick={() => {
                if (cart?.checkoutUrl) {
                  window.location.href = cart.checkoutUrl
                }
              }}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
