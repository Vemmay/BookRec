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
      className={`w-[270px] flex flex-col items-start gap-[10px] p-[10px] h-[367px] overflow-hidden rounded-[10px] bg-[#ffebc4a6] relative ${
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
      <img
        className="w-full self-stretch grow flex-1 object-cover relative"
        alt="Img"
        src={movie.image}
      />
      <div className="flex flex-col px-5 pt-2.5 pb-5 mt-2.5 rounded-xl">
        <h3 className="mt-3 text-xl">{movie.name}</h3>
        <Btn
          className="!border-[unset] !rounded-[20px] !gap-[unset] !flex[0_0_auto] !border-[unset] !px-0 !p-[5px]"
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
