import React from "react";
import { MoviePreview } from "./MoviePreview";

export const MoviesListing = ({}) => {
  const movies = [
    {
      name: "Movie 1",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 2",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 3",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 3",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 3",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 3",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 3",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
    {
      name: "Movie 3",
      image: "../images/img2.jpeg",
      summaryLink: "#",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {movies.map((movie, index) => (
        <MoviePreview key={index} movie={movie} link="/MoviePage" />
      ))}
    </div>
  );
};
