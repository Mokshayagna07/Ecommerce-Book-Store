import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./ContactUs.css"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    subject: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    // ✅ full width background
    <div
      style={{
        background: "linear-gradient(135deg, #f9f9ff, #e6f7ff)",
        minHeight: "100vh",
        padding: "50px 0",
      }}
      className="w-100"
    >
      {/* ✅ use fluid container */}
      <Container fluid>
        <h2 className="text-center mb-3 text-primary fw-bold">📞 Contact Us</h2>
        <p className="text-center mb-5 text-secondary">
          Please fill up the form below to send us a message. We will contact you very soon.
        </p>

        {/* ✅ remove bootstrap margins */}
        <Row className="g-4 mx-0 px-4">
          {/* Left: Form */}
          <Col md={7}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <h4 className="mb-4 text-info">Send us a Message</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 d-flex">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Button variant="warning" className="ms-2">
                      Verify Email
                    </Button>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone/Mobile"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option>--Select--</option>
                      <option>General Inquiry</option>
                      <option>Support</option>
                      <option>Feedback</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Description *"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    🚀 Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: Contact Info */}
          <Col md={5}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body className="p-4 d-flex flex-column justify-content-center">
                <img
                  src="../public/images/contact.jpg"
                  alt="Contact"
                  className="img-fluid mb-3 mx-auto"
                  style={{ maxHeight: "350px" }}
                />
                <h5 className="text-danger fw-bold mb-3">Our Office</h5>
                <p className="mb-2">
                  <strong>SR Ecommerce Factory Pvt. Ltd.</strong>
                  <br />
                  2/14, Ansari road, Daryaganj Delhi 110002
                </p>
                <p className="mb-1">
                  📧{" "}
                  <a
                    href="mailto:customerservice@bookswagon.com"
                    className="text-decoration-none text-info"
                  >
                    customerservice@bookswagon.com
                  </a>
                </p>
                <p className="mb-1">📞 011-41521153</p>
                <p className="mb-0">
                  ⏰ 9:00 am to 6:00 pm (Closed on Sundays & Public Holidays)
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
