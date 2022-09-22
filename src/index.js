import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import configureAppStore from "./store/index";

import "./index.css";
import App from "./App";

const { store, persistor } = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
