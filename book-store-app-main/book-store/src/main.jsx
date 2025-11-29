import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { CartProvider } from "../pages/CartContext";
import { WishlistProvider } from "../pages/WishtlistContext";
import { OrdersProvider } from "../pages/OrdersContext"; // ✅ add OrdersProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>   {/* ✅ wrap App with OrdersProvider */}
            <App />
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
