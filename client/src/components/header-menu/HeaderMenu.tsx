import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderLink } from "../header/Header.styles";
import { HEADER_LINKS } from "../../constants";
import { useAppSelector } from "src/redux/hooks.redux";

const HeaderMenu = ({ activePage }: { activePage: string }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenLink = (link: string) => {
    (link === "recipes" || link === "signin") && navigate(link);
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
              disableRipple={headerLink.link !== "recipes"}
              sx={{
                width: "100vw",
                ".MuiTouchRipple-child": {
                  backgroundColor: "#4eecdc",
                },
                cursor: headerLink.link === "recipes" ? "pointer" : "default",
              }}
              onClick={() => {
                handleOpenLink(headerLink.link);
                headerLink.link === "recipes" && closeMenu();
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
                } ${headerLink.link !== "recipes" && "disabled"}`}
              >
                {headerLink.name}
              </HeaderLink>
            </MenuItem>
          );
        })}
        {!isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleOpenLink("signin");
              closeMenu();
            }}
            sx={{
              width: "100vw",
              ".MuiTouchRipple-child": {
                backgroundColor: "#4eecdc",
              },
              display: {xs: "block", sm: "none"}
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
    </>
  );
};

export default HeaderMenu;
