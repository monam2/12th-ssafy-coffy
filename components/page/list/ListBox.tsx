"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getOrdersByDate, postOrder } from "@/api/firebase/index";

interface userDto {
  name: string;
  mmId: string;
  classNum: number;
}

interface orderDto {
  orderId: string;
  classNum: number;
  mmId: string;
  user: string;
  createdAt?: Date;
  menus: any[];
  totalPrice: number;
}

interface cartDto {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
  isShot: boolean;
  isWhip: boolean;
  isSyrup: boolean;
  isMilk: boolean;
  isPeorl: boolean;
  isHot: boolean;
  cartId: number;
}

const ListBox = ({ user }: { user: userDto }) => {
  const { name, mmId, classNum } = user;
  const [todayOrders, setTodayOrders] = useState<orderDto[]>([]);

  const handleGetOrders = useCallback(async () => {
    const orders = await getOrdersByDate(new Date());
    return orders;
  }, [name, mmId, classNum]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await handleGetOrders();
      const filteredAndSortedOrders = orders
        .filter(order => (order.mmId === mmId && order.user === name))
        .sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          }
          return 0;
        });
      setTodayOrders(filteredAndSortedOrders);
    };
    fetchOrders();
  }, [handleGetOrders, mmId]);

  return (
    <div className="w-full flex flex-col gap-3">
      {todayOrders.map((order, idx) => {
        return (
          <div key={order.orderId} className="flex flex-col gap-1">
            <div className="flex flex-row justify-between px-12">
              <div className="flex w-150px gap-3 justify-between">
                <span className="font-[Pretendard] text-lg font-semibold">
                  {idx + 1}.
                </span>
                <span className="font-[Pretendard] text-lg font-semibold">
                  {order.user}
                </span>
              </div>
              <span className="font-[Pretendard] text-lg font-semibold">
                {order.totalPrice.toLocaleString()}원
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {order.menus.map((item) => {
                return (
                  <div key={item.id} className="flex gap-3 justify-start px-20">
                    {item.isHot ? (
                      <span className="text-center font-semibold font-[Pretendard] text-red-400 dark:text-red-500">
                        핫
                      </span>
                    ) : (
                      <span className="text-center font-semibold font-[Pretendard] text-blue-400 dark:text-blue-300">
                        아이스
                      </span>
                    )}
                    <span className="font-[Pretendard] text-md font-semibold text-center">
                      {item.menu}
                    </span>
                    {item.isShot ? (
                      <span className="font-[Pretendard] text-sm font-semibold text-gray-400 ">
                        샷
                      </span>
                    ) : null}
                    {item.isWhip ? (
                      <span className="font-[Pretendard] text-sm font-semibold text-gray-400 ">
                        휘핑
                      </span>
                    ) : null}
                    {item.isSyrup ? (
                      <span className="font-[Pretendard] text-sm font-semibold text-gray-400 ">
                        시럽
                      </span>
                    ) : null}
                    {item.isMilk ? (
                      <span className="font-[Pretendard] text-sm font-semibold text-gray-400">
                        우유
                      </span>
                    ) : null}
                    {item.isPeorl ? (
                      <span className="font-[Pretendard] text-sm font-semibold text-gray-400">
                        펄
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListBox;
