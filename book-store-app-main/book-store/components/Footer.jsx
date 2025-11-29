import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css"; // import the external CSS

export default function Footer() {
  return (
    <footer className="footer">
      
        <Row className="justify-content-between">
          <Col md={3} className="mb-3">
            <h5 className="footer-brand">StorySpace</h5>
            <p className="footer-desc">Discover, buy & enjoy your favorite books!</p>
          </Col>

          <Col md={3} className="mb-3">
            <h6 className="footer-title">Policies</h6>
            <ul className="footer-links">
              <li>Privacy Policies</li>
              <li>Terms Of Use</li>
              <li>Secure Shopping</li>
              <li>CopyRight Policies</li>
            </ul>
          </Col>

          <Col md={3} className="mb-3">
            <h6 className="footer-title">Account</h6>
            <ul className="footer-links">
                <li><Link to="/Home" className="footer-link">Home</Link></li>
              <li><Link to="/orders" className="footer-link">My Orders</Link></li>
              <li><Link to="/signup" className="footer-link">Signup</Link></li>
              <li><Link to="/login" className="footer-link">Login</Link></li>
              <li><Link to="/contactUs" className="footer-link">Contact Us</Link></li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-separator" />

        <Row>
          <Col className="text-center">
            <small className="footer-copy">&copy; {new Date().getFullYear()} . All rights reserved.</small>
          </Col>
        </Row>

    </footer>
  );
}
