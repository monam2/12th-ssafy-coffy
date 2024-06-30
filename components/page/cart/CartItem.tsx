import React from 'react'

interface menuObject {
    id: number;
    category: string;
    menu: string;
    onlyIce: boolean;
    price: number;
    img: string;
  }

interface itemObject {
    item : menuObject;
    count : number;
}

const CartItem = ({item, count}:itemObject) => {
  return (
    <div>{item.menu} {count} 개</div>
  )
}

export default CartItem