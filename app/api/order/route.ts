import { NextResponse } from "next/server"
import { getOrdersByDate } from "@/api/firebase";


export async function GET(req: Request) {
    const orderList = await getOrdersByDate(new Date());
    const response = NextResponse.json(orderList);
  response.headers.set('Content-Type', 'application/json; charset=utf-8');

  return response;
  }