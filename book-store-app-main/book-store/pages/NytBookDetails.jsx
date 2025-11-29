import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useCart } from "../pages/CartContext";
import { useWishlist } from "../pages/WishtlistContext";
import { useOrders } from "./OrdersContext"; // Orders context
import { toast } from "react-toastify";

export default function NytBookDetails() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const { orders } = useOrders(); // just to check user/order if needed

  const generateFakePrice = () => (Math.random() * 20 + 5).toFixed(2);
  const generateFakeRating = () => (Math.random() * 2 + 3).toFixed(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=IpFD3ZIplkLRw1FqrQ5mWhz5Di5ISEm3`
        );
        const data = await res.json();
        const found = data.results.books.find((b) => b.primary_isbn13 === isbn);

        if (found) {
          setBook({
            id: found.primary_isbn13,
            title: found.title,
            author: found.author,
            cover: found.book_image,
            description: found.description || "No description available.",
            price: generateFakePrice(),
            rating: generateFakeRating(),
          });
        } else setBook(null);
      } catch (error) {
        console.error("Error fetching NYT book:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [isbn]);

  if (loading) return <p className="text-center mt-5">Loading NYT book details...</p>;
  if (!book) return <p className="text-center mt-5 text-danger">❌ Book not found in NYT list.</p>;

  const shortDesc =
    book.description.length > 200 ? book.description.slice(0, 200) + "..." : book.description;

  // ✅ Buy Now navigates to checkout only
  const handleBuyNow = () => {
    toast.info(`🛍️ Proceeding to checkout for "${book.title}"`, {
      theme: "light",
      style: { backgroundColor: "#f0f0f0", color: "#333" },
    });
    navigate("/checkout", { state: { book: { ...book, qty } } });
  };

  const toastLight = (message, type = "success") => {
    const options = {
      theme: "light",
      style: { backgroundColor: "#f0f0f0", color: "#333" },
    };
    if (type === "success") toast.success(message, options);
    else toast.info(message, options);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center">
          <img
            src={book.cover}
            alt={book.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px" }}
          />
        </Col>
        <Col md={8}>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Rating:</strong> {book.rating} ⭐</p>
          <p>
            <strong>Description:</strong>{" "}
            {showFullDesc ? book.description : shortDesc}{" "}
            {book.description.length > 200 && (
              <Button variant="link" className="p-0" onClick={() => setShowFullDesc(!showFullDesc)}>
                {showFullDesc ? "Show Less" : "Show More"}
              </Button>
            )}
          </p>

          <Form.Group controlId="quantity" className="mb-3" style={{ maxWidth: "120px" }}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </Form.Group>

          <div className="d-flex gap-3 mt-3">
            {/* ✅ Add to Cart */}
            <Button
              variant="primary"
              onClick={() => {
                addToCart({ ...book, qty });
                toastLight("Book added to cart");
              }}
            >
              Add {qty} to Cart
            </Button>

            {/* ✅ Buy Now */}
            <Button variant="success" onClick={handleBuyNow}>
              Buy Now
            </Button>

            {/* ✅ Add to Wishlist */}
            <Button
              variant="outline-danger"
              onClick={() => {
                addToWishlist({ ...book, type: "nyt" });
                toastLight(`❤️Book added to wishlist!`);
              }}
            >
              Add to Wishlist ❤️
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
