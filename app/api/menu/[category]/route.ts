import { NextResponse } from "next/server";
import menuData from "../../../../data/menu.json";

interface MenuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;
  const menuList: MenuObject[] = menuData.data as MenuObject[];

  const menus = menuList.filter(item => item.category === category);

  const response = NextResponse.json(menus);
  response.headers.set("Content-Type", "application/json; charset=utf-8");

  return response;
}
