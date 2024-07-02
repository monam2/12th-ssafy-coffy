"use client";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const LogoBox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const onClickLogo = () => {
    if (pathname !== "/") {
        if (window.confirm("메인으로 이동시 주문자 정보와 카트 내역이 초기화됩니다.")) {
          router.push("/");
        } else {
          return;
        }
      }
  };

  return (
    <div className="flex justify-center gap-2 cursor-pointer " onClick={onClickLogo}>
      <Image
        className="p-1"
        src="/img/logo/logo-sm.png"
        width={55}
        height={40}
        alt="logo"
      />
      <span className="text-2xl font-[Moyamoya] text-center my-auto">
        싸피코피
      </span>
    </div>
  );
};

export default LogoBox;
