import CryptoJS from "crypto-js";

interface CartDto {
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
  isHot: boolean;
  cartId: number;
}

const setCartDataAtSession =(cartDatas:CartDto[])=> {
  const key = `${process.env.NEXT_PUBLIC_SECRET_KEY}`;
  const cartDataString = JSON.stringify(cartDatas);
  const encryptedCartData = CryptoJS.AES.encrypt(cartDataString, key).toString();
  window.sessionStorage.setItem('cart', encryptedCartData);
}

const getCartDataAtSession = (): CartDto[] | null => {
  const key = `${process.env.NEXT_PUBLIC_SECRET_KEY}`;
  const tempCart = window.sessionStorage.getItem("cart");

  if (tempCart) {
    const decryptedCart = CryptoJS.AES.decrypt(tempCart, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedCart) as CartDto[];
  } else {
    return null;
  }
};




export {getCartDataAtSession, setCartDataAtSession}