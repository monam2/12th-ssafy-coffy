import { DarkModeToggle } from "@/app/_components/dark-mode-toggle";
import React from "react";
import LogoBox from "./LogoBox";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="w-full h-16 flex justify-center bg-slate-200 dark:bg-slate-600">
      <div className="flex justify-around w-full gap-8">
        <LogoBox />
        <div className="flex items-center gap-2">
          <Button variant="outline" className="w-10 h-10 p-2">
            <IoCartOutline className="w-full h-full" />
          </Button>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
