import React from "react";

const CartComponent = React.lazy(() => import("./views/Cart"));
const RecipesComponent = React.lazy(() => import("./views/Recipes"));

const Home: React.FC = () => {
  return <h1>bjr</h1>;
};

export interface Route {
  path: string;
  sidebarName: string;
  component: React.ComponentType;
}

const Routes: Route[] = [
  {
    path: "/",
    sidebarName: "Home",
    component: Home,
  },
  {
    path: "/recipes",
    sidebarName: "Gérer recettes",
    component: RecipesComponent,
  },
  {
    path: "/cart",
    sidebarName: "Calculer panier",
    component: CartComponent,
  },
];

export default Routes;
