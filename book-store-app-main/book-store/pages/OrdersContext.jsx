import React, { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create context
const OrdersContext = createContext();

// 2️⃣ Provider
export function OrdersProvider({ children }) {
  // Load initial orders from localStorage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Add a new order
  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  // Cancel order
  const cancelOrder = (id) => {
    setOrders(orders.filter((o) => o.book.id !== id));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

// 3️⃣ Custom hook
export const useOrders = () => useContext(OrdersContext);
