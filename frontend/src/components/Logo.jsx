import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ className }) => {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-[10px] p-[10px] relative ${className}`}
      to="/"
    >
      <div className="relative w-fit mt-[-1.00px] font-logo font-[number:var(--logo-font-weight)] text-[#ff3649] text-[length:var(--logo-font-size)] tracking-[var(--logo-letter-spacing)] leading-[var(--logo-line-height)] whitespace-nowrap [font-style:var(--logo-font-style)]">
        CineTunes
      </div>
    </Link>
  );
};
