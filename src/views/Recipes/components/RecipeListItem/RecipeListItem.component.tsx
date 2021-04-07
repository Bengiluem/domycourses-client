import React, { useState } from "react";

import { IRecipe } from "../../../../state/Recipe/atom";

import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  recipe: IRecipe;
  editRecipe: (recipe: IRecipe) => void;
  deleteRecipe: (recipeId: string) => void;
};

const RecipeListItem: React.FC<Props> = ({
  recipe,
  editRecipe,
  deleteRecipe,
}: Props): JSX.Element => {
  const [isEditing, setEditing] = useState(false);

  return (
    <TableRow key={recipe.id}>
      <TableCell component="th" scope="row">
        {!isEditing ? (
          recipe.name
        ) : (
          <TextField
            value={recipe.name}
            onChange={(event) =>
              editRecipe({ ...recipe, name: event.currentTarget.value })
            }
          ></TextField>
        )}
      </TableCell>
      <TableCell align="right">
        {!isEditing ? (
          recipe.link
        ) : (
          <TextField
            value={recipe.link}
            onChange={(event) =>
              editRecipe({ ...recipe, link: event.currentTarget.value })
            }
          ></TextField>
        )}
      </TableCell>
      <TableCell align="left">
        <IconButton onClick={() => setEditing(!isEditing)} color="secondary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => deleteRecipe(recipe.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default RecipeListItem;
