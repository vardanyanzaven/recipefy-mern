import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar } from "@mui/material";
import { HeaderCont, HeaderLink } from "./Header.styles";
import AuthBtns from "../header-auth-btns/AuthBtns";
import HeaderUser from "../header-user/HeaderUser";
import { useAppSelector } from "../../redux/hooks.redux";
import { headerLinks } from "../../constants";
import Logo from "../logo/Logo";

const Header = ({ activePage }: { activePage: string }) => {
  const { isLoggedIn, username, email } = useAppSelector((state) => state.user);

  return (
    <>
      <AppBar position="static" sx={{ background: "#effffe"}}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between", height: 80, alignItems: "center" }}
          >
            <HeaderCont
              sx={{
                justifyContent: { xs: "space-between", lg: "space-evenly" },
              }}
            >
              {headerLinks.map((headerLink) => {
                return (
                  <Link key={headerLink.link} to={headerLink.link}>
                    <HeaderLink
                      noWrap
                      variant="h6"
                      sx={{
                        fontWeight: 300,
                      }}
                      className={
                        activePage === headerLink.link ? "active-page-link" : ""
                      }
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
              <Logo variant="h3" />
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
