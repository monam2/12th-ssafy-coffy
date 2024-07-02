import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { Button } from "./button";

interface CustomAlertDialogProps {
  classNumber: number;
  name: string;
  mmId: string;
  value: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CustomAlertDialog({
  classNumber,
  name,
  mmId,
  value,
  onClickHandler,
}: CustomAlertDialogProps) {
  const [open, setOpen] = React.useState(false);

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

  const checkIsValid = () => {
    if (!isValidKoreanName() || !isValidMmId()) {
      window.alert("입력을 다시 확인해주세요!");
      return;
    }

    setOpen(true); // 검증 통과 시 다이얼로그 열기
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button className="w-[220px] h-full" onClick={checkIsValid}>
          {value}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogOverlay
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setOpen(false)}
      />
      <AlertDialogContent
        className="fixed top-1/2 left-1/2 w-[400px] p-6 bg-white dark:bg-gray-500 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog when clicking inside the content
      >
        <AlertDialogTitle className="text-lg font-bold dark:text-white">
          {classNumber}반 {name}님이 맞으신가요?
        </AlertDialogTitle>
        <AlertDialogDescription className="mt-2 text-base dark:text-white">
          주문 오류 방지를 위해 다시 한 번 확인해주세요!
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 gap-4">
          <button
            className="Button bg-red-200 py-2 px-3 rounded"
            onClick={() => setOpen(false)}
          >
            취소
          </button>
          <button
            className="Button mr-2 bg-blue-300 py-2 px-3 rounded"
            onClick={onClickHandler}
          >
            확인
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
