import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

function MovieTitle({ title }) {
  return (
    <div className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-[#ff3649] text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
      {title}
    </div>
  );
}

function MovieDescription({ description }) {
  return (
    <div className="mt-6 text-base tracking-tight leading-5 max-md:max-w-full">
      {description}
    </div>
  );
}

function MoviePoster({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="grow self-stretch w-full max-md:mt-10"
    />
  );
}

function MovieDetails({ title, description, posterSrc, posterAlt }) {
  return (
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow self-stretch pb-20 text-black max-md:mt-10 max-md:max-w-full">
          <MovieTitle title={title} />
          <MovieDescription description={description} />
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
        <MoviePoster src={posterSrc} alt={posterAlt} />
      </div>
    </div>
  );
}

export const MovieContainer = () => {
  const [movie, setMovie] = useState([]);

  const id = new URLSearchParams(window.location.search).get("id");

  console.log(id);
  useEffect(() => {
    if (id) {
      // Fetch the movie data from the server using the ID in the query parameters
      fetch(`http://127.0.0.1:5000/movie/${id}`)
        .then((response) => response.json()) // Parse the JSON
        .then((data) => {
          setMovie(data); // Update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching movie:", error);
        });
    }
  }, [id]);

  return (
    <main className="flex justify-center items-center px-16 py-20 max-md:px-5">
      <div className="w-full max-w-[956px] max-md:max-w-full">
        <MovieDetails
          title={movie.title}
          description={movie.summary}
          posterSrc={movie.poster_url}
          posterAlt={`Poster for ${movie.title}`}
        />
      </div>
    </main>
  );
};
