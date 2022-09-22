import "react-toastify/dist/ReactToastify.css";
import { Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/Routing/PrivateRoute";
import PublicRoute from "./components/Routing/PublicRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (
        <>
            <ToastContainer />

            <Switch>
                <PublicRoute restricted={true} path="/login" component={LoginPage} />
                <PrivateRoute path="/users/:userId?" component={HomePage} />
                <Redirect to="/users" />
            </Switch>
        </>
    );
};

export default App;
