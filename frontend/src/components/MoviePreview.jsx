import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Btn } from "./Btn";

export const MoviePreview = ({
  movie = "Movie Title",
  property1 = "default",
  link,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });
  return (
    <article
      className={`w-[270px] flex flex-col items-start gap-[10px] p-[10px] overflow-hidden rounded-[10px] bg-[#ffebc4a6] relative ${
        state.property1 === "hover"
          ? "shadow-[0px_2px_12px_2px_#22130026]"
          : "shadow-default-shadow"
      }`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="shadow-inner">
        <img
          className="w-full rounded-[10px] self-stretch grow flex-1 object-cover relative"
          alt="Movie poster"
          src={movie.poster_url}
        />
      </div>

      <div className="flex flex-col px-5 pt-2.5 pb-5 mt-2.5 rounded-xl">
        <p className="relative self-stretch mt-[-1.00px] font-h4 font-[number:var(--h4-font-weight)] text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)] text-[#ff3649] mt-3 text-xl">
          {movie.title}
        </p>
        <Btn
          className="mt-5 !border-[unset] !rounded-[20px] !gap-[unset] !flex[0_0_auto] !border-[unset] !px-0 !p-[5px]"
          divClassName={
            state.property1 === "hover"
              ? "!text-[#ff3649]"
              : "!text-[#ff3649] !opacity-[0.35]"
          }
          property1="no-bg"
          text="View Summary"
          link={link}
        />
      </div>
    </article>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

MoviePreview.propTypes = {
  movieTitle: PropTypes.string,
  property1: PropTypes.oneOf(["hover", "default"]),
};
