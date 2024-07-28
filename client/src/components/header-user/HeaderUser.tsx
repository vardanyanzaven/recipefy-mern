import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks.redux";
import { logoutUser } from "../../redux/redux-slices/user.slice";
import StyledButton from "../button/StyledButton";
import { UserData } from "@typings/auth";
import { BASE_API_URL } from "../../constants";

const HeaderUser = ({ username }: Pick<UserData, "username" | "email">) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await fetch(`${BASE_API_URL}/auth/logout`, { method: "post" });
    dispatch(logoutUser());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", columnGap: 20 }}>
      <p
        id="username"
        style={{ color: "black", fontFamily: "DM Sans", fontSize: "1.2em" }}
      >
        {username}
      </p>
      <StyledButton onClick={handleLogout}>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          Log out
        </Link>
      </StyledButton>
    </div>
  );
};

export default HeaderUser;
