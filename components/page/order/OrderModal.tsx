"use client";
import { v4 as uuidv4 } from "uuid";
import { postOrder } from "@/api/firebase";
import { cartState } from "@/recoil/cart/atoms";
import { totalCartPrice } from "@/recoil/cart/selector";
import { userState } from "@/recoil/user/atoms";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { checkUser } from "@/lib/checkUser";

interface OrderModalProps {
  setIsOpenPayModal: Dispatch<SetStateAction<boolean>>;
  isOpenPayModal: boolean;
}

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
  totalPrice: number;
}

const OrderModal: React.FC<OrderModalProps> = ({
  setIsOpenPayModal,
  isOpenPayModal,
}) => {
  const router = useRouter();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const cartItems = useRecoilValue(cartState);
  const [name, setName] = useState("");
  const [mmId, setMmId] = useState("");
  const [classNum, setClassNum] = useState(1);
  const totalPrice = useRecoilValue(totalCartPrice);

  const makeOrderToDB = () => {
    const order: orderDto = {
      orderId: uuidv4(),
      totalPrice,
      user: name,
      mmId,
      classNum,
      menus: cartItems,
    };
    postOrder(order);
  };

  const pushListHandler = () => {
    setIsOpenPayModal(false);
    router.push("/list");
  };

  const pushAcountHandler = () => {
    makeOrderToDB();
    setIsOrdered(true);
  };

  const pushKaKaoHandler = () => {
    makeOrderToDB();
    window.open(`${process.env.NEXT_PUBLIC_KAKAOPAY_LINK}`);
    router.push("/list");
  };

  const decryptUserData = ()=> {
    const decryptedUser:{decryptedName:string, decryptedMmid:string, decryptedClassNum:string} | null = checkUser();

    if (decryptedUser){
      const {decryptedName,decryptedMmid,decryptedClassNum} = decryptedUser;
      setName(decryptedName);
      setMmId(decryptedMmid);
      setClassNum(+decryptedClassNum);
    }
  }

  useEffect(()=>{
    decryptUserData();
  },[])

  return (
    <div
      onClick={() => setIsOpenPayModal(false)}
      className={`${
        isOpenPayModal ? "flex" : "hidden"
      } fixed inset-0 items-center justify-center z-50 bg-black bg-opacity-50`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white dark:bg-slate-500 rounded-lg shadow-lg w-11/12 max-w-lg"
      >
        <div className="flex justify-center items-center border-b p-4 mb-4">
          <h2 className="text-2xl text-center font-semibold">송금하기</h2>
        </div>
        {isOrdered ? (
          <div className="flex flex-col gap-4  items-center justify-center">
            <span className="font-[Pretendard] dark:font-medium font-semibold text-lg">
              {process.env.NEXT_PUBLIC_BANK_ACCOUNT}{" "}
              {process.env.NEXT_PUBLIC_BANK_USER}
            </span>
            {!isCopied ? (
              <CopyToClipboard
              text={`${process.env.NEXT_PUBLIC_BANK_ACCOUNT}`}
              onCopy={() => alert("계좌번호가 복사되었습니다.")}
            >
              <button
                onClick={() => setIsCopied(true)}
                className="mb-4 bg-gray-200 dark:bg-gray-400 p-1 hover:bg-gray-300 hover:transition-all transition-all rounded-md text-center font-[Pretendard]"
              >
                복사하기
              </button>
              </CopyToClipboard>
            ) : (
              <span className="m-5 text-gray-400 text-sm text-center font-semibold">
                클립보드에 복사했습니다.
              </span>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap2 justify-center items-center mb-4">
              <span className="font-[Pretendard] dark:font-medium font-semibold text-lg">
                아래 버튼을 클릭시 주문 DB에 반영됩니다.
              </span>
              <span className="font-[Pretendard] dark:font-medium font-semibold text-lg">
                반드시 송금해주세요!
              </span>
            </div>
            <span className="font-[Pretendard] dark:text-gray-200 text-gray-500 flex justify-center items-center text-base text-center">
              송금에 실패했다면
            </span>
            <span className="font-[Pretendard] dark:text-gray-200 text-gray-500 mb-3 flex justify-center items-center text-base text-center">
              반드시 MM 보내주세요.
            </span>
            <span className="font-[Pretendard] dark:text-gray-200 text-gray-500 mb-3 flex justify-center items-center text-xl font-bold text-center">
              주문이 누락됩니다!
            </span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pb-5">
              <button
                onClick={() => pushAcountHandler()}
                className="w-[200px] font-[Pretendard] h-[50px]  font-semibold rounded-3xl bg-blue-400 text-gray-200"
              >
                <span className="mr-1">계좌 송금(주문)</span>
              </button>
              {/* <button
                onClick={() => pushKaKaoHandler()}
                className="w-[200px] font-[Pretendard] h-[50px]  font-semibold rounded-3xl bg-[#FEE500] text-gray-600"
              >
                <span className="mr-1">카카오페이</span>
                <span className="font-md">(모바일만)</span>
              </button> */}
            </div>
          </>
        )}

        {!isOrdered ? (
          <div className="flex justify-end gap-4 p-4 border-t">
            <button
              onClick={() => setIsOpenPayModal(false)}
              className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              닫기
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-4 p-4 mt-3 border-t">
            <span className="m-5 text-gray-400 font-[Pretendard] dark:text-gray-200 text-sm text-center">
              반드시 송금 후 클릭하세요!
            </span>
            <button
              onClick={() => pushListHandler()}
              className="bg-blue-400 font-[Pretendard] h-8 text-white px-2 rounded hover:bg-blue-600"
            >
              송금 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
