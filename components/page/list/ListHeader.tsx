import React from "react";
import ListSearchBar from "./ListSearchBar";

interface userDto {
  name: string;
  mmId: string;
  classNum: number;
}

const ListHeader = ({ user, setName, setMmId }: { user: userDto, setName: React.Dispatch<React.SetStateAction<string>>, setMmId: React.Dispatch<React.SetStateAction<string>> }) => {
  const { name, mmId, classNum } = user;

  if (!name) {
    return (
      <div className="flex flex-col justify-between items-center gap-3">
        <span className="font-[Pretendard] text-2xl font-semibold text-center">주문 내역 검색</span>
        <ListSearchBar setName={setName} setMmId={setMmId} user={{ name, mmId, classNum }} />
      </div>
    );
  }

  return (
    <div>
      <span className="font-[Pretendard] text-2xl font-semibold text-center">
        {name}({mmId})님의 주문 내역
      </span>
    </div>
  );
};

export default ListHeader;
