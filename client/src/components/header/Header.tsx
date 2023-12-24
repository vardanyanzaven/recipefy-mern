import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderContainer, HeaderLink, HeaderSection } from "./Header.styles";
import Logo from "../logo/Logo";
import AuthBtns from "../header-auth-btns/AuthBtns";
import HeaderUser from "../header-user/HeaderUser";
import { useAppSelector } from "../../redux/hooks.redux";

const Header = () => {
  const {isLoggedIn, username, email} = useAppSelector((state) => state.user);

  return (
    <>
      <HeaderContainer className="header-container">
        <HeaderSection className="header-section-left">
          <HeaderLink to="recipes">Recipes</HeaderLink>
          <HeaderLink to="about">About us</HeaderLink>
          <HeaderLink to="library">Library</HeaderLink>
        </HeaderSection>
        <HeaderSection className="header-section-center">
          <Logo/>
        </HeaderSection>
        <HeaderSection className="header-section-right">
          {isLoggedIn ? <HeaderUser username={username} email={email} /> : <AuthBtns />}
        </HeaderSection>
      </HeaderContainer>
      <Outlet />
    </>
  );
};

export default Header;
