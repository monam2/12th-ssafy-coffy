"use client";
import React, { useEffect, useState } from "react";
import ListBox from "./ListBox";
import ListHeader from "./ListHeader";
import { checkUser } from "@/lib/checkUser";

const List = () => {
  const [name, setName] = useState("");
  const [mmId, setMmId] = useState("");
  const [classNum, setClassNum] = useState(0);

  const decryptUserData = () => {
    const decryptedUser: {
      decryptedName: string;
      decryptedMmid: string;
      decryptedClassNum: string;
    } | null = checkUser();

    if (decryptedUser) {
      const { decryptedName, decryptedMmid, decryptedClassNum } = decryptedUser;

      setName(decryptedName);
      setMmId(decryptedMmid);
      setClassNum(+decryptedClassNum);
    }
  };

  useEffect(() => {
    decryptUserData();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-between py-6 items-center w-96 md:w-[700px] min-h-96 max-h-4/5 bg-gray-100 dark:bg-gray-500 rounded-2xl">
      <ListHeader setName={setName} setMmId={setMmId} user={{ name, mmId, classNum }} />
      {!name ? "" : <ListBox user={{ name, mmId, classNum }} />}
      <span className="font-[Pretendard] text-sm text-gray-400">
        당일 본인 주문 내역만 확인 가능합니다.
      </span>
    </div>
  );
};

export default List;
