"use client";
import CartList from "@/components/page/cart/CartList";
import { totalCartPrice } from "@/recoil/cart/selector";
import { userState } from "@/recoil/user/atoms";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import OrderModal from "@/components/page/order/OrderModal";

const Page = () => {
  const totalPrice = useRecoilValue(totalCartPrice);
  const { name, mmId, classNum } = useRecoilValue(userState);
  
  
  const [isOpenPayModal, setIsOpenPayModal] = useState(false);  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <div
        className='bg-slate-100 dark:bg-slate-500 rounded-lg px-3 py-5 shadow-lg'
      >
        <CartList />
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
        <span className="font-[Pretendard] text-2xl font-semibold text-center">
          {classNum}반 {name}님의 주문내역
        </span>
        <span className="font-[Pretendard] text-2xl font-semibold text-center">
          총 {totalPrice.toLocaleString()}원
        </span>
        <button
          className='w-[200px] font-[Pretendard] h-[50px] text-lg rounded-3xl bg-blue-400 text-white'
          onClick={()=>setIsOpenPayModal(true)}
        >
          송금하기
        </button>
        <span
          className='mt-5 font-[Pretendard] text-base text-center text-gray-400'
        >
          잔액 부족 등으로 송금에 실패했다면<br/> 하단 버튼으로 MM 메세지 보내주세요.
        </span>
      </div>
      <OrderModal isOpenPayModal={isOpenPayModal} setIsOpenPayModal={setIsOpenPayModal}/>
      
    </div>
  );
};

export default Page;
