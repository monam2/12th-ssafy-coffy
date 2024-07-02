import { NextResponse } from "next/server"

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_APIKEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_AUTHDOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_PROJECTID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGINGSENDERID}`,
  appId: `${process.env.NEXT_PUBLIC_APPID}`,
  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

interface orderDto {
  orderId: string;
  classNum: number;
  mmId: string;
  user: string;
  createdAt?: Date;
  menus: cartDto[];
  totalPrice : number;
}

// Firebase
const getOrdersByDate = async () => {
  const date = new Date();
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const q = query(
    collection(db, "orderList"),
    where("createdAt", ">=", startOfDay),
    where("createdAt", "<=", endOfDay),
  );

  try {
    const querySnapshot = await getDocs(q);
    const orders: orderDto[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push(data as orderDto);
    });
    return orders;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
};


export async function GET(req: Request) {
    const orderList = await getOrdersByDate();
    const response = NextResponse.json(orderList);
  response.headers.set('Content-Type', 'application/json; charset=utf-8');

  return response;
  }