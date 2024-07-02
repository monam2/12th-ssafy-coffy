import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

interface OrderModalProps {
  setIsOpenPayModal: Dispatch<SetStateAction<boolean>>;
  isOpenPayModal: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({ setIsOpenPayModal, isOpenPayModal }) => {
  return (
    <div
      onClick={() => setIsOpenPayModal(false)}
      className={`${isOpenPayModal ? "flex" : "hidden"
        } fixed inset-0 items-center justify-center z-50 bg-black bg-opacity-50`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white dark:bg-slate-500 rounded-lg shadow-lg w-11/12 max-w-lg"
      >
        <div className="flex justify-center items-center p-4">
          <h2 className="text-2xl text-center font-semibold">송금하기</h2>
        </div>
        <div className='flex flex-col gap2 justify-center items-center mb-4'>
          <span className='font-[Pretendard] font-semibold text-lg'>아래 버튼을 클릭시 주문 DB에 반영됩니다.</span>
          <span className='font-[Pretendard] font-semibold text-lg'>반드시 송금해주세요!</span>
        </div>
        <div className='flex justify-center gap-6 pb-5'>
          <button
            className='w-[200px] font-[Pretendard] h-[50px] text-md font-semibold rounded-3xl bg-blue-400 text-white'
          >
            계좌 송금
          </button>
          <Image className='cursor-pointer' src="/img/pay_btn_regular.png" alt='kakao pay' width={200} height={50} />
        </div>
        <div className="flex justify-end gap-4 p-4 border-t">
          <button
            onClick={() => setIsOpenPayModal(false)}
            className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
