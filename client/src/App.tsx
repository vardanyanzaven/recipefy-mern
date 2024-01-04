import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import SignIn from "./components/auth-forms/forms/SignInForm";
import SignUp from "./components/auth-forms/forms/SignUpForm";
import RecipesPage from "./pages/RecipesPage";
import AboutPage from "./pages/AboutPage";
import LibraryPage from "./pages/LibraryPage";
import { ThemeProvider, createTheme } from "@mui/material";

const globalTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 620,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
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
        <Route path="/" element={<Header activePage={activePage} setActivePage={setActivePage} />}>
          <Route
            path="recipes"
            
            element={<RecipesPage setActivePage={setActivePage}/>}
          />
          <Route
            path="about"
         
            element={<AboutPage setActivePage={setActivePage}/>}
          />
          <Route
            path="library"
            
            element={<LibraryPage setActivePage={setActivePage}/>}
          />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
