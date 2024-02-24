import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton, ColoredButton } from "./StyledButton.styles";
import { TypographyOwnProps } from "@mui/material";

enum BUTTON_TYPES {
  base = "base",
  colored = "colored",
}

type ButtonProps = {
  children?: ReactNode;
  buttonType?: BUTTON_TYPES;
} & ButtonHTMLAttributes<HTMLButtonElement> & TypographyOwnProps;

const StyledButton = ({
  buttonType,
  children,
  ...otherProps
}: ButtonProps): JSX.Element => {
  let ButtonEl: JSX.Element = <BaseButton {...otherProps}>{children}</BaseButton>;
  switch (buttonType) {
    case undefined || BUTTON_TYPES.base:
      ButtonEl = <BaseButton data-testid="button-base" {...otherProps}>{children}</BaseButton>;
      break;
    case BUTTON_TYPES.colored:
      ButtonEl = <ColoredButton data-testid="button-colored" {...otherProps}>{children}</ColoredButton>;
      break;
  };
  return ButtonEl;
};

export { StyledButton as default, BUTTON_TYPES };