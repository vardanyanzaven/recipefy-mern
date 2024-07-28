import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/tests/test.utils";
import App from "../../App";
import mediaQuery from "css-mediaquery";

type QueryList = {
  matches: boolean;
  media: string;
  onchange: null | ((this: MediaQueryList, ev: MediaQueryListEvent) => any);
  addListener: (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  removeListener: (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
};

const createMatchMedia =
  (width: number): ((query: string) => QueryList) =>
  (query) => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
  });

describe("Header Menu tests", () => {
  it("sets the active page correctly when a link is clicked in the menu", async () => {
    window.matchMedia = createMatchMedia(600) as (
      query: string
    ) => MediaQueryList;

    renderWithProviders(<App />);

    const linkMenuBtn = screen.getAllByTestId("header-menu-btn")[0];
    userEvent.click(linkMenuBtn);
    const recipeMenuItem = screen.getByText("Recipes");
    userEvent.click(recipeMenuItem);
    await waitFor(() => {
      expect(recipeMenuItem.className).toContain("active-page-link");
    });
  });
});
