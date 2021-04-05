import { atom, RecoilState } from "recoil";

import { v4 } from "uuid";

export const makeId = (): string => v4();

export interface IRecipe {
  id: string;
  name: string;
  link: string;
  quantity?: number;
}

export const recipesState: RecoilState<IRecipe[]> = atom<IRecipe[]>({
  key: "recipesState", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      id: makeId(),
      name: "Pudding",
      link:
        "https://www.marmiton.org/recettes/recette_le-pudding-de-quand-j-etais-p-tite_31801.aspx",
      quantity: 0,
    },
  ], // default value (aka initial value)
});

export default recipesState;
