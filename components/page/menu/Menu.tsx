"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllMenu, getMenuByCategory } from "@/api/apis";
import categoryData from "@/data/category.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MenuBar from "./MenuBar";
import MenuList from "./MenuList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface menuDto {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

interface categoryDto {
  id: number;
  value: string;
  name: string;
}

interface MenuProps {
  scrollToTop: () => void;
}

const Menu: React.FC<MenuProps> = ({ scrollToTop }) => {
  const [menuList, setMenuList] = useState<menuDto[]>([]);
  const [categoryList, setCategoryList] = useState<categoryDto[]>(
    categoryData.data
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const menuBarRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (menuBarRef.current) {
      menuBarRef.current.scrollBy({
        left: -180,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (menuBarRef.current) {
      menuBarRef.current.scrollBy({
        left: 180,
        behavior: "smooth",
      });
    }
  };

  const fetchMenuList = useCallback(async () => {
    if (selectedCategory === "all") {
      setMenuList(await getAllMenu());
    } else {
      setMenuList(await getMenuByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  const getAddToast = () => {
    toast("카트에 담았습니다.");
  };
  const getDeleteToast = () => {
    toast("카트에서 제거했습니다.");
  };

  useEffect(() => {
    fetchMenuList();
  }, [selectedCategory]);

  if (!menuList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 mb-16 bg-white dark:bg-neutral-800">
      <div className="h-20 flex justify-between gap3 items-center bg-slate-300 dark:bg-slate-500">
        <IoIosArrowBack
          onClick={scrollLeft}
          className="h-10 w-10 md:hidden text-white dark:text-gray-300 cursor-pointer"
        />
        <MenuBar
          ref={menuBarRef}
          setSelectedCategory={setSelectedCategory}
          category={categoryList}
          selectedCategory={selectedCategory}
        />
        <IoIosArrowForward
          onClick={scrollRight}
          className="h-10 w-10 md:hidden text-white dark:text-gray-300 cursor-pointer"
        />
      </div>
      <div className="sticky text-center top-[-3px] h-10 z-50 bg-white dark:bg-neutral-800">
        <span className="mb-3 mt-2 font-[Pretendard] text-md font-semibold text-gray-400 flex justify-center">
          옵션을 선택하고 핫/아이스 버튼을 클릭하세요.
        </span>
      </div>
      <div>
        <MenuList
          menuList={menuList}
          getAddToast={getAddToast}
          getDeleteToast={getDeleteToast}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Menu;
