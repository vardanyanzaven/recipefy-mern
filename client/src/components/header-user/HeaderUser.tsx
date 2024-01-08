import React from "react";
import StyledButton from "../button/StyledButton";
import { useAppDispatch } from "../../redux/hooks.redux";
import { logoutUser } from "../../redux/redux-slices/user.slice";

export type UserData = {
  username: string;
  email: string;
};

const HeaderUser = ({ username, email }: UserData) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", columnGap: 20 }}>
      <p style={{ color: "black", fontFamily: "DM Sans", fontSize: "1.2em" }}>
        {username}
      </p>
      <StyledButton onClick={handleLogout}>Log out</StyledButton>
    </div>
  );
};

export default HeaderUser;
