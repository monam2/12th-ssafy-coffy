import { atom } from "recoil";

interface cartDto {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
  isShot: boolean;
  isWhip: boolean;
  isSyrup: boolean;
  isMilk: boolean;
  isPeorl: boolean;
  isHot : boolean;
  cartId : number;
}

export const cartState = atom<cartDto[]>({
  key: "cartState",
  default: [],
});

export const isOpenCartState = atom<boolean>({
  key: "isOpenCartState",
  default: false,
});
