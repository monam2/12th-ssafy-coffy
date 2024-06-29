import { NextRequest, NextResponse } from "next/server";
import menuData from "../../../../data/menu.json";

interface MenuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

export async function GET(req: NextRequest,  { params }: { params: { id: string } }) {
  const id = params.id;
  const menuList: MenuObject[] = menuData.data as MenuObject[];
  console.log(params);

  if (!id) {
    const response = NextResponse.json({ error: "잘못된 ID입니다." }, { status: 400 });
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }

  const menu = menuList.find((item) => item.id === parseInt(id));

  if (!menu) {
    const response = NextResponse.json(
      { error: "메뉴를 찾을 수 없습니다." },
      { status: 404 }
    );
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }

  const response = NextResponse.json(menu);
  response.headers.set('Content-Type', 'application/json; charset=utf-8');
  return response;
}
