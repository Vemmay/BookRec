import React, { useState, useEffect } from "react";
import { MoviePreview } from "./MoviePreview";

export const MoviesListing = ({}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch the movies JSON file
    fetch("http://localhost:5000/static/top_movies.json")
      .then((response) => response.json()) // Parse the JSON
      .then((data) => setMovies(data)) // Update the state with the data
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {movies.map((movie, index) => (
        <MoviePreview
          key={index}
          movie={movie}
          link={`/MoviePage/?id=${movie.id}`}
        />
      ))}
    </div>
  );
};
