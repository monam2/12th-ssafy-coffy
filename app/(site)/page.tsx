"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Combobox from "./../../components/ui/combobox";
import { useRouter } from "next/navigation";
import { CustomAlertDialog } from "@/components/ui/alert-dialog";
import React, { useEffect } from "react";
import { setUserData } from "@/lib/checkUser";

export default function Home() {
  const [name, setName] = React.useState("");
  const [classNumber, setClassNumber] = React.useState(1);
  const [mmId, setMmId] = React.useState("");
  const router = useRouter();

  const onClickHandler = () => {
    setUserData(name, mmId, classNumber);
    router.push("/menu");
  };

  useEffect(()=>{
    window.sessionStorage.clear();
  },[])

  return (
    <div className="flex flex-col justify-center gap-10 items-center h-full">
      <Image
        src="/img/logo/logo.png"
        alt="logo"
        width={220}
        height={500}
      ></Image>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="주문자 명을 입력하세요."
          className="w-[220px] --point-color text-base font-medium text-center"
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          placeholder="MM ID 입력 (@ 제외)"
          className="w-[220px] --point-color text-base font-medium text-center"
          onChange={(event) => setMmId(event.target.value)}
        />
        <span className="text-sm text-center text-gray-500 mb-5">
          (MM프로필 클릭시 보이는 @ID)
        </span>
        <Combobox setClassNumber={setClassNumber} />
        <div className="w-[220px] h-12 --text-color text-lg">
          <CustomAlertDialog
            onClickHandler={onClickHandler}
            classNumber={classNumber}
            name={name}
            mmId={mmId}
            value={"메뉴 보러가기"}
          />
        </div>
      </div>
    </div>
  );
}
