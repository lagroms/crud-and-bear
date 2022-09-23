import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Header from "../components/Home/Header";
import UserCard from "../components/Home/UserCard";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("HomePage component", () => {
    const initialState = {
        user: {
            id: "1",
            email: "achji.remi@gmail.com",
            first_name: "Remi",
            last_name: "Achji",
            avatar: "",
        },
        isAuthenticated: true,
    };
    const mockStore = configureStore();
    let store;

    test("Users are loaded", () => {
        store = mockStore(initialState);

        shallow(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const textOuput = screen.queryByText(/login/i);
        expect(textOuput).not.toBeInTheDocument();
    });

    test("New user modal opened", () => {
        render(<Header />);

        const buttonElement = screen.getByRole("button", { name: /\+ ADD USER/i });
        userEvent.click(buttonElement);

        const textOutput = screen.queryByText(/Add a user/i);
        expect(textOutput).not.toBeInTheDocument();
    });

    test("User logged out successfuly", () => {
        const history = createMemoryHistory();
        store = mockStore(initialState);

        render(
            <Router history={history}>
                <Provider store={store}>
                    <UserCard user={store.getState().user} />
                </Provider>
            </Router>
        );

        const buttonElement = screen.getByRole("button", { name: /logout/i });
        userEvent.click(buttonElement);

        expect(history.location.pathname).toBe("/");
    });
});
