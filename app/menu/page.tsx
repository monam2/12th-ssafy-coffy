import Menu from "@/components/page/menu/Menu";
import React from "react";

const page = () => {
  return <div className="w-full h-full overflow-y-auto" style={{scrollbarWidth : "thin"}}>
    <Menu />
  </div>;
};

export default page;
