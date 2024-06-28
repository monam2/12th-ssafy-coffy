"use client";
import { DarkModeToggle } from "../_components/dark-mode-toggle";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Combobox from "./../../components/ui/combobox";
import { useRouter } from "next/navigation";
import { CustomAlertDialog } from "@/components/ui/alert-dialog";
import React from "react";

export default function Home() {
  const [name, setName] = React.useState("");
  const [classNumber, setClassNumber] = React.useState(1);
  const [mmId, setMmId] = React.useState("");
  const router = useRouter();

  const isValidKoreanName = () => {
    const nameLengthRegex = /^[가-힣]{2,5}$/;
    const validKoreanNameRegex = /^[가-힣]+$/;

    if (!name || name === "" || name === null) {
      return false;
    }

    if (!nameLengthRegex.test(name)) {
      return false;
    }

    if (!validKoreanNameRegex.test(name)) {
      return false;
    }

    return true;
  };

  const isValidMmId = () => {
    // '@'가 포함되어 있는지 검사
    if (mmId.includes("@")) {
      return false;
    }
    return true;
  };

  const onClickHandler = () => {
    router.push("/menu");
  };

  return (
    <div className="flex flex-col justify-center gap-10 items-center h-full">
      <Image src="/img/logo/logo.png" alt="logo" width={220} height={500}></Image>
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
        <span className="text-sm text-center text-gray-500 mb-5">(MM프로필 클릭시 보이는 @ID)</span>
        <Combobox setClassNumber={setClassNumber} />
        <div className="w-[220px] h-12 --text-color text-lg">
          <CustomAlertDialog
            onClickHandler={onClickHandler}
            classNumber={classNumber}
            name={name}
            value={"메뉴 보러가기"}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <DarkModeToggle />
      </div>
    </div>
  );
}