"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // If it exists, map through and increase quantity of that specific item
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      // If it's new, add it with a quantity of 1
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success("Added to cart");
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem?.quantity === 1) {
        // If only 1 left, remove the item entirely
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Product removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId) =>
    cart.some((item) => String(item.id) === String(productId));

  // 3. Helper: Calculate totals automatically
  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        isInCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
