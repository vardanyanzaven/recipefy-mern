import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "src/utils/tests/test.utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockRecipe = {
  recipeId: "recipe-id",
  title: "Mock Recipe",
  sourceUrl: "recipe-source-url",
  imageUrl: "recipe-image-url",
  ingredients: ["Ingr. 1", "Ingr. 2"],
  instructions: [{ step: "Step 1", number: 1 }],
  calories: 200,
  readyInMinutes: 45,
  servings: 3,
  diets: ["none"],
};

describe("RecipeCard tests", () => {
  it("displays all of the required information", async () => {
    renderWithProviders(
        <RecipeCard recipe={mockRecipe} />
    );

    const ingredientsInfo = screen.getByTestId("Ingredients");
    expect(ingredientsInfo.innerHTML).toBe("Ingredients: 2");
    const caloriesInfo = screen.getByTestId("Calories");
    expect(caloriesInfo.innerHTML).toBe("Calories: 200");
    const prepTimeInfo = screen.getByTestId("Prep time");
    expect(prepTimeInfo.innerHTML).toBe("Prep time: 45m");
    const servingsInfo = screen.getByTestId("Servings");
    expect(servingsInfo.innerHTML).toBe("Servings: 3");
  });
});
