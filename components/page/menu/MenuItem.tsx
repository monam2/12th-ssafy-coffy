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

interface menuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

const MenuItem = ({ item, getAddToast, getDeleteToast }: { item: menuObject, getAddToast:()=>{}, getDeleteToast:()=>{} }) => {
  return (
    <Card className="w-[300px] h-[430px] m-auto px-4">
      <CardHeader className="items-center m-auto p-2 pt-6">
        <Image
          className="rounded-2xl"
          src={item.img}
          width={180}
          height={250}
          alt={item.menu}
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <CardTitle>{item.menu}</CardTitle>
        <CardDescription className="text-xl">
          {item.price.toLocaleString()}원
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={getDeleteToast}>빼기</Button>
        <Button onClick={getAddToast}>담기</Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
