import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { MemoryRouter } from "react-router-dom";

const mockWrongInputs = {
  username: "Ms",
  email: "notanemail",
  password: "weakpass",
  age: 900,
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const signUpErrors = {
  username:
    /username is required|username must be at least 3 characters long|username must be no longer than 25 characters/i,
  email: /email is required|email is not valid/i,
  password:
    /password is required|password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol [(@$!%*#?&)]/i,
  age: /age is required|age must be lower than 90|age must be higher than 16/i,
};

const signInErrors = {
  email: /email is required|email is not valid|no users matching this email/i,
  password:
    /password is required|incorrect password|password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol [(@$!%*#?&)]/i,
};

describe("Auth forms tests", () => {
  describe("SignUpForm tests", () => {
    const { username, email, password, age } = mockWrongInputs;

    let usernameErr: HTMLElement;
    let emailErr: HTMLElement;
    let passwordErr: HTMLElement;
    let ageErr: HTMLElement;

    const setSignUpErrs = async () =>
      await waitFor(() => {
        usernameErr = screen.getByText(signUpErrors.username);
        emailErr = screen.getByText(signUpErrors.email);
        passwordErr = screen.getByText(signUpErrors.password);
        ageErr = screen.getByText(signUpErrors.age);
      });

    it("throws validation errors when no inputs are passed", async () => {
      render(
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      );

      // Submits the form without passing any inputs
      const signUpButton = screen.getByText("Sign Up");
      fireEvent.click(signUpButton);

      // Sets the input errors
      await setSignUpErrs();
      expect(usernameErr.innerHTML).toBe("Username is required");
      expect(emailErr.innerHTML).toBe("Email is required");
      expect(passwordErr.innerHTML).toBe("Password is required");
      expect(ageErr.innerHTML).toBe("Age is required");
    });

    it("throws validation errors when incorrect inputs are passed", async () => {
      render(
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      );

      const usernameInput = screen.getByLabelText("Username *");
      const emailInput = screen.getByLabelText("Email *");
      const passwordInput = screen.getByLabelText("Password *");
      const ageInput = screen.getByLabelText("Age *");
      const caloriesInput: HTMLInputElement =
        screen.getByLabelText("4 or more");
      const signUpButton = screen.getByText("Sign Up");

      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(ageInput, { target: { value: age.toString() } });
      //   Only selects the "4-5 meals" radio option
      fireEvent.click(caloriesInput);
      // Diets selector has a default value

      fireEvent.click(signUpButton);

      // Sets the input errors
      await setSignUpErrs();
      expect(usernameErr.innerHTML).toBe(
        "Username must be at least 3 characters long"
      );
      expect(emailErr.innerHTML).toBe("Email is not valid");
      expect(passwordErr.innerHTML).toBe(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@$!%*#?&amp;)"
      );
      expect(ageErr.innerHTML).toBe("Age must be lower than 90");
    });
  });

  describe("SignInForm tests", () => {
    let emailErr: HTMLElement;
    let passwordErr: HTMLElement;

    const setSignInErrs = async () =>
      await waitFor(() => {
        emailErr = screen.getByText(signInErrors.email);
        passwordErr = screen.getByText(signInErrors.password);
      });

    it("throws validation errors when no inputs are passed", async () => {
      render(
        <MemoryRouter>
          <SignInForm />
        </MemoryRouter>
      );

      const signInBtn = screen.getByText("Sign In");
      fireEvent.click(signInBtn);
      await setSignInErrs();
      expect(emailErr.innerHTML).toBe("Email is required");
      expect(passwordErr.innerHTML).toBe("Password is required");
    });

    it("throws validation errors when invalid inputs are passed", async () => {
      render(
        <MemoryRouter>
          <SignInForm />
        </MemoryRouter>
      );

      const emailInput = screen.getByLabelText("Email *");
      fireEvent.change(emailInput, { target: { value: "invalidemail" } });
      const passwordInput = screen.getByLabelText("Password *");
      fireEvent.change(passwordInput, { target: { value: "weakpass" } });

      const signInBtn = screen.getByText("Sign In");
      fireEvent.click(signInBtn);
      await setSignInErrs();
      expect(emailErr.innerHTML).toBe("Email is not valid");
      expect(passwordErr.innerHTML).toBe(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@$!%*#?&amp;)"
      );
    });
  });
});
