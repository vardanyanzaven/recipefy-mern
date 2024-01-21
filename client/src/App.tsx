import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SignIn from "./components/auth-forms/forms/SignInForm";
import SignUp from "./components/auth-forms/forms/SignUpForm";
import RecipesPage from "./pages/recipes/RecipesPage";
import AboutPage from "./pages/about/AboutPage";
import LibraryPage from "./pages/library/LibraryPage";
import { ThemeProvider, createTheme } from "@mui/material";
import RecipePage from "./pages/recipe/RecipePage";

const globalTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 620,
      md: 920,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      "DM Sans",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
});

function App() {
  const [activePage, setActivePage] = useState("");

  return (
    <ThemeProvider theme={globalTheme}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header activePage={activePage} setActivePage={setActivePage} />
              <Outlet />
            </>
          }
        >
          <Route
            path="recipes"
            element={<RecipesPage setActivePage={setActivePage} />}
          />
          <Route path="recipes/:recipeId" element={<RecipePage />} />
          <Route
            path="about"
            element={<AboutPage setActivePage={setActivePage} />}
          />
          <Route
            path="library"
            element={<LibraryPage setActivePage={setActivePage} />}
          />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
