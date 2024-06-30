"use client"
import React, { useRef } from "react";
import Menu from "@/components/page/menu/Menu";
import { FaArrowUp } from "react-icons/fa";

const Page = () => {
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (menuContainerRef.current) {
      menuContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
      ref={menuContainerRef}
    >
      <Menu scrollToTop={scrollToTop} />
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-6 bg-blue-300 p-3 text-white rounded-full shadow-lg"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Page;
