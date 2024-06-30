"use client";
import React from "react";
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
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/cart/atoms";

interface menuObject {
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
  item: menuObject;
  getAddToast: () => void;
  getDeleteToast: () => void;
}) => {
  const [cartMenus, setCartMenus] = useRecoilState(cartState);
  const removeItemFromCart = (id: number) => {
    const index = cartMenus.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      const newCartMenus = [...cartMenus];
      newCartMenus.splice(index, 1);
      setCartMenus(newCartMenus);
    }
  };

  return (
    <Card className="w-[300px] h-[430px] m-auto px-4 dark:bg-gray-400 dark:border-none">
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
        <CardTitle className="dark:text-white">{item.menu}</CardTitle>
        <CardDescription className="text-xl dark:text-white">
          {item.price.toLocaleString()}원
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            getDeleteToast();
            removeItemFromCart(item.id);
          }}
        >
          빼기
        </Button>
        <Button
          onClick={() => {
            getAddToast();
            setCartMenus([...cartMenus, item]);
          }}
        >
          담기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
