import { screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("HomePage component", () => {
    const initialState = { user: {} };
    const mockStore = configureStore();
    let store;

    test("Users are loaded", () => {
        store = mockStore(initialState);

        shallow(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    });
});
