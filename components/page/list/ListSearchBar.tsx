import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface userDto {
  name: string;
  mmId: string;
  classNum: number;
}

const ListSearchBar = ({
  user,
  setName,
  setMmId
}: {
  user: userDto;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setMmId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { name, mmId, classNum } = user;
  const [inputName, setInputName] = useState("");
  const [inputMmId, setInputMmId] = useState("");

  const handleInputChange = () => {
    setName(inputName);
    setMmId(inputMmId);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Input
        className="w-full text-center"
        value={inputName || ""}
        placeholder="이름을 입력하세요"
        onChange={(e)=>setInputName(e.target.value)}
      />
      <Input
        className="w-full text-center"
        value={inputMmId || ""}
        placeholder="MM ID (@제외)"
        onChange={(e)=>setInputMmId(e.target.value)}
      />
      <Button 
      onClick={()=>handleInputChange()}
      className="bg-blue-300 hover:bg-blue-600 dark:bg-bg-blue-300 w-full h-6 font-[Pretendard] tracking-widest">검색</Button>
    </div>
  );
};

export default ListSearchBar;
