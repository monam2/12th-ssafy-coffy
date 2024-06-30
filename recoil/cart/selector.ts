import { selector } from "recoil";
import { cartState } from "./atoms";

export const totalCartPrice = selector<number>({
  key: "totalCartPrice",
  get: ({ get }) => {
    const cartMenus = get(cartState);
    return cartMenus.reduce((total, cartItem) => total + cartItem.price, 0);
  },
});

export const totalCartCount = selector<number>({
  key: "totalCartCount",
  get: ({ get }) => {
    const cartMenus = get(cartState);
    return cartMenus.length;
  },
});