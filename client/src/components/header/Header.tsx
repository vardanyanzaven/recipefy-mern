import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { HeaderCont, HeaderLink, Logo } from "./Header.styles";
import AuthBtns from "../header-auth-btns/AuthBtns";
import HeaderUser from "../header-user/HeaderUser";
import { useAppSelector } from "../../redux/hooks.redux";
import { headerLinks } from "../../constants";

const Header = () => {
  const { isLoggedIn, username, email } = useAppSelector((state) => state.user);

  // return (
  //   <>
  //     <HeaderContainer className="header-container">
  //       <HeaderSection className="header-section-left">
  //         <HeaderLink to="recipes">Recipes</HeaderLink>
  //         <HeaderLink to="about">About us</HeaderLink>
  //         <HeaderLink to="library">Library</HeaderLink>
  //       </HeaderSection>
  //       <HeaderSection className="header-section-center">
  //         <Logo/>
  //       </HeaderSection>
  //       <HeaderSection className="header-section-right">
  //         {isLoggedIn ? <HeaderUser username={username} email={email} /> : <AuthBtns />}
  //       </HeaderSection>
  //     </HeaderContainer>
  //     <Outlet />
  //   </>
  // );

  return (
    <>
      <AppBar position="static" sx={{ background: "#effffe" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <HeaderCont
              sx={{
                justifyContent: {xs: "space-between", lg: "space-evenly"},
              }}
            >
              {headerLinks.map((headerLink) => {
                return (
                  <Link key={headerLink.link} to={headerLink.link}>
                    <HeaderLink
                      noWrap
                      variant="h6"
                      sx={{
                        fontFamily: "DM Sans",
                        fontWeight: 300,
                      }}
                    >
                      {headerLink.name}
                    </HeaderLink>
                  </Link>
                );
              })}
            </HeaderCont>
            <HeaderCont
              sx={{
                justifyContent: "center",
                pb: 1,
              }}
            >
                <Logo
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    fontFamily: "Dancing Script",
                    textDecoration: "none",
                    fontSize: "3rem",
                    fontWeight: 500,
                  }}
                >
                  Recipefy
                </Logo>
            </HeaderCont>
            <HeaderCont
              sx={{
                justifyContent: "flex-end",
                columnGap: 3,
              }}
            >
              {isLoggedIn ? (
                <HeaderUser username={username} email={email} />
              ) : (
                <AuthBtns />
              )}
            </HeaderCont>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Header;
