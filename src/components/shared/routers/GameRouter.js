import React from "react";
import styled from "styled-components";
import { Redirect, Route  } from "react-router-dom";
import Profile from "../../profile/Profile";
import {ProfileGuard} from "../routeProtectors/ProfileGuard";
import Main from "../../main/Main";
import JoinLobby from "../../lobby/JoinLobby";
import {JoinLobbyGuard} from "../routeProtectors/JoinLobbyGuard"
import CreateLobby from "../../lobby/CreateLobby";
import Lobby from "../../lobby/Lobby";
import {EditGuard} from "../routeProtectors/EditGuard"
import Edit from "../../profile/Edit";
import {GameGuard} from "../routeProtectors/GameGuard";
import Requests from "../../profile/Requests";
import Scoreboard from "../../scoreboard/Scoreboard.js"
import Game from "../../game/Game"
import Friends from "../../profile/Friends";


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
        <Route
          exact
          path={`${this.props.base}/main`}
          render={() => <Main changeMusicToNormal={this.props.changeMusicToNormal} />}
        />

          <Route
              exact
              path={`${this.props.base}/users/:id`}
              render={() => (
                  <ProfileGuard>
                    <Profile changeMusicToNormal={this.props.changeMusicToNormal} />
                  </ProfileGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies`}
              render={() => (
                  <JoinLobbyGuard>
                  <JoinLobby changeMusicToNormal={this.props.changeMusicToNormal} />
                  </JoinLobbyGuard>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/edit`}
              render={() => (
                  <EditGuard>
                      <Edit changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </EditGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/users/:id/requests`}
              render={() => (
                  <Requests changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/friends`}
              render={() => (
                  <Friends changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/createLobby`}
              render={() => (
                  <GameGuard>
                      <CreateLobby changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </GameGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/scoreboard`}
              render={() => (
                  <GameGuard>
                      <Scoreboard changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </GameGuard>
              )}
          />

          <Route
          exact
          path={`${this.props.base}/lobbies/:lobbyId`}
          render={() =>(<Lobby></Lobby>)}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies/:lobbyId/game`}
              render={() =>(<Game></Game>)}
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
