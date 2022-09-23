import LoginPage from "./LoginPage";
import { getByRole, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

describe("Login component", () => {
    const initialState = { user: {}, isAuthenticated: false };
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);

    test("Renders LoginPage component", () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );
        const loginLabel = screen.getByText(/login/i);
        expect(loginLabel).toBeInTheDocument();
    });

    test("Failed login", () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );

        const input = screen.getByPlaceholderText("achji.remi@gmail.com to login");
        userEvent.type(input, "test@gmail.com");

        const button = screen.getByRole("button");
        userEvent.click(button);
        setTimeout(() => {
            const errorMessage = screen.getByText(/user not found/i);
            expect(errorMessage).toBeInTheDocument();
        }, 3000);
    });
});
