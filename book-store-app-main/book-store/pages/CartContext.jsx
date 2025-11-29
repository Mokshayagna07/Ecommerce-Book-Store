import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // ✅ Initialize from localStorage if available
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add book to cart (replace quantity instead of incrementing)
  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((b) => b.id === book.id);
      if (existing) {
        // Replace with new quantity instead of adding
        return prev.map((b) =>
          b.id === book.id ? { ...b, qty: book.qty } : b
        );
      }
      return [...prev, book];
    });
  };

  // Remove book from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
