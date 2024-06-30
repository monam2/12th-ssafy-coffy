"use client";
import { Button } from "@/components/ui/button";
import { isOpenCartState } from "@/recoil/cart/atoms";
import { usePathname } from "next/navigation";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const CartButton = () => {
  const pathname = usePathname();
  const setIsOpenCart = useSetRecoilState(isOpenCartState);

  if (pathname === "/menu") {
    return (
      <Button onClick={()=>setIsOpenCart(true)} variant="outline" className="w-10 h-10 p-2">
        <IoCartOutline className="w-full h-full" />
      </Button>
    );
  } else {
    <div className="w-10 h-10 p-2"></div>;
  }
};

export default CartButton;
