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
import FlipNewspaper from "../../lobby/assets/FlipNewspaper.mp3";
import Sound from "react-sound";
import PhoneRing from "../../lobby/assets/Digital Ringing.mp3"
import Shyguy from "../../lobby/assets/Shyguy talking.mp3"
import Rules from "../../Rules/Rules";
import Bottle from "../../../Music/SoundEffects/Bottle.mp3"
import Ice from "../../../Music/SoundEffects/Ice.mp3"
import Arcade from "../../../Music/SoundEffects/ArcadeSound.mp3"
import tv from "../../../Music/SoundEffects/TV.mp3"


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


class GameRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            flip: Sound.status.STOPPED,
            phoneRing: Sound.status.STOPPED,
            talking: Sound.status.STOPPED,
            bottle: Sound.status.STOPPED,
            arcade: Sound.status.STOPPED,
            tv: Sound.status.STOPPED

        }
    }

    changeArcadeToOn=()=>{
        this.setState({ arcade: Sound.status.PLAYING });
    }
    changeArcadeToOff=()=>{
        this.setState({ arcade: Sound.status.STOPPED });
    }
    changeBottleToOn=()=>{
        this.setState({ bottle: Sound.status.PLAYING });
    }
    changeBottleToOff=()=>{
        this.setState({ bottle: Sound.status.STOPPED });
    }
    changeFlipToOn=()=>{
        this.setState({ flip: Sound.status.PLAYING });
    }
    changeFlipToOff=()=>{
        this.setState({ flip: Sound.status.STOPPED });
    }
    changePhoneToOff=()=>{
        this.setState({ phoneRing: Sound.status.STOPPED });
    }
    changePhoneToOn=()=>{
        this.setState({ phoneRing: Sound.status.PLAYING });
    }
    changeTalkingToOff=()=>{
        this.setState({ talking: Sound.status.STOPPED });
    }
    changeTalkingToOn=()=>{
        this.setState({ talking: Sound.status.PLAYING });
    }
    changeTvToOff=()=>{
        this.setState({ tv: Sound.status.STOPPED });
    }
    changeTvToOn=()=>{
        this.setState({ tv: Sound.status.PLAYING });
    }


    render() {
    /**
     * "this.props.base" is "/game" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
          {/* Sound effects for Game */}
          <Sound url={Arcade}
                 playStatus={this.state.arcade}
                 volume={15}
                 playFromPosition={0}
          />
          <Sound url={FlipNewspaper}
                 playStatus={this.state.flip}
                 volume={15}
                 playFromPosition={0}
          />
          <Sound url={PhoneRing}
                 playStatus={this.state.phoneRing}
                 volume={7}
                 loop={true}
                 playFromPosition={0}
          />
          <Sound url={Shyguy}
                 playStatus={this.state.talking}
                 volume={40}
                 playFromPosition={15000}
          />
          <Sound url={Bottle}
                 playStatus={this.state.bottle}
                 volume={20}
                 playFromPosition={0}
          />
          <Sound url={Ice}
                 playStatus={this.state.bottle}
                 volume={40}
                 playFromPosition={0}
          />
          <Sound url={tv}
                 playStatus={this.state.tv}
                 volume={2}
                 loop={true}
                 playFromPosition={0}
          />



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
              <Main changeMusicToNormal={this.props.changeMusicToNormal}
                    changePhoneToOff={this.changePhoneToOff}
                    changePhoneToOn={this.changePhoneToOn}
                    changeTalkingToOff={this.changeTalkingToOff}
                    changeTalkingToOn={this.changeTalkingToOn}/>
              </LoggedInUser>
          )}
        />

        <Route
            exact
            path={`${this.props.base}/rules`}
            render={() => (
                <LoggedInUser>
                    <Rules changeMusicToNormal={this.props.changeMusicToNormal}
                          changePhoneToOff={this.changePhoneToOff}
                          changePhoneToOn={this.changePhoneToOn}
                          changeTalkingToOff={this.changeTalkingToOff}
                          changeTalkingToOn={this.changeTalkingToOn}
                           changeArcadeToOn={this.changeArcadeToOn}
                           changeArcadeToOff={this.changeArcadeToOff}/>
                </LoggedInUser>
            )}
        />

          <Route
              exact
              path={`${this.props.base}/users/:id`}
              render={() => (
                  <LoggedInUser>
                    <Profile changeMusicToNormal={this.props.changeMusicToNormal}
                             changePhoneToOff={this.changePhoneToOff}
                             changePhoneToOn={this.changePhoneToOn}
                             changeTalkingToOff={this.changeTalkingToOff}
                             changeTalkingToOn={this.changeTalkingToOn}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies`}
              render={() => (
                  <LoggedInUser>
                  <JoinLobby changeMusicToNormal={this.props.changeMusicToNormal}
                             flipOn={this.changeFlipToOn}
                             flipOff={this.changeFlipToOff}
                             changePhoneToOff={this.changePhoneToOff}
                             changePhoneToOn={this.changePhoneToOn}
                             changeTalkingToOff={this.changeTalkingToOff}
                             changeTalkingToOn={this.changeTalkingToOn}/>
                  </LoggedInUser>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/edit`}
              render={() => (
                  <LoggedInUser>
                      <Edit changeMusicToNormal={this.props.changeMusicToNormal}
                            stopNoise={this.props.stopNoise}
                            changePhoneToOff={this.changePhoneToOff}
                            changePhoneToOn={this.changePhoneToOn}
                            changeTalkingToOff={this.changeTalkingToOff}
                            changeTalkingToOn={this.changeTalkingToOn}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/users/:id/requests`}
              render={() => (
                  <LoggedInUser>
                  <Requests changeMusicToNormal={this.props.changeMusicToNormal}
                            stopNoise={this.props.stopNoise}
                            changePhoneToOff={this.changePhoneToOff}
                            changePhoneToOn={this.changePhoneToOn}
                            changeTalkingToOff={this.changeTalkingToOff}
                            changeTalkingToOn={this.changeTalkingToOn}/>
                  </LoggedInUser>
              )}
              />
          <Route
              exact
              path={`${this.props.base}/users/:id/friends`}
              render={() => (
                  <LoggedInUser>
                  <Friends changeMusicToNormal={this.props.changeMusicToNormal}
                           stopNoise={this.props.stopNoise}
                           changePhoneToOff={this.changePhoneToOff}
                           changePhoneToOn={this.changePhoneToOn}
                           changeTalkingToOff={this.changeTalkingToOff}
                           changeTalkingToOn={this.changeTalkingToOn}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/createLobby`}
              render={() => (
                  <LoggedInUser>
                      <CreateLobby changeMusicToNormal={this.props.changeMusicToNormal}
                                   stopNoise={this.props.stopNoise}
                                   changePhoneToOff={this.changePhoneToOff}
                                   changePhoneToOn={this.changePhoneToOn}
                                   changeTalkingToOff={this.changeTalkingToOff}
                                   changeTalkingToOn={this.changeTalkingToOn}
                                   changeBottleToOn={this.changeBottleToOn}
                                   changeBottleToOff={this.changeBottleToOff}/>
                  </LoggedInUser>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/scoreboard`}
              render={() => (
                  <LoggedInUser>
                      <Scoreboard changeMusicToNormal={this.props.changeMusicToNormal}
                                  stopNoise={this.props.stopNoise}
                                  changePhoneToOff={this.changePhoneToOff}
                                  changePhoneToOn={this.changePhoneToOn}
                                  changeTalkingToOff={this.changeTalkingToOff}
                                  changeTalkingToOn={this.changeTalkingToOn}/>
                  </LoggedInUser>
              )}
          />

          <Route
          exact
          path={`${this.props.base}/lobbies/:lobbyId`}
          render={() =>(
              <LobbyGuard>
              <Lobby changeTvToOff={this.changeTvToOff} changeTvToOn={this.changeTvToOn}>
              </Lobby>
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
