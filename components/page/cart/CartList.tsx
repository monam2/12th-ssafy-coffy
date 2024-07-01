"use client";
import { cartState } from "@/recoil/cart/atoms";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalCartCount, totalCartPrice } from "@/recoil/cart/selector";
import CartItem from "./CartItem";

const CartList = () => {
  const [cartMenus, setCartMenus] = useRecoilState(cartState);
  const cartItems = useRecoilValue(cartState);

  if (!cartMenus.length) {
    return (
      <div className="w-full h-32 justify-center flex items-center text-4xl text-gray-400 opacity-70 font-[BitBit]">
        텅..
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center">
      <div className={`flex flex-col justify-start items-center w-full min-h-32 max-h-[500px] pt-3 gap-2 ${cartItems.length >=15 ? 'overflow-y-scroll' :  ''}`} style={{scrollbarWidth : 'thin'}}>
        {cartItems.map((item, idx) => {
          return <CartItem key={item.cartId} item={item} idx={idx}></CartItem>;
        })}
      </div>
    </div>
  );
};

export default CartList;
