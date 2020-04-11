import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const JoinLobbyGuard = props => {
    if (localStorage.getItem("token")) {
        return props.children;
    }
    // redirect to login page if user isn't logged in
    return <Redirect to={"/login"} />;
};