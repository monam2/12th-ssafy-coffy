import { selector } from "recoil";
import { cartState } from "./atoms";

interface menuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

interface cartObject {
    item : menuObject;
    count : number;
}

export const countedCartMenuList = selector<cartObject[]>({
    key: "countedCartMenus",
    get: ({ get }) => {
      const cartMenus = get(cartState);
      const countedList: cartObject[] = [];
  
      const menuCountMap = cartMenus.reduce((acc, menu) => {
        const existingItem = acc.get(menu.id);
        if (existingItem) {
          existingItem.count += 1;
        } else {
          acc.set(menu.id, { item: menu, count: 1 });
        }
        return acc;
      }, new Map<number, cartObject>());
  
      menuCountMap.forEach((value) => {
        countedList.push(value);
      });
  
      return countedList;
    },
  });
