
    import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Genres from "../components/Genres";
import "./Browsegenres.css"

function Browsegenres() {
  const navigate = useNavigate();
  const genres = Genres(); // ✅ call the Genres component (function) to get array

  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-4">📚 Browse Genres</h2>
      <div className="row g-4">
        {genres.map((genre, idx) => (
          <div key={idx} className="col-md-3 col-sm-9 col-sm-6 col-12">
            <Card
              className="h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/genres/${encodeURIComponent(genre.query)}`, { state: { displayName: genre.name } })}

            >
              <Card.Img
                variant="top"
                src={genre.img}
                alt={genre.name}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-center">{genre.name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browsegenres;

    