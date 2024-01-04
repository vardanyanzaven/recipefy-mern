import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton, ColoredButton } from "./Button.styles";
import { ButtonOwnProps } from "@mui/material";

enum BUTTON_TYPES {
  base = "base",
  colored = "colored",
}

type ButtonProps = {
  children?: ReactNode;
  buttonType?: BUTTON_TYPES;
} & ButtonHTMLAttributes<HTMLButtonElement> & ButtonOwnProps;

const Button = ({
  buttonType,
  children,
  ...otherProps
}: ButtonProps): JSX.Element => {
  let ButtonEl: JSX.Element = <BaseButton {...otherProps}>{children}</BaseButton>;
  switch (buttonType) {
    case undefined || BUTTON_TYPES.base:
      ButtonEl = <BaseButton {...otherProps}>{children}</BaseButton>;
      break;
    case BUTTON_TYPES.colored:
      ButtonEl = <ColoredButton {...otherProps}>{children}</ColoredButton>;
      break;
  };
  return ButtonEl;
};

export { Button as default, BUTTON_TYPES };
