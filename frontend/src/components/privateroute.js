import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from '../service/auth.service'
import Navbar from './navbar'

const PrivateRoute = ({ component: Component, ...rest }) => {
    // const { currentUserValue } = AuthService.getCurrentUser;

    const user = true

    return (
        <>
            <Navbar/>
            <Route
                {...rest}
                render={(props) => (
                    user ? 
                    <Component {...props} />
                    : <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location },
                    }}
                />
                )}
            />
        </>
    );
};

export default PrivateRoute
