import * as React from "react";

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
  const movieData = {
    title: "Movie Title",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci a lacinia lacinia, justo magna lacinia lectus, eu interdum nunc purus vel nisl. Fusce malesuada, ligula at varius tempor, lorem nunc consequat ante, nec dapibus orci purus a est. Praesent euismod nisi at nisi consectetur, ut aliquet neque congue. Nam cursus felis sit amet nunc pulvinar, nec dictum erat fringilla. Phasellus in mauris eu justo blandit eleifend vel vel purus. Integer dignissim, sem nec bibendum convallis, mi nisi auctor metus, vel dictum est eros ac tortor. Vestibulum vel nibh nec purus dapibus scelerisque." "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci a lacinia lacinia, justo magna lacinia lectus, eu interdum nunc purus vel nisl. Fusce malesuada, ligula at varius tempor, lorem nunc consequat ante, nec dapibus orci purus a est. Praesent euismod nisi at nisi consectetur, ut aliquet neque congue. Nam cursus felis sit amet nunc pulvinar, nec dictum erat fringilla. Phasellus in mauris eu justo blandit eleifend vel vel purus. Integer dignissim, sem nec bibendum convallis, mi nisi auctor metus, vel dictum est eros ac tortor. Vestibulum vel nibh nec purus dapibus scelerisque."',
    posterSrc: "../images/img2.jpeg",
    posterAlt: "Movie poster",
  };

  return (
    <main className="flex justify-center items-center px-16 py-20 max-md:px-5">
      <div className="w-full max-w-[956px] max-md:max-w-full">
        <MovieDetails
          title={movieData.title}
          description={movieData.description}
          posterSrc={movieData.posterSrc}
          posterAlt={movieData.posterAlt}
        />
      </div>
    </main>
  );
};
