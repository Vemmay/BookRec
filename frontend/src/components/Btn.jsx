import { PropTypes } from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

export const Btn = ({ text = "Button Text", property1, className, link }) => {
  return (
    <Link to={link}>
      <button
        className={`all-[unset] box-border inline-flex items-center gap-[10px] px-[20px] py-[16px] rounded-[10px] justify-center relative ${className}`}
      >
        <div
          className={`[font-family:'Sansita',Helvetica] w-fit mt-1[-1.00px] tracking-[0] text-[#ff3649] font-bold leading-[normal] whitespace-nowrap relative ${
            property1 === "no-bg" ? "underline" : ""
          } `} /* add property to change style of text */
        >
          {text}
        </div>
      </button>
    </Link>
  );
};

Btn.propTypes = {
  text: PropTypes.string,
  property1: PropTypes.oneOf(["no-bg", "default"]),
};
