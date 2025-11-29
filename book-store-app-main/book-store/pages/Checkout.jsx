import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useOrders } from "./OrdersContext";
import { toast } from "react-toastify";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    address: "",
    payment: "",
  });

  if (!state || !state.book) {
    navigate("/");
    return null;
  }

  const book = state.book;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    // Check if all fields are filled
    const { name, gender, dob, address, payment } = formData;
    if (!name || !gender || !dob || !address || !payment) {
      toast.error("❌ Please fill in all fields to place the order!");
      return;
    }

    addOrder({ book, userDetails: formData });
    toast.success("✅ Order placed successfully!");
    navigate("/orders");
  };

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h3>Checkout for: {book.title}</h3>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="success" className="mt-3" onClick={handleSubmit}>
          Place Order
        </Button>
      </Form>
    </Container>
  );
}
