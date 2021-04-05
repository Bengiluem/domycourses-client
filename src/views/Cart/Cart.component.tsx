import React, { useCallback, useEffect } from "react";
import { withRouter } from "react-router";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { useRecoilState } from "recoil";

import recipesState, { IRecipe } from "../../state/Recipe/atom";

import cartState, { ICart } from "../../state/Cart/atom";
import { postCartQuery } from "../../state/Cart/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function Cart() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<Array<number>>([]);
  const [recipes, setRecipes] = useRecoilState<IRecipe[]>(recipesState);
  const [cart, setCart] = useRecoilState<ICart>(cartState);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const yourPostQuery = async (shoppingCart: ICart) => {
    const response = await postCartQuery(
      shoppingCart.items.map((item) => item.recipe.link)
    );
    const body = await response.json();
  };

  const handleQuantityChanged = (id: string, value: number) => {
    const recipeIndex: number = recipes.findIndex((record) => record.id === id);

    if (recipeIndex >= 0) {
      const recipe = recipes[recipeIndex];
      const newRecipes: IRecipe[] = [...recipes];
      newRecipes.splice(recipeIndex, 1, { ...recipe, quantity: value });
      setRecipes(newRecipes);
    }
  };

  const handleSubmit = async () => {
    const test: IRecipe[] = checked.map((index) => recipes[index]);
    const newCart: ICart = test.reduce(
      (acc: ICart, recipe: IRecipe) => ({
        ...acc,
        items: [
          ...acc.items,
          {
            recipe,
            quantity: recipe.quantity ?? 0,
          },
        ],
      }),
      { items: [], response: null }
    );
    setCart(newCart);

    await yourPostQuery(newCart);
  };

  return (
    <Container maxWidth="md">
      <List className={classes.root}>
        {recipes.map((recipe: IRecipe, index: number) => {
          const labelId = `checkbox-list-label-${recipe.id}`;

          return (
            <ListItem
              key={recipe.id}
              role={undefined}
              dense
              button
              onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${recipe.name}`} />
              <ListItemSecondaryAction>
                <TextField
                  onChange={(event) =>
                    handleQuantityChanged(
                      recipe.id,
                      parseInt(event.target.value, 10)
                    )
                  }
                  id="standard-number"
                  label="Number"
                  type="number"
                  defaultValue={1}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Button style={{ width: "200px" }} onClick={() => handleSubmit()}>
        Submit
      </Button>
    </Container>
  );
}

export default withRouter(Cart);
