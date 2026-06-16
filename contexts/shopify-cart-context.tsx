"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { ShopifyCart } from "@/lib/shopify/types"

interface CartContextType {
  cart: ShopifyCart | null
  isLoading: boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function ShopifyCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Load or create cart on mount
  useEffect(() => {
    const initCart = async () => {
      const cartId = localStorage.getItem("shopify_cart_id")

      if (cartId) {
        try {
          const response = await fetch(`/api/cart?cartId=${cartId}`)
          if (response.ok) {
            const existingCart = await response.json()
            if (existingCart) {
              setCart(existingCart)
              return
            }
          }
        } catch (error) {
          console.error("Error fetching cart:", error)
        }
      }

      // Create new cart if none exists
      try {
        const response = await fetch("/api/cart", { method: "POST" })
        if (response.ok) {
          const newCart = await response.json()
          setCart(newCart)
          localStorage.setItem("shopify_cart_id", newCart.id)
        }
      } catch (error) {
        console.error("Error creating cart:", error)
      }
    }

    initCart()
  }, [])

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      if (!cart) return
      setIsLoading(true)

      try {
        const response = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: cart.id,
            lines: [{ merchandiseId: variantId, quantity }],
          }),
        })

        if (response.ok) {
          const updatedCart = await response.json()
          setCart(updatedCart)
          setIsOpen(true)
        }
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart],
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return
      setIsLoading(true)

      try {
        const response = await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: cart.id,
            lines: [{ id: lineId, quantity }],
          }),
        })

        if (response.ok) {
          const updatedCart = await response.json()
          setCart(updatedCart)
        }
      } catch (error) {
        console.error("Error updating cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart],
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setIsLoading(true)

      try {
        const response = await fetch("/api/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: cart.id,
            lineIds: [lineId],
          }),
        })

        if (response.ok) {
          const updatedCart = await response.json()
          setCart(updatedCart)
        }
      } catch (error) {
        console.error("Error removing from cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart],
  )

  const totalItems = cart?.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0) || 0
  const totalPrice = cart ? Number.parseFloat(cart.cost.totalAmount.amount) : 0

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useShopifyCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useShopifyCart must be used within a ShopifyCartProvider")
  }
  return context
}
