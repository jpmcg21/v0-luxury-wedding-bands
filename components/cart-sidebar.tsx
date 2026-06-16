"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Checkout } from "@/components/checkout"
import { useState } from "react"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, closeCart, totalItems } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (!isOpen) return null

  if (showCheckout) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={closeCart}>
        <div
          className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-background shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Button variant="ghost" size="icon" onClick={() => setShowCheckout(false)}>
              <X className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">Checkout</h2>
            <div className="w-10" />
          </div>
          <div className="flex-1 overflow-auto p-6">
            <Checkout
              cartItems={items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              }))}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={closeCart}>
      <div
        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-background shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Your Cart ({totalItems})</h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some wedding bands to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.metal} • {item.width}
                    </p>
                    <p className="font-semibold">${(item.priceInCents / 100).toFixed(0)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${(totalPrice / 100).toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              size="lg"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
