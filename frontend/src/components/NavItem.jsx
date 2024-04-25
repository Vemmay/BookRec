import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

export const NavItem = ({ text = "Nav-item", property1, className, link }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <Link
      to={link}
      className={`inline-flex items-center gap-[10px] px-[20px] py-[16px] justify-center relative ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`[font-family:'Sansita',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[16px] leading-[normal] whitespace-nowrap relative ${
          state.property1 === "hover" ? "text-[#ffa228]" : "text-[#ff3649]"
        } ${state.property1 === "hover" ? "font-bold" : "font-normal"}`}
      >
        {text}
      </div>
    </Link>
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
