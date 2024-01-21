import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { HeaderCont, HeaderLink } from "./Header.styles";
import AuthBtns from "../header-auth-btns/AuthBtns";
import HeaderUser from "../header-user/HeaderUser";
import { useAppSelector } from "../../redux/hooks.redux";
import { HEADER_LINKS } from "../../constants";
import Logo from "../logo/Logo";
import HeaderMenu from "../header-menu/HeaderMenu";

const Header = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isLoggedIn, username, email } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.between("xs", "md"));

  const handleOpenLink = (link: string) => {
    link === "recipes" && navigate(link);
  };

  useEffect(() => {
    setActivePage("");
  }, []);

  return (
      <AppBar position="fixed" sx={{ background: "#d0fdfd"}}>
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
                justifyContent: "center",
                pb: 1,
                display: {
                  xs: "flex",
                  sm: "none",
                  flexGrow: 0,
                  marginLeft: 10,
                },
              }}
            >
              <Box onClick={() => setActivePage("")}>
                <Logo />
              </Box>
            </HeaderCont>
            <HeaderCont
              sx={{ display: { xs: "none", sm: "flex", md: "none" } }}
            >
              <HeaderMenu activePage={activePage} />
            </HeaderCont>
            <HeaderCont
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: { xs: "space-between", lg: "space-evenly" },
              }}
            >
              {HEADER_LINKS.map((headerLink) => {
                return (
                  <HeaderLink
                    key={headerLink.link}
                    noWrap
                    variant="h6"
                    sx={{
                      fontWeight: 300,
                    }}
                    className={`${
                      activePage === headerLink.link && "active-page-link"
                    } ${headerLink.link !== "recipes" && "disabled"}`}
                    onClick={() => handleOpenLink(headerLink.link)}
                  >
                    {headerLink.name}
                  </HeaderLink>
                );
              })}
            </HeaderCont>
            <HeaderCont
              sx={{
                justifyContent: "center",
                pb: 1,
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Box onClick={() => setActivePage("")}>
                <Logo />
              </Box>
            </HeaderCont>
            <HeaderCont
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                  flexGrow: 0,
                  marginRight: 10,
                },
              }}
            >
              <HeaderMenu activePage={activePage} />
            </HeaderCont>
            <HeaderCont
              sx={{
                justifyContent: "flex-end",
                columnGap: { xs: 1.5, md: 3 },
                display: { xs: "none", sm: "flex" },
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
  );
};

export default Header;
