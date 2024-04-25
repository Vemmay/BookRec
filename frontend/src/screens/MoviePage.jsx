import React from "react";
import { MovieContainer } from "../components/MovieContainer";

export const MoviePage = () => {
  return (
    <div className="flex items-center justify-center bg-[#fdffef] overflow-auto relative">
      <div className="flex flex-col mx-36 items-center gap-[50px] relative lg:flex-row mt-16">
        <div className="flex flex-col w-full items-start gap-[23px] relative">
          <div className="relative mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-[#ff3649] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
            {text}
          </div>
          <p className="relative self-stretch font-paragraph-body-text font-[number:var(--paragraph-body-text-font-weight)] text-[#ff3649] text-[length:var(--paragraph-body-text-font-size)] tracking-[var(--paragraph-body-text-letter-spacing)] leading-[var(--paragraph-body-text-line-height)] [font-style:var(--paragraph-body-text-font-style)]">
            Find the perfect movie that finds the mood!
          </p>
          <LoginOut
            className="!flex-[0_0_auto]"
            divClassName="!font-extrabold"
            property1="default"
            text="Sign in"
          />
        </div>
        <div>
          <img className="w-full object-cover" alt="Img" src="" />
        </div>
      </div>
    </div>
  );
};
