import React, { useReducer, useState } from "react";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const LoginOut = ({ property1, className, divClassName }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleClick = async () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };

  // Render the button
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-[10px] px-[20px] py-[16px] rounded-[10px] justify-center relative ${
        state.property1 === "hover" ? "shadow-[0px_4px_4px_#00000040]" : ""
      } ${
        state.property1 === "hover" ? "bg-[#1e1e1e]" : "bg-[#ff3649]"
      } ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`[font-family:'Sansita',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[16px] text-[#effcff] font-normal leading-[normal] whitespace-nowrap relative ${divClassName}`}
      >
        Login
      </div>
    </button>
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
