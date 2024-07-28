import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { HeaderCont, HeaderLink } from "./Header.styles";
import AuthBtns from "../header-auth-btns/AuthBtns";
import HeaderUser from "../header-user/HeaderUser";
import { useAppSelector } from "../../redux/hooks.redux";
import { HEADER_LINKS } from "../../constants";
import Logo from "../logo/Logo";
import HeaderMenu from "../header-menu/HeaderMenu";
import verifyUser from "../../utils/helpers/verifyUser";
import useSnackbar from "../snackbar/Snackbar";

const Header = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const { CustomSnackbar, handleOpen } = useSnackbar();
  const { isLoggedIn, username, email } = useAppSelector((state) => state.user);

  const handleOpenLink = async (
    verification: boolean | undefined,
    link: string
  ) => {
    if (verification) {
      const isVerified = await verifyUser();
      if (!isVerified) {
        handleOpen("Sign in to view saved recipes!");
        return;
      }
    }

    link !== "about" && navigate(link);
  };

  useEffect(() => {
    setActivePage("");
  }, [setActivePage]);

  return (
    <>
      <AppBar
        data-testid="header"
        position="fixed"
        sx={{ background: "#d0fdfd" }}
      >
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
              <HeaderMenu activePage={activePage} handleOpen={handleOpen}/>
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
                    } ${headerLink.link === "about" && "disabled"}`}
                    onClick={async () =>
                      await handleOpenLink(
                        headerLink.verification,
                        headerLink.link
                      )
                    }
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
              <HeaderMenu activePage={activePage} handleOpen={handleOpen} />
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
      <CustomSnackbar />
    </>
  );
};

export default Header;
