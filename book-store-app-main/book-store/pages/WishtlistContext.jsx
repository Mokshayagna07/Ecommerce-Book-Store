import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // ✅ Initialize from localStorage if available
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add book to wishlist (avoid duplicates)
  const addToWishlist = (book) => {
    setWishlist((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev; // avoid duplicates
      return [...prev, book];
    });
  };

  // Remove book from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
