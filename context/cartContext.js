"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
    toast.success("Product added to cart");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId) =>
    cart.some((item) => String(item.id) === String(productId));
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
