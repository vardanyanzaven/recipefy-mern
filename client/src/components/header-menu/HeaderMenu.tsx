import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderLink } from "../header/Header.styles";
import { HEADER_LINKS } from "../../constants";

const HeaderMenu = ({ activePage }: { activePage: string }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenLink = (link: string) => {
    navigate(link);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="medium" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MenuIcon sx={{ color: "black" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        sx={{ marginTop: "20px" }}
        onClose={closeMenu}
      >
        {HEADER_LINKS.map((headerLink) => {
          return (
            <MenuItem
              sx={{
                width: "100vw",
                ".MuiTouchRipple-child": {
                  backgroundColor: "#4eecdc",
                },
              }}
              onClick={() => {
                handleOpenLink(headerLink.link);
                closeMenu();
              }}
            >
              <HeaderLink
                key={headerLink.link}
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
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default HeaderMenu;