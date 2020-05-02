import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoggedInGuard = props => {
    if (localStorage.getItem("id") && !localStorage.getItem('gameId') && !localStorage.getItem('lobbyId')) {
        return props.children;
    }
    if(localStorage.getItem('gameId')){
        return <Redirect to={`/game/lobbies/${localStorage.getItem("lobbyId")}/game`} />;
    }
    if(localStorage.getItem('lobbyId')){
        return <Redirect to={`/game/lobbies/${localStorage.getItem("lobbyId")}`} />;
    }
    // redirect to login page if user isn't logged in
    return <Redirect to={"/login"} />;
};