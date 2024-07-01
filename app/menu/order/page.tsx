"use client";
import CartList from "@/components/page/cart/CartList";
import { totalCartPrice } from "@/recoil/cart/selector";
import { userState } from "@/recoil/user/atoms";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const totalPrice = useRecoilValue(totalCartPrice);
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const onClickHandler = () => {
    window.open(`${process.env.NEXT_PUBLIC_KAKAOPAY_LINK}`);
    setIsLoading(true);
    setTimeout(() => {
      setIsOrdered(true);
      setIsLoading(false);
    }, 5000);
  };

  const moveTo = () => {
    router.push("check");
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <ClipLoader size={120} color="#8a8a8a" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <div
        className={`${
          !isOrdered ? "" : "hidden"
        } bg-slate-100 dark:bg-slate-500 rounded-lg px-3 py-5 shadow-lg`}
      >
        <CartList />
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
        <span className="font-[Pretendard] text-2xl font-semibold text-center">
          {user.classNum}반 {user.name}님의 주문내역
        </span>
        <span className="font-[Pretendard] text-2xl font-semibold text-center">
          총 {totalPrice.toLocaleString()}원
        </span>
        <Image
          src="/img/pay_btn_regular.png"
          alt="pay"
          width={200}
          height={50}
          className={`${!isOrdered ? "" : "hidden"} cursor-pointer`}
          onClick={onClickHandler}
        />

        <button
          className={`${
            !isOrdered ? "hidden" : ""
          } w-[200px] font-[Pretendard] h-[50px] text-lg rounded-3xl bg-blue-400 text-white`}
          onClick={moveTo}
        >
          송금 완료!
        </button>
        <button
          className={`${
            !isOrdered ? "hidden" : ""
          } w-[200px] font-[Pretendard] h-[50px] text-lg rounded-3xl bg-red-300 text-white`}
          onClick={() => setIsOrdered(false)}
        >
          송금에 실패했어요
        </button>
        <span className={`font-[Pretendard] mt-5 text-md text-gray-400`}>
          송금 후 반드시 [송금완료] 버튼을 눌러야 주문 목록에 반영됩니다.
        </span>
        <span
          className={`${
            !isOrdered ? "hidden" : ""
          } font-[Pretendard] text-sm text-gray-400`}
        >
          송금이 계속 실패할 경우 하단 버튼을 클릭해 MM 메시지 보내주세요.
        </span>
      </div>
    </div>
  );
};

export default Page;
