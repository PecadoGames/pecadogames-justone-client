import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const LobbyGuard = props => {
    if (localStorage.getItem("lobbyId") && !localStorage.getItem('gameId')) {
        return props.children;
    }
    if(localStorage.getItem('gameId')){
        return <Redirect to={`/game/lobbies/${localStorage.getItem("lobbyId")}/game`} />;
    }
    // redirect to login page if user isn't logged in
    return <Redirect to={"/game"} />;
};