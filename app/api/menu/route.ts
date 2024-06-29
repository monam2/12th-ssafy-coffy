import { NextResponse } from "next/server"
import menu from "../../../data/menu.json"

export async function GET(req: Request) {
    const menuList = menu.data;
    const response = NextResponse.json(menuList);
  response.headers.set('Content-Type', 'application/json; charset=utf-8');

  return response;
  }