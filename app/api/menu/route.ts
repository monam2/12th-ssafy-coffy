import { NextResponse } from "next/server"
import menu from "../../../data/menu.json"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const menuList = menu.data;
    return NextResponse.json(menuList)
  }