"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { LuClipboardList } from "react-icons/lu";

const OrderButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const onClickHandler = () => {
    if (
      pathname === "/menu" &&
      window.confirm("장바구니가 초기화됩니다. 이동하시겠습니까?")
    ) {
      router.push("/list");
      return;
    }
    router.push("/list");
  };
  return (
    <Button
      onClick={() => onClickHandler()}
      variant="outline"
      className="w-10 h-10 p-2"
    >
      <LuClipboardList className="w-full h-full" />
    </Button>
  );
};

export default OrderButton;
