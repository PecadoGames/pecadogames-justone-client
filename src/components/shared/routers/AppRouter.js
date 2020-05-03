import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import GameRouter from "./GameRouter";
import { LoggedOutUser } from "../routeProtectors/LoggedOutUser";
import Register from "../../login/Register";
import LoginBase from "../../login/LoginBase";
import Lobby from "../../lobby/Lobby";
import TransitionState from "../../game/States/TransitionState";
import EndGameState from "../../game/States/EndGameState";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
            <Route exact path="/" render={() => <Redirect to={"/game"} />} />
            <Route
              path="/game"
              render={() => (
                  <GameRouter base={"/game"} changeMusicToNormal={this.props.changeMusicToNormal} />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoggedOutUser>
                  <LoginBase changeMusicToDim={this.props.changeMusicToDim} />
                </LoggedOutUser>
              )}
            />
          <Route
              path="/register"
              exact
              render={() => (
                  <LoggedOutUser>
                  <Register changeMusicToDim={this.props.changeMusicToDim}/>
                  </LoggedOutUser>
              )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}


/*
* Don't forget to export your component!
 */
export default AppRouter;
