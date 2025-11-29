import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let mergedResults = [];

      // Google Books API
      try {
        const gRes = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=20`
        );
        const gData = await gRes.json();
        if (gData.items) {
          const gBooks = gData.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(", ") || "Unknown",
            cover: item.volumeInfo.imageLinks?.thumbnail || "/no-cover.png",
            type: "google",
          }));
          mergedResults = [...mergedResults, ...gBooks];
        }
      } catch (err) {
        console.error("Google Books API error:", err);
      }

      // NYT Bestsellers API
      try {
        const nytRes = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=IpFD3ZIplkLRw1FqrQ5mWhz5Di5ISEm3`
        );
        const nytData = await nytRes.json();
        if (nytData.results?.books) {
          const nytBooks = nytData.results.books
            .filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))
            .map((b) => ({
              id: b.primary_isbn13,
              title: b.title,
              author: b.author,
              cover: b.book_image || "/no-cover.png",
              type: "nyt",
            }));
          mergedResults = [...mergedResults, ...nytBooks];
        }
      } catch (err) {
        console.error("NYT API error:", err);
      }

      setResults(mergedResults);
      setLoading(false);
    };

    fetchBooks();
  }, [query]);

  // ✅ UseMemo for optimized rendering
  const memoizedResults = useMemo(() => results, [results]);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  if (memoizedResults.length === 0)
    return <p className="text-center mt-5">No books found for "{query}"</p>;

  return (
    <Container className="my-5">
      <h3 className="mb-4">Search Results for: "{query}"</h3>
      <Row className="g-4">
        {memoizedResults.map((book) => (
          <Col md={3} key={book.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={book.cover}
                alt={book.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Link
                  to={
                    book.type === "google"
                      ? `/book/${book.id}`
                      : `/nytbook/${book.id}`
                  }
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
