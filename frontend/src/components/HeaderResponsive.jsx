import React from "react";
import { LoginOut } from "./LoginOut";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export const HeaderResponsive = () => {
  return (
    <div className="flex flex-col w-full h-[64px] items-center justify-center gap[10px] relative bg-[#ffebc4] overflow-auto">
      <div className="flex w-full h-[60px] items-center justify-between relative px-10">
        <Logo className="!flex-[0_0_auto]" />
        <div className="inline-flex items-start gap-[12px] relative flex-[0_0_auto]">
          <NavItem
            className="!flex-[0_0_auto]"
            property1="default"
            text="Dashboard"
            link="/Dashboard"
          />
          <NavItem
            className="!flex-[0_0_auto]"
            property1="default"
            text="Contact Us"
            link="/contact-us"
          />
          <LoginOut
            className="!flex-[0_0_auto]"
            property1="default"
            text="Sign in"
          />
        </div>
      </div>
    </div>
  );
};
