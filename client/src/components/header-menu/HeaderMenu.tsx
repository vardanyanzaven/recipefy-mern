import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderLink } from "../header/Header.styles";
import { HEADER_LINKS } from "../../constants";
import { useAppSelector } from "../../redux/hooks.redux";
import verifyUser from "../../utils/helpers/verifyUser";
import useSnackbar from "../snackbar/Snackbar";

const HeaderMenu = ({ activePage, handleOpen }: { activePage: string, handleOpen: (message: string) => void }) => {
  const navigate = useNavigate();
  const { CustomSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenLink = async (
    verification: boolean | undefined,
    link: string
  ) => {
    let isLinkOpened = false;
    if (verification) {
      const isVerified = await verifyUser();
      if (!isVerified) {
        handleOpen("Sign in to view saved recipes!");
        return isLinkOpened;
      }
    }

    link !== "about" && navigate(link);
    isLinkOpened = true;
    return isLinkOpened;
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        data-testid="header-menu-btn"
        size="medium"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MenuIcon sx={{ color: "black" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        sx={{ marginTop: "20px", display: { xs: "flex", md: "none" } }}
        onClose={closeMenu}
      >
        {HEADER_LINKS.map((headerLink) => {
          return (
            <MenuItem
              key={headerLink.link}
              disableRipple={headerLink.link === "about"}
              sx={{
                width: "100vw",
                ".MuiTouchRipple-child": {
                  backgroundColor: "#4eecdc",
                },
                cursor: headerLink.link !== "about" ? "pointer" : "default",
              }}
              onClick={async () => {
                const isLinkOpened = await handleOpenLink(headerLink.verification, headerLink.link);
                (headerLink.link !== "about" && isLinkOpened) && closeMenu();
              }}
            >
              <HeaderLink
                noWrap
                variant="h6"
                sx={{
                  fontWeight: 300,
                }}
                className={`${
                  activePage === headerLink.link && "active-page-link"
                } ${headerLink.link === "about" && "disabled"}`}
              >
                {headerLink.name}
              </HeaderLink>
            </MenuItem>
          );
        })}
        {!isLoggedIn && (
          <MenuItem
            onClick={async () => {
              await handleOpenLink(false, "signin");
              closeMenu();
            }}
            sx={{
              width: "100vw",
              ".MuiTouchRipple-child": {
                backgroundColor: "#4eecdc",
              },
              display: { xs: "block", sm: "none" },
            }}
          >
            <HeaderLink
              noWrap
              variant="h6"
              sx={{
                fontWeight: 300,
              }}
            >
              Sign In
            </HeaderLink>
          </MenuItem>
        )}
      </Menu>
      <CustomSnackbar />
    </>
  );
};

export default HeaderMenu;
