import LoginPage from "./LoginPage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const initialState = { user: {}, isAuthenticated: false };
const mockStore = configureStore();
let store;

test("Renders LoginPage component", () => {
    store = mockStore(initialState);
    render(
        <Provider store={store}>
            <LoginPage />
        </Provider>
    );
    const loginLabel = screen.getByText(/login/i);
    expect(loginLabel).toBeInTheDocument();
});
