import React from "react";
import MenuItem from "./MenuItem";

interface menuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

interface propsObject {
  menuList: menuObject[];
  getAddToast: () => {};
  getDeleteToast: () => {};
}

const MenuList = ({ menuList, getAddToast, getDeleteToast }: propsObject) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-10">
      {menuList.map((menuItem) => {
        return (
          <MenuItem
            item={menuItem}
            key={menuItem.id}
            getAddToast={getAddToast}
            getDeleteToast={getDeleteToast}
          />
        );
      })}
    </div>
  );
};

export default MenuList;
