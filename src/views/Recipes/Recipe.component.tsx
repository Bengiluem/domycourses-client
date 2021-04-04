import React, { useEffect } from "react";
import { withRouter } from "react-router";

import { useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import recipesState, { IRecipe, makeId } from "../../state/Recipe/atom";
import RecipeListItem from "./components/RecipeListItem";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, link: string): IRecipe {
  return { id: makeId(), name, link };
}

const Recipe: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [recipes, setRecipes] = useRecoilState<IRecipe[]>(recipesState);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  const handleAdd = (name: string = "", link: string = ""): void => {
    const newRecipe = createData(name, link);
    setRecipes([...recipes, newRecipe]);
  };

  const handleDelete = (recipedId: string): void => {
    const newRecipes = recipes.filter((recipe) => recipe.id !== recipedId);
    setRecipes(newRecipes);
  };

  const handleEdit = (recipe: IRecipe): void => {
    const recipeIndex: number = recipes.findIndex(
      (record) => record.id === recipe.id
    );
    if (recipeIndex >= 0) {
      const newRecipes: IRecipe[] = [...recipes];
      newRecipes.splice(recipeIndex, 1, recipe);
      setRecipes(newRecipes);
    } else {
      handleAdd(recipe.name, recipe.link);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Recipe</TableCell>
              <TableCell align="right">Link</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe: IRecipe) => (
              <RecipeListItem
                recipe={recipe}
                deleteRecipe={handleDelete}
                editRecipe={handleEdit}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button style={{ width: "200px" }} onClick={() => handleAdd()}>
        Add new recipe !
      </Button>
    </>
  );
};

export default withRouter(Recipe);
