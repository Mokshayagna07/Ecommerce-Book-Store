import { useWishlist } from "./WishtlistContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return <p className="text-center mt-5">Your wishlist is empty ❤️</p>;
  }

  return (
    <Container fluid className="my-5">
      <h2 className="mb-4 text-center">Your Wishlist</h2>
      <Row className="g-3">
        {wishlist.map((book) => (
          <Col md={3} sm={6} xs={12} key={book.id}>
            <Card className="p-3 shadow-sm h-100 d-flex flex-column">
              <div
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (book.type === "nyt") {
                    navigate(`/nytbook/${book.id}`);
                  } else {
                    navigate(`/book/${book.id}`);
                  }
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="img-fluid rounded"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
              <h6 className="mt-2 text-center">{book.title}</h6>
              <p className="text-muted text-center" style={{ fontSize: "0.9rem" }}>
                {book.author}
              </p>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  removeFromWishlist(book.id);
                  toast.info("❌ Removed from wishlist");
                }}
              >
                Remove
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
