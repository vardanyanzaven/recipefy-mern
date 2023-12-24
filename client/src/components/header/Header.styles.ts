import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 40px;
  height: 75px;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 33%;
  justify-content: center;
  column-gap: 15%;
`;

const HeaderLink = styled(Link)`
  color: #3bd6c6;
  text-decoration: none;
  text-align: center;
  text-transform: capitalize;
`;

export { HeaderContainer, HeaderSection, HeaderLink };
