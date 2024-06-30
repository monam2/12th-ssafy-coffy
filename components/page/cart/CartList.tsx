"use client";
import { cartState } from "@/recoil/cart/atoms";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countedCartMenuList } from "@/recoil/cart/selector";
import CartItem from "./CartItem";

const CartList = () => {
  const [cartMenus, setCartMenus] = useRecoilState(cartState);
  const cartItems = useRecoilValue(countedCartMenuList);

  if (!cartMenus.length) {
    return (
      <div className="w-full h-32 justify-center flex items-center text-4xl text-gray-400 opacity-70 font-[BitBit]">
        텅..
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center">
      {cartItems.map(({item, count}) => {
        return <CartItem key={item.id} item={item} count={count}></CartItem>;
      })}
    </div>
  );
};

export default CartList;
