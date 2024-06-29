"use client";
import React, { useEffect, useRef, useState } from "react";
import { getAllMenu, getMenuByCategory } from "@/api/apis";
import categoryData from "@/data/category.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MenuBar from "./MenuBar";

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
  name:string;
}

const Menu = () => {
  const [menuList, setMenuList] = useState<menuObject[]>([]);
  const [categoryList, setCategoryList] = useState<categoryObject[]>(categoryData.data);
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

  const fetchMenuList = async () => {
    if (selectedCategory==="all") {
        setMenuList(await getAllMenu());
    } else {
        setMenuList(await getMenuByCategory(selectedCategory))
    }
    
  };

  useEffect(() => {
    fetchMenuList();
  }, [selectedCategory]);

  if (!menuList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-20">
      <div className="h-full flex justify-between gap3 items-center bg-slate-300 dark:bg-slate-500">
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
      <div className="overflow-y-auto">
        {menuList.map((menuItem) => {
          return <div key={menuItem.id}>{menuItem.menu}</div>;
        })}
      </div>
    </div>
  );
};

export default Menu;
