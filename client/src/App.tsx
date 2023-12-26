import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SignIn from "./components/auth-forms/forms/SignInForm";
import SignUp from "./components/auth-forms/forms/SignUpForm";
import RecipesPage from "./pages/RecipesPage";
import AboutPage from "./pages/AboutPage";
import LibraryPage from "./pages/LibraryPage";

function App() {
  const [activePage, setActivePage] = useState("");
  console.log(activePage);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header activePage={activePage} />}>
          <Route path="recipes" element={<RecipesPage setActivePage={setActivePage}/>} />
          <Route path="about" element={<AboutPage setActivePage={setActivePage}/>} />
          <Route
            path="library"
            element={<LibraryPage setActivePage={setActivePage}/>} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
