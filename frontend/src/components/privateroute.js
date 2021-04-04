import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserInfo } from '../service/auth.service'
import Navbar from './navbar'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const  user = getUserInfo()

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
