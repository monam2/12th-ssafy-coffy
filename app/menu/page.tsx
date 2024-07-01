"use client";
import React, { useRef, useState } from "react";
import Menu from "@/components/page/menu/Menu";
import { FaArrowUp } from "react-icons/fa";
import CartModal from "@/components/page/cart/CartModal";
import { IoCartSharp } from "react-icons/io5";
import { isOpenCartState } from "@/recoil/cart/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { totalCartCount } from "@/recoil/cart/selector";

const Page = () => {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const setIsOpenCart = useSetRecoilState(isOpenCartState);
  const cartCount = useRecoilValue(totalCartCount);

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
        className="fixed bottom-20 right-6 bg-blue-300 hover:bg-blue-500 hover:scale-110 p-3 text-white rounded-full shadow-lg"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
      <button
        onClick={() => setIsOpenCart(true)}
        className="fixed bottom-20 right-20 bg-blue-300 hover:bg-blue-500 hover:scale-110 p-3 text-white rounded-full shadow-lg"
      >
        {!cartCount ? (
          <IoCartSharp className="w-6 h-6" />
        ) : (
          <div className="w-6 h-6 flex justify-center items-center"><span className="text-2xl font-semibold font-[Pretendard]" >{cartCount}</span></div>
          
        )}
      </button>
      <CartModal />
    </div>
  );
};

export default Page;
