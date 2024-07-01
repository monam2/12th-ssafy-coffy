"use client"
import React, { useCallback, useEffect, useState } from 'react';
import {getOrdersByDate, postOrder} from '@/api/firebase/index'

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
      setTodayOrders(orders);
    };
    fetchOrders();
  }, [handleGetOrders]);

  return (
    <div>
      <h2>Order List</h2>
      {todayOrders.map(order=>{
        return <div key={order.orderId}>{order.totalPrice} {order.user}</div>
      })}
    </div>
  );
}

export default ListBox;
