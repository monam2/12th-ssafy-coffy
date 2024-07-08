"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "@/recoil/cart/atoms";
import { totalCartCount } from "@/recoil/cart/selector";

interface menuDto {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

const MenuItem = ({
  item,
  getAddToast,
  getDeleteToast,
}: {
  item: menuDto;
  getAddToast: () => void;
  getDeleteToast: () => void;
}) => {
  const [cartMenus, setCartMenus] = useRecoilState(cartState);
  const cartCount = useRecoilValue(totalCartCount);

  const [isShot, setIsShot] = useState(false);
  const [isWhip, setIsWhip] = useState(false);
  const [isSyrup, setIsSyrup] = useState(false);
  const [isMilk, setIsMilk] = useState(false);
  const [isPeorl, setIsPeorl] = useState(false);

  const coffeePrice = useMemo(() => {
    const price =
      item.price +
      (isShot ? 500 : 0) +
      (isWhip ? 500 : 0) +
      (isSyrup ? 0 : 0) +
      (isMilk ? 500 : 0) +
      (isPeorl ? 700 : 0);
    return price;
  }, [isShot, isWhip, isSyrup, isMilk, isPeorl]);

  const resetOptions = ()=> {
    setIsShot(false);
    setIsWhip(false);
    setIsSyrup(false);
    setIsMilk(false);
    setIsPeorl(false);
  }

  return (
    <Card className="w-[300px] m-auto px-4 dark:bg-gray-400 dark:border-none">
      <CardHeader className="items-center m-auto p-2 pt-6">
        <div className="relative w-[180px] h-[250px]">
          <Image
            className="rounded-2xl object-cover"
            src={item.img}
            layout="fill"
            alt={item.menu}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-center">
        <CardTitle className="dark:text-white flex justify-around">
          <span className="text-xl dark:text-white">{item.menu}</span>
          <span className="text-xl dark:text-white">
            {coffeePrice.toLocaleString()}원
          </span>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 items-stretch">
        <div className="flex justify-between">
          <button
            onClick={() => (isShot ? setIsShot(false) : setIsShot(true))}
            className={`rounded-xl text-xs text-white ${
              isShot ? "bg-green-300" : "bg-slate-300"
            } px-2 py-1`}
          >
            샷
          </button>
          <button
            onClick={() => (isWhip ? setIsWhip(false) : setIsWhip(true))}
            className={`rounded-xl text-xs text-white ${
              isWhip ? "bg-green-300" : "bg-slate-300"
            } px-2 py-1`}
          >
            휘핑
          </button>
          <button
            onClick={() => (isSyrup ? setIsSyrup(false) : setIsSyrup(true))}
            className={`rounded-xl text-xs text-white ${
              isSyrup ? "bg-green-300" : "bg-slate-300"
            } px-2 py-1`}
          >
            시럽
          </button>
          <button
            onClick={() => (isMilk ? setIsMilk(false) : setIsMilk(true))}
            className={`rounded-xl text-xs text-white ${
              isMilk ? "bg-green-300" : "bg-slate-300"
            } px-2 py-1`}
          >
            우유
          </button>
          <button
            onClick={() => (isPeorl ? setIsPeorl(false) : setIsPeorl(true))}
            className={`rounded-xl text-xs text-white ${
              isPeorl ? "bg-green-300" : "bg-slate-300"
            } px-2 py-1`}
          >
            펄
          </button>
        </div>
        <div className="flex justify-between">
          <Button
            disabled={item.onlyIce}
            className="bg-red-400 dark:bg-red-400 text-white dark:text-white"
            onClick={() => {
              getAddToast();
              setCartMenus([...cartMenus, { ...item, price : coffeePrice, isShot, isWhip, isSyrup, isMilk, isPeorl, cartId : cartCount, isHot : true,}]);
              resetOptions();
            }}
          >
            핫
          </Button>
          <Button
            className="bg-blue-400 dark:bg-blue-400 text-white dark:text-white"
            onClick={() => {
              getAddToast();
              setCartMenus([...cartMenus, { ...item, price : coffeePrice, isShot, isWhip, isSyrup, isMilk, isPeorl, cartId : cartCount, isHot : false,}]);
              resetOptions();
            }}
          >
            아이스
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
