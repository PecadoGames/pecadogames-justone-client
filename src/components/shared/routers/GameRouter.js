import React from "react";
import styled from "styled-components";
import { Redirect, Route  } from "react-router-dom";
import Profile from "../../profile/Profile";
import Main from "../../main/Main";
import JoinLobby from "../../lobby/JoinLobby";
import CreateLobby from "../../lobby/CreateLobby";
import Lobby from "../../lobby/Lobby";
import Edit from "../../profile/Edit";
import Requests from "../../profile/Requests";
import Scoreboard from "../../scoreboard/Scoreboard.js"
import Game from "../../game/Game"
import Friends from "../../profile/Friends";
import GameTest from "../../game/GameTest";
import {LoggedInUser} from "../routeProtectors/LoggedInUser";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import {GameGuard} from "../routeProtectors/GameGuard";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/game" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
          {/* This is just for looking at the state purpose */}
          <Route
              exact
              path={`${this.props.base}/states`}
              render={() =>(
                  <GameTest/>
              )}
          />
          {/* Ends here */}
        <Route
          exact
          path={`${this.props.base}/main`}
          render={() => (
              <LoggedInUser>
              <Main changeMusicToNormal={this.props.changeMusicToNormal} />
              </LoggedInUser>
          )}
        />

          <Route
              exact
              path={`${this.props.base}/users/:id`}
              render={() => (
                  <LoggedInUser>
                    <Profile changeMusicToNormal={this.props.changeMusicToNormal} />
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies`}
              render={() => (
                  <LoggedInUser>
                  <JoinLobby changeMusicToNormal={this.props.changeMusicToNormal} />
                  </LoggedInUser>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/edit`}
              render={() => (
                  <LoggedInUser>
                      <Edit changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/users/:id/requests`}
              render={() => (
                  <LoggedInUser>
                  <Requests changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInUser>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/friends`}
              render={() => (
                  <LoggedInUser>
                  <Friends changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/createLobby`}
              render={() => (
                  <LoggedInUser>
                      <CreateLobby changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/scoreboard`}
              render={() => (
                  <LoggedInUser>
                      <Scoreboard changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInUser>
              )}
          />

          <Route
          exact
          path={`${this.props.base}/lobbies/:lobbyId`}
          render={() =>(
              <LobbyGuard>
              <Lobby></Lobby>
              </LobbyGuard>)}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies/:lobbyId/game`}
              render={() =>(
                  <GameGuard>
                  <Game></Game>
                  </GameGuard>)}
          />



        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/main`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
