import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../stores/AuthenticationStore";
import { observer } from "mobx-react-lite";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(Authentication);
    const { currentUserValue } = auth;

    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (currentUserValue) {
                        return <Component {...props} />;
                    }

                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }}
            />
        </>
    );
};
