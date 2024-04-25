import React from "react";
import { Btn } from "../components/Btn";
import { MoviesListing } from "../components/MoviesListing";

export const Dashboard = () => {
  return (
    <div className="bg-[#feffef] flex justify-center items-center">
      <div className="flex flex-col gap-[96px] absolute top-[60px]">
        <div className="flex flex-col items start md:gap-[32px] relative p-[20px]">
          <div className="relative self-stretch mt-[-1.00px] font-h1 font-[number:var(--h1-font-weight)] text-[#ff3649] text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)]">
            Saved Movies
          </div>
          <div className="flex flex-col md:flex-row gap-[50px] md:min-w-735 p-[12px] relative w-full bg-[#ffebc473] rounded-[20px]">
            <div className="flex flex-col xs:min-w-[100px] items-start gap-[24px] p-[40px] relative">
              <p className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)] text-[#ff3649]">
                This your top movie
              </p>
              <p className="relative self-stretch font-paragraph-body-text font-[number:var(--paragraph-body-text-font-weight)] text-[length:var(--paragraph-body-text-font-size)] tracking-[var(--paragraph-body-text-letter-spacing)] leading-[var(--paragraph-body-text-line-height)] [font-style:var(--paragraph-body-text-font-style)] text-[#ff3649]">
                Very short description of featured movie...you would love this
                movie the most based on this year
              </p>
              <Btn
                className="!flex-[0_0_auto] !bg-[#ffebc4]"
                divClassName="text-[#ff3649]"
                property1="default"
                text="View Summary"
                link="/MoviePage"
              />
            </div>
            <img className="" alt="Img" src="" />
          </div>
        </div>
        <section>
          <MoviesListing />
        </section>
      </div>
    </div>
  );
};
