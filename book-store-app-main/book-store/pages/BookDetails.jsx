import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishtlistContext";
import { toast } from "react-toastify";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  // ✅ Generate values only once using useMemo
  const generateFakePrice = useMemo(() => (Math.random() * 20 + 5).toFixed(2), [id]);
  const generateFakeRating = useMemo(() => (Math.random() * 2 + 3).toFixed(1), [id]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await res.json();
        const info = data.volumeInfo;

        setBook({
          id,
          title: info.title || "No Title",
          author: info.authors?.join(", ") || "Unknown",
          cover: info.imageLinks?.thumbnail || "/no-cover.png",
          description: info.description || "No description available.",
          price: generateFakePrice,
          rating: generateFakeRating,
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        toastLight("Failed to fetch book details", "error");
      }
    };
    fetchBook();
  }, [id, generateFakePrice, generateFakeRating]);

  // ✅ Memoized short description
  const shortDesc = useMemo(() => {
    if (!book?.description) return "";
    return book.description.length > 200
      ? book.description.slice(0, 200) + "..."
      : book.description;
  }, [book]);

  if (!book) return <p className="text-center mt-5">Loading book details...</p>;

  const handleBuyNow = () => {
    toastLight(`🛍️ Proceeding to checkout for "${book.title}"`, "info");
    navigate("/checkout", { state: { book: { ...book, qty: quantity } } });
  };

  // ✅ Reusable light toast function
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
              <Button
                variant="link"
                className="p-0"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "Show Less" : "Show More"}
              </Button>
            )}
          </p>

          <Form.Group controlId="quantity" className="mb-3" style={{ maxWidth: "120px" }}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Form.Group>

          <div className="d-flex gap-3 mt-4">
            <Button
              variant="primary"
              onClick={() => {
                addToCart({ ...book, qty: quantity });
                toastLight("book added to cart!");
              }}
            >
              Add {quantity} to Cart
            </Button>

            <Button variant="success" onClick={handleBuyNow}>
              Buy Now
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => {
                addToWishlist({ ...book, type: "google" });
                toastLight(`❤️ Book added to wishlist!`);
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
