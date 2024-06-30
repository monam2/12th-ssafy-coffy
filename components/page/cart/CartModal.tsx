"use client";
import { cartState, isOpenCartState } from "@/recoil/cart/atoms";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CartList from "./CartList";
import { useRouter } from "next/navigation";
import { totalCartCount, totalCartPrice } from "@/recoil/cart/selector";

const CartModal = () => {
  const router = useRouter();
  const [isOpenCart, setIsOpenCart] = useRecoilState(isOpenCartState);
  const cartData = useRecoilValue(cartState);

  const totalPrice = useRecoilValue(totalCartPrice);
  const totalCount = useRecoilValue(totalCartCount);

  const moveTo = () => {
    if (!cartData.length) {
      alert("선택한 상품이 없습니다.");
      return;
    }
    router.push("/menu/order");
  };

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
        <span className="font-[Pretendard] text-2xl font-semibold text-center mr-2">
          {totalCount}개 {totalPrice.toLocaleString()}원
        </span>
          <button
            onClick={() => {
              setIsOpenCart(false);
              moveTo();
            }}
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
