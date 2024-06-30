"use client";
import { isOpenCartState } from "@/recoil/cart/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import CartList from "./CartList";

const CartModal = () => {
  const [isOpenCart, setIsOpenCart] = useRecoilState(isOpenCartState);

  return (
    <div
      onClick={() => setIsOpenCart(false)}
      className={`${
        isOpenCart ? "flex" : "hidden"
      } fixed inset-0 items-center justify-center z-50 bg-black bg-opacity-50`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white dark:bg-slate-500 rounded-lg shadow-lg w-11/12 max-w-lg"
      >
        <div className="flex justify-between items-center border-b border-gray-500 p-4">
          <h2 className="text-xl font-semibold">장바구니</h2>
        </div>
        <CartList />
        <div className="flex justify-end gap-4 p-4 border-t">
          <button
            onClick={() => setIsOpenCart(false)}
            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            주문하기
          </button>
          <button
            onClick={() => setIsOpenCart(false)}
            className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
