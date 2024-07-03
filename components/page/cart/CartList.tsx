"use client";
import { cartState } from "@/recoil/cart/atoms";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import CartItem from "./CartItem";
import { getCartDataAtSession, setCartDataAtSession } from "@/lib/checkCart";

const CartList = () => {
  const [cartMenus, setCartMenus] = useRecoilState(cartState);

  const cartDataHandler = () => {
    if (cartMenus.length) {
      setCartDataAtSession(cartMenus);
      return;
    }

    const cartMenusAtSession = getCartDataAtSession();
    if (cartMenusAtSession) {
      setCartMenus(cartMenusAtSession);
      return;
    }
  }

  useEffect(() => {
    cartDataHandler();
  }, [])

  if (!cartMenus.length) {
    return (
      <div className="w-full h-32 justify-center flex items-center text-4xl text-gray-400 opacity-70 font-[BitBit]">
        텅..
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center">
      <div className={`flex flex-col justify-start items-center w-full min-h-32 max-h-[500px] pt-3 gap-2 ${cartMenus.length >= 15 ? 'overflow-y-scroll' : ''}`} style={{ scrollbarWidth: 'thin' }}>
        {cartMenus.map((item, idx) => {
          return <CartItem key={item.cartId} item={item} idx={idx} setCartMenus={setCartMenus} cartMenus={cartMenus}></CartItem>;
        })}
      </div>
    </div>
  );
};

export default CartList;
