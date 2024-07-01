import { DarkModeToggle } from "@/app/_components/dark-mode-toggle";
import React from "react";
import LogoBox from "./LogoBox";
import CartButton from "./CartButton";
import OrderButton from "./OrderButton";

const Header = () => {
  return (
    <div className="w-full h-16 flex justify-center bg-slate-200 dark:bg-slate-600">
      <div className="flex justify-around w-full gap-8">
        <LogoBox />
        <div className="flex items-center gap-2">
          <OrderButton />
          <CartButton />
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
