import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: "#e8756bff" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo + Bookstore name */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          📚 StorySpace
        </Link>

        {/* Search Bar */}
        <form className="d-flex me-3" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        {/* Nav Links */}
        <ul className="navbar-nav d-flex flex-row gap-4 mb-0 align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold" to="/genres">Browse Genres</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold" to="/Orders">My Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold" to="/ContactUs">Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold" to="/signup">Signup</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold" to="/login">Login</Link>
          </li>

          {/* Wishlist Heart Icon */}
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/wishlist">
              <FontAwesomeIcon icon={faHeart} className="nav-icon-heart" />
            </Link>
          </li>

          {/* Cart Icon */}
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="nav-icon-cart" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
