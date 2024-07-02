"use client";
import CartList from "@/components/page/cart/CartList";
import { totalCartPrice } from "@/recoil/cart/selector";
import { userState } from "@/recoil/user/atoms";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ClipLoader } from "react-spinners";
import { postOrder } from "@/api/firebase/index";
import { cartState } from "@/recoil/cart/atoms";
import OrderModal from "@/components/page/order/OrderModal";

interface cartDto {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
  isShot: boolean;
  isWhip: boolean;
  isSyrup: boolean;
  isMilk: boolean;
  isPeorl: boolean;
  isHot: boolean;
  cartId: number;
}

interface orderDto {
  orderId: string;
  classNum: number;
  mmId: string;
  user: string;
  createdAt?: Date;
  menus: cartDto[];
  totalPrice : number;
}

const Page = () => {
  const router = useRouter();
  const totalPrice = useRecoilValue(totalCartPrice);
  const { name, mmId, classNum } = useRecoilValue(userState);
  const cartItems = useRecoilValue(cartState);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isOpenPayModal, setIsOpenPayModal] = useState(false);

  const onClickHandler = () => {
    window.open(`${process.env.NEXT_PUBLIC_KAKAOPAY_LINK}`);
    setIsLoading(true);
    setTimeout(() => {
      setIsOrdered(true);
      setIsLoading(false);
    }, 5000);
  };

  const successPayment = () => {
    setIsOpenPayModal(true);
    // const order: orderDto = {
    //   orderId: uuidv4(),
    //   totalPrice,
    //   user: name,
    //   mmId,
    //   classNum,
    //   menus: cartItems,
    // };
    // postOrder(order);
    // router.push("/list");
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
          onClick={successPayment}
        >
          송금하기
        </button>
        <span
          className='font-[Pretendard] text-sm text-gray-400'
        >
          송금에 실패할 경우 하단 버튼을 클릭해 MM 메시지 보내주세요.
        </span>
      </div>
      <OrderModal isOpenPayModal={isOpenPayModal} setIsOpenPayModal={setIsOpenPayModal}/>
      
    </div>
  );
};

export default Page;
