import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { HeaderCont, HeaderLink } from "./Header.styles";
import AuthBtns from "../header-auth-btns/AuthBtns";
import HeaderUser from "../header-user/HeaderUser";
import { useAppSelector } from "../../redux/hooks.redux";
import { headerLinks } from "../../constants";
import Logo from "../logo/Logo";

const Header = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isLoggedIn, username, email } = useAppSelector((state) => state.user);

  useEffect(() => {
    setActivePage("");
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ background: "#effffe" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: 80,
              alignItems: "center",
            }}
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
              <Box onClick={() => setActivePage("")}>
                <Logo variant="h3" />
              </Box>
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
