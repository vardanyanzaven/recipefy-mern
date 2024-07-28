import React from "react";
import { render, screen } from "@testing-library/react"
import StyledButton, { BUTTON_TYPES } from "./StyledButton"

describe("StyledButton tests", () => {
    it("renders a BaseButton when base button type is passed", () => {
        render(<StyledButton buttonType={BUTTON_TYPES.base}>Test</StyledButton>);
        const buttonEl = screen.getByText("Test");
        expect(buttonEl.dataset.testid).toBe("button-base");
    })

    it("renders a ColoredButton when colored button type is passed", () => {
        render(<StyledButton buttonType={BUTTON_TYPES.colored}>Test</StyledButton>);
        const buttonEl = screen.getByText("Test");
        expect(buttonEl.dataset.testid).toBe("button-colored");
    })
})