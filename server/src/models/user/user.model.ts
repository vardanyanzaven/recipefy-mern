import usersDB from "./user.mongo";

const saveRecipe = async (userId: string, recipeId: string) => {
  try {
    // Finds the user by ID, saves the recipe ID and returns the updated array(also includes the user id)
    const recipesInfo = await usersDB.findByIdAndUpdate(
      userId,
      { $push: { savedRecipes: recipeId } },
      {new: true, fields: { savedRecipes: 1 }}
    );

    return recipesInfo?.savedRecipes;
  } catch (err) {
    throw new Error("An error occured when saving the recipe");
  }
};

const removeRecipe = async (userId: string, recipeId: string) => {
  try {
    // Finds the user by ID, saves the recipe ID and returns the updated array(also includes the user id)
    const recipesInfo = await usersDB.findByIdAndUpdate(
      userId,
      { $pull: { savedRecipes: recipeId } },
      { new: true, fields: { savedRecipes: 1 } }
    );

    return recipesInfo?.savedRecipes;
  } catch (err) {
    throw new Error("An error occured when removing the recipe");
  }
};

export { saveRecipe, removeRecipe };
