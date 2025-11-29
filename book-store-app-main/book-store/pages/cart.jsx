import { useCart } from "./CartContext";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (book) => {
    navigate("/checkout", { state: { book } });
  };

  if (cart.length === 0) {
    return <p className="text-center mt-5">Your cart is empty 🛒</p>;
  }

  return (
    <Container fluid className="my-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <Row className="g-3">
        {cart.map((book) => (
          <Col md={4} sm={6} xs={12} key={book.id}>
            <Card className="p-3 shadow-sm h-100 d-flex flex-column">
              <div className="d-flex">
                <div style={{ flex: "0 0 120px" }}>
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="img-fluid rounded"
                    style={{ height: "160px", width: "120px", objectFit: "cover" }}
                  />
                </div>
                <div className="ms-3 d-flex flex-column flex-grow-1">
                  <h5 className="mb-2">{book.title}</h5>
                  <p className="mb-1"><strong>Author:</strong> {book.author}</p>
                  <p className="mb-1"><strong>Price:</strong> {book.price}</p>
                  <p className="mb-2"><strong>Qty:</strong> {book.qty}</p>
                  <div className="mt-auto d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleBuyNow(book)}
                    >
                      Buy Now ✅
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(book.id)}
                    >
                      Remove ❌
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
