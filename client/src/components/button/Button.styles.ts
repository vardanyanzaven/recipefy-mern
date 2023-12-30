import { Button } from "@mui/material";
import styled from "styled-components";

const BaseButton = styled.button`
  font-size: 1.5rem;
  text-transform: capitalize;
  min-width: 120px;
  height: 45px;
  background-color: transparent;
  border: 2px solid #3bd6c6;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #bdeefc;
    border-color: #34bfb1;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #3bd6c6;

  &:hover {
    background-color: #00a8b8;
    border-color: #00a8b8;
  }
`;

export { BaseButton, SecondaryButton };
