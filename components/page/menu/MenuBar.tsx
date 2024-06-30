"use client"
import React, { forwardRef } from "react";

interface categoryDto {
  id: number;
  value: string;
  name:string
}

interface MenuBarProps {
  selectedCategory: string;
  category: categoryDto[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(
  ({ selectedCategory, category, setSelectedCategory }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full px-3 md:justify-center justify-start flex gap-5 overflow-x-scroll whitespace-nowrap"
        style={{ scrollbarWidth: "none" }}
      >
        {category.map((item) => (
          <div
            onClick={() => {
              setSelectedCategory(item.value);
            }}
            className={`p-2 cursor-pointer text-center font-semibold text-lg font-[Pretendard] ${
              selectedCategory === item.value
                ? "bg-sky-300 rounded-2xl dark:bg-sky-500"
                : "bg-none"
            }`}
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  }
);

MenuBar.displayName = "MenuBar";

export default MenuBar;
