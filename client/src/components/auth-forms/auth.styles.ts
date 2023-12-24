import styled from "styled-components";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 70%;
  padding: 20px 50px;
  border: 2px solid black;
  border-radius: 20px;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    row-gap: 15px;
`;

const AuthInput = styled.input`
    height: 50px;
    width: 100%;
    caret-color: #3bd6c6;
    border-radius: 25px;
    border: 2px solid #3bd6c6;
    padding-left: 20px;
    font-size: 15px;

    &:focus {
        outline: none;
    }
`;

const InputCont = styled.div`
    width: 100%
`;

export { AuthContainer, FormContainer, AuthInput, InputCont };
