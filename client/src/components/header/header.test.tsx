import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/tests/test.utils";
import App from "../../App";

describe("Header tests", () => {
  it("sets the active page correctly when a link is clicked", async () => {
    renderWithProviders(<App />);
    const recipesLink = screen.getByText("Recipes");
    userEvent.click(recipesLink);

    await waitFor(() => {
      expect(recipesLink.className).toContain("active-page-link");
    });
  });
});
