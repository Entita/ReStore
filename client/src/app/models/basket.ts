import { BasketProduct } from "./product";

export interface Basket {
  products: BasketProduct[],
  price: number,
}