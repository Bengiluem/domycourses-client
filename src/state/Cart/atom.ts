import { atom, RecoilState } from "recoil";

import { v4 } from "uuid";
import { IRecipe } from "../Recipe/atom";

export const makeId = (): string => v4();

interface CartItem {
  recipe: IRecipe;
  quantity: number;
}

export interface ICart {
  items: CartItem[];
  response: {
    [ingrediant: string]: {
      unit: any;
      quantity: number;
      complement: string;
    };
  } | null;
}

export const cartState: RecoilState<ICart> = atom<ICart>({
  key: "cartState", // unique ID (with respect to other atoms/selectors)
  default: { items: [], response: null }, // default value (aka initial value)
});

export default cartState;
