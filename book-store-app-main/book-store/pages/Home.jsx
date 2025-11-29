import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Spinner } from "react-bootstrap";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
    "/images/Banner2.jpg",
    "/images/Banner1.jpg",
    "/images/Banner3.jpg",
  ];

  // Auto-slide banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch NYT books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(
          "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=IpFD3ZIplkLRw1FqrQ5mWhz5Di5ISEm3"
        );
        const data = await res.json();

        const booksWithExtras = data.results.books.map((book) => ({
          ...book,
          description:
            book.description ||
            "This is a bestselling book loved by readers worldwide.",
          price: 20 + Math.floor(Math.random() * 30),
          rating: (Math.random() * 2 + 3).toFixed(1),
        }));

        setBooks(booksWithExtras);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading)
    return <Spinner animation="border" className="mt-5 d-block mx-auto" />;

  return (
    <div className="m-0 p-0">
      {/* Banner */}
      <div
        className="position-relative mb-4"
        style={{ height: "400px", overflow: "hidden" }}
      >
        {bannerImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Banner ${idx + 1}`}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              objectFit: "cover",
              transition: "opacity 0.8s ease-in-out",
              opacity: currentIndex === idx ? 1 : 0,
              zIndex: currentIndex === idx ? 1 : 0,
            }}
          />
        ))}

        {/* Dots navigation */}
        <div className="position-absolute d-flex flex-column gap-2 end-0 top-50 translate-middle-y pe-3">
          {bannerImages.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-circle ${
                currentIndex === idx ? "bg-dark" : "bg-secondary"
              }`}
              style={{
                width: "12px",
                height: "12px",
                cursor: "pointer",
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <h1 className="mb-4 px-3">Best Sellers</h1>
      <Row className="g-4 px-3">
        {books.map((book) => (
          <Col key={book.primary_isbn13} xs={12} sm={6} md={3}>
            <Card className="h-100 shadow-sm border-0">
              <Link
                to={`/nytbook/${book.primary_isbn13}`}
                className="text-decoration-none"
              >
                <Card.Img
                  variant="top"
                  src={book.book_image}
                  alt={book.title}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="text-dark">{book.title}</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Customer Reviews Section */}
      <div className="px-3 my-5">
        <h2 className="mb-4">What Our Readers Say</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <Card.Body>
                <Card.Text>
                  ⭐⭐⭐⭐⭐ <br />
                  “Absolutely love this store! The bestsellers are always
                  updated and delivery is quick.”
                </Card.Text>
                <small className="text-muted">– Priya S.</small>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <Card.Body>
                <Card.Text>
                  ⭐⭐⭐⭐☆ <br />
                  “Great variety of genres. Found books here that I couldn’t
                  find elsewhere.”
                </Card.Text>
                <small className="text-muted">– Rahul K.</small>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <Card.Body>
                <Card.Text>
                  ⭐⭐⭐⭐⭐ <br />
                  “The customer service is excellent, and the wishlist feature
                  is super helpful!”
                </Card.Text>
                <small className="text-muted">– Ananya R.</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
