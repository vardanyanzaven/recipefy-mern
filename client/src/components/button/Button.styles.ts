import styled from "styled-components";

const BaseButton = styled.button`
  min-width: 120px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #3bd6c6;
`;

export { BaseButton, SecondaryButton };
