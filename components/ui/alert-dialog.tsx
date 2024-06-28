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
  value: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CustomAlertDialog({
  classNumber,
  name,
  value,
  onClickHandler,
}: CustomAlertDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-[220px] h-full">{value}</Button>
      </AlertDialogTrigger>
      <AlertDialogOverlay
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setOpen(false)}
      />
      <AlertDialogContent
        className="fixed top-1/2 left-1/2 w-[400px] p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog when clicking inside the content
      >
        <AlertDialogTitle className="text-lg font-bold">
          {classNumber}반 {name}님이 맞으신가요?
        </AlertDialogTitle>
        <AlertDialogDescription className="mt-2 text-base">
          주문 오류 방지를 위해 다시 한번 확인해주세요!
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 gap-4">
          <button className="Button bg-red-200 py-2 px-3 rounded" onClick={() => setOpen(false)}>
            취소
          </button>
          <button className="Button mr-2 bg-blue-300 py-2 px-3 rounded" onClick={onClickHandler}>
            확인
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
