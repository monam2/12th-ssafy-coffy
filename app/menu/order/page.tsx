"use client";
import CartList from "@/components/page/cart/CartList";
import { totalCartPrice } from "@/recoil/cart/selector";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";

const Page = () => {
  const totalPrice = useRecoilValue(totalCartPrice);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <div className="bg-slate-100 dark:bg-slate-500 rounded-lg px-3 py-5 shadow-lg">
        <CartList />
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
        <span className="font-[Pretendard] text-2xl font-semibold text-center">총 {totalPrice.toLocaleString()}원</span>
        <Image src="/img/pay_btn_regular.png" alt="pay" width={200} height={50} className="cursor-pointer"/>
      </div>
    </div>
  );
};

export default Page;
