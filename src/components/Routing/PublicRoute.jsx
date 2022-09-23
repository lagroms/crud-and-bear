import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) => (isAuth && restricted ? <Redirect to="/users" /> : <Component {...props} />)}
        />
    );
};

export default PublicRoute;
