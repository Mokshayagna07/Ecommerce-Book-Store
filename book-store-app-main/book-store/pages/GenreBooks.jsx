import React, { useEffect, useState } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./GenreBooks.css"

// 📌 import placeholder image
import placeholder from "../public/images/placeholder-book.png";

function GenreBooks() {
  const { genreName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async (append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genreName}&maxResults=12&startIndex=${append ? startIndex : 0}`
      );
      const data = await res.json();

      if (append) {
        setBooks((prev) => [...prev, ...(data.items || [])]);
      } else {
        setBooks(data.items || []);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setBooks([]);
    setStartIndex(0);
    fetchBooks(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreName]);

  const handleLoadMore = () => {
    setStartIndex((prev) => prev + 12);
  };

  useEffect(() => {
    if (startIndex > 0) {
      fetchBooks(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex]);

  if (loading && books.length === 0) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">{genreName} Books</h2>
      <div className="row g-4">
        {books.map((book) => {
          const info = book.volumeInfo || {};
          const coverUrl = info.imageLinks?.thumbnail || placeholder;

          return (
            <div key={book.id} className="col-md-3 col-sm-6">
              <Card
                className="shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <Card.Img
                  variant="top"
                  src={coverUrl}
                  alt={info.title}
                  style={{
                    height: "220px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                    padding: "5px",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    className="text-center"
                    style={{
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {info.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      {books.length > 0 && (
        <div className="text-center mt-4">
          <Button onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default GenreBooks;
