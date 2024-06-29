"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllMenu, getMenuByCategory } from "@/api/apis";
import categoryData from "@/data/category.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MenuBar from "./MenuBar";
import MenuItem from "./MenuItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface menuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

interface categoryObject {
  id: number;
  value: string;
  name: string;
}

const Menu = () => {
  const getAddToast = () => toast("카트에 담았습니다.");
  const getDeleteToast = () => toast("카트에서 제거했습니다.");
  const [menuList, setMenuList] = useState<menuObject[]>([]);
  const [categoryList, setCategoryList] = useState<categoryObject[]>(
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

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList, selectedCategory]);

  if (!menuList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-12 mb-16">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-10">
        {menuList.map((menuItem) => {
          return <MenuItem item={menuItem} key={menuItem.id} getAddToast={getAddToast} getDeleteToast={getDeleteToast}/>;
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Menu;
