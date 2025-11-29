import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

// Pages
import Home from "../pages/Home";
import BrowseGenres from "../pages/Browsegenres";
import GenreBooks from "../pages/GenreBooks";
import BookDetails from "../pages/BookDetails";       // Google Books version
import NytBookDetails from "../pages/NytBookDetails"; // NYT version
import ContactUs from "../pages/ContactUs";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Cart from "../pages/cart"; 
import Wishlist from "../pages/wishlist"; 
import Checkout from "../pages/Checkout"; // Buy Now / Checkout page
import Orders from "../pages/Orders";     // Orders page after checkout
import SearchResults from "../components/SearchResults";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles
import "./index.css";
import Footer from "../components/Footer";

const App = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/search/:query" element={<SearchResults />} />
        {/* Static pages */}
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<BrowseGenres />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Dynamic pages */}
        <Route path="/genres/:genreName" element={<GenreBooks />} />
        <Route path="/book/:id" element={<BookDetails />} />           {/* Google Books */}
        <Route path="/nytbook/:isbn" element={<NytBookDetails />} />  {/* NYT Books */}

        {/* Cart, Wishlist, Checkout, Orders */}
        <Route path="/cart" element={<Cart />} />  
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
