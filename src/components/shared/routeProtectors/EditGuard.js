import React from "react";
import { Redirect } from "react-router-dom";

//TODO: Properly adjust guard
export const EditGuard = props => {
    if (localStorage.getItem("id")) {
        return props.children;
    }
    // redirect to login page if user isn't logged in
    return <Redirect to={"/login"} />;
};
