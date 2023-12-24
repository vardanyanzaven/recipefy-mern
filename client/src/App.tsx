import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SignIn from "./components/auth-forms/forms/SignInForm";
import SignUp from "./components/auth-forms/forms/SignUpForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            path="recipes"
            element={
              <>
                <div>Recipes page here</div>
                <Outlet />
              </>
            }
          />
          <Route path="about" element={<p>About page here</p>} />
          <Route
            path="library"
            element={<p>Saved recipes and answers page here</p>}
          />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
