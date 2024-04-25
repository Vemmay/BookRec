import React from "react";
import { TitleArea } from "../components/TitleArea";
import { LoginOut } from "../components/LoginOut";

export const LandingPage = () => {
  return (
    <div className="relative flex h-screen">
      <div className="flex flex-col mx-36 items-center gap-[25px] relative lg:flex-row">
        <div className="flex flex-col w-full items-start gap-[23px] relative">
          <div className="relative mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-[#ff3649] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
            CineTunes
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
