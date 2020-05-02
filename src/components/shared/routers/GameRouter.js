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
import {LoggedInGuard} from "../routeProtectors/LoggedInGuard";
import {InLobbyGuard} from "../routeProtectors/InLobbyGuard";
import {InGameGuard} from "../routeProtectors/InGameGuard";


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
          render={() => (
              <LoggedInGuard>
              <Main changeMusicToNormal={this.props.changeMusicToNormal} />
              </LoggedInGuard>
          )}
        />

          <Route
              exact
              path={`${this.props.base}/users/:id`}
              render={() => (
                  <LoggedInGuard>
                    <Profile changeMusicToNormal={this.props.changeMusicToNormal} />
                  </LoggedInGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies`}
              render={() => (
                  <LoggedInGuard>
                  <JoinLobby changeMusicToNormal={this.props.changeMusicToNormal} />
                  </LoggedInGuard>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/edit`}
              render={() => (
                  <LoggedInGuard>
                      <Edit changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/users/:id/requests`}
              render={() => (
                  <LoggedInGuard>
                  <Requests changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInGuard>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/friends`}
              render={() => (
                  <LoggedInGuard>
                  <Friends changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/createLobby`}
              render={() => (
                  <LoggedInGuard>
                      <CreateLobby changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/scoreboard`}
              render={() => (
                  <LoggedInGuard>
                      <Scoreboard changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </LoggedInGuard>
              )}
          />

          <Route
          exact
          path={`${this.props.base}/lobbies/:lobbyId`}
          render={() =>(
              <InLobbyGuard>
              <Lobby></Lobby>
              </InLobbyGuard>)}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies/:lobbyId/game`}
              render={() =>(
                  <InGameGuard>
                  <Game></Game>
                  </InGameGuard>)}
          />


          {/* This is just for looking at the state purpose */}
          <Route
              exact
              path={`${this.props.base}/lobbies/:lobbyId/States`}
              render={() =>(<GameTest/>)}
             />
          {/* Ends here */}



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
