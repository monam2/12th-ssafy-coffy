import {atom} from "recoil"

interface menuObject {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
}

export const cartState = atom<menuObject[]>({
    key : "cartState",
    default : [],
})

export const isOpenCartState = atom<boolean>({
    key : "isOpenCartState",
    default : false,
})