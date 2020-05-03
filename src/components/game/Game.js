import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import Timer from "./GameInfos/Timer";
import Round from "./GameInfos/Round";
import Score from "./GameInfos/Score";
import Picture from "./GameInfos/Picture";
import Infos from "./GameInfos/Infos";
import PickWordState from "./States/PickWordState";
import EnterGuessState from "./States/EnterGuessState";
import EnterCluesState from "./States/EnterCluesState";
import VoteOnClueState from "./States/VoteOnClueState";
import TransitionState from "./States/TransitionState";
import EndGameState from "./States/EndGameState";


const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 800px;
  width: 1200px;
  align-items: flex-start; 
  color: white;
  margin: auto;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 800px;
  width: 800px; `;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 800px;
  width: 400px
 `
const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 100px;
  width: 800px;
  
 `
const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 700px;
  width: 800px
 `
const InsideContainer = styled.div`
  position: absolute
  height: 700px;
  width: 800px
 `




class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      players: [],
      gameState: null,
      interval: null,
      currentGuesserId: 1,
      lobbyName: '',
      clues: [],
      specialGame: false,
      isGuessCorrect: null
    };
  }

  //needs to be adjusted since you have to logout of the lobby
  async logout() {
    try{
      const requestBody = JSON.stringify({
        playerId: localStorage.getItem("id"),
        playerToken: localStorage.getItem("token")
      });
      await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/rageQuits`, requestBody)
      localStorage.removeItem("lobbyId")
      this.props.history.push('/game')

    }
    catch(error){
    }
    try{
      const requestBody = JSON.stringify({
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token")
      });
      await api.put('/logout', requestBody);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.props.history.push('/login');
    }
    catch(error){
      alert(`Something went wrong during the logout \n${handleError(error)}`)
    }
  }

  //leave the Lobby before start
  async leaveLobby(){
    try{
        const requestBody = JSON.stringify({
          playerId: localStorage.getItem("id"),
          playerToken: localStorage.getItem("token")
        });
        await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/rageQuits`, requestBody)
        localStorage.removeItem("lobbyId")
        this.props.history.push('/game')
    }
    catch(error){
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  //gets Game half a second
  async getGame(){
    try{
      this.state.interval = setInterval(async ()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game?token=${localStorage.getItem('token')}`);
      this.handleInputChange('game' ,response.data);
      this.handleInputChange('currentGuesserId', response.data.currentGuesser.id);
      this.handleInputChange('gameState', response.data.gameState);
      this.handleInputChange('players', response.data.players);
      this.handleInputChange('lobbyName', response.data.lobbyName);
      this.handleInputChange('currentWord', response.data.currentWord);
      this.handleInputChange('clues', response.data.cluesAsString);
      this.handleInputChange('specialGame', response.data.specialGame);
      this.handleInputChange('isGuessCorrect', response.data.guessCorrect);
      this.handleInputChange('score', response.data.overallScore);
      this.handleInputChange('rounds', response.data.roundsPlayed)},200)
    }
    catch(error){
    }
  }

  //needs to clear interval when unmount or it keeps calling
  componentWillUnmount() {
    clearInterval(this.state.interval)
  }


  //does not rerender when its fetches game data
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.state.currentGuesserId !== nextState.currentGuesserId || this.state.game !== nextState.game
        || this.state.gameState !== nextState.gameState || this.state.players !== nextState.players
        || this.state.interval !== nextState.interval || this.state.lobbyName !== nextState.lobbyName
        || this.state.clues !== nextState.clues || this.state.specialGame !== nextState.specialGame
        || this.state.currentWord !== nextState.currentWord || this.state.isGuessCorrect !== nextState.isGuessCorrect
        || this.state.rounds !== nextState.rounds || this.state.score !== nextState.score){
      return false;}
    return true;
  }

  componentDidMount() {
    this.getGame()
  }

  async pickWord(number){
    try{
      const requestBody = JSON.stringify({
        number: number,
      });
      await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game/word?token=${localStorage.getItem("token")}`, requestBody)
      this.props.history.push('/game')
    }
    catch(error){
    }
  }


  displayPickWordState(){
    //returns true if gamestate is PICKWORDSTATE and the user is the guesser
    if (this.state.gameState) {
      let state1 = this.state.gameState
      let state2 = "PICKWORDSTATE"
      if (state1 === state2){
        return true
      }
      else {return false}
    }
    else{return false}
  }


  displayVoteOnClueState(){
    if (this.state.gameState) {
      let state1 = this.state.gameState
      let state2 = "VOTEONCLUESSTATE"
      if (state1 === state2){
        return true
      }
      else {return false}
    }
    else{return false}

  }

  displayEnterCluesState(){
    if (this.state.gameState) {
      let state1 = this.state.gameState
      let state2 = "ENTERCLUESSTATE"
      if (state1 === state2){
        return true
      }
      else {return false}
    }
    else{return false}

  }

  displayEndGameState(){
    if (this.state.gameState) {
      let state1 = this.state.gameState
      let state2 = "ENDGAMESTATE"
      if (state1 === state2){
        return true
      }
      else {return false}
    }
    else{return false}

  }

  displayEnterGuessState(){
    if (this.state.gameState) {
      let state1 = this.state.gameState
      let state2 = "ENTERGUESSSTATE"
      if (state1 === state2){
        return true
      }
      else {return false}
    }
    else{return false}
  }

  displayTransitionState(){
    if (this.state.gameState) {
      let state1 = this.state.gameState
      let state2 = "TRANSITIONSTATE"
      if (state1 === state2){
        return true
      }
      else {return false}
    }
    else{return false}
  }


  render(){
    return(
        <FormContainer>

          <LeftContainer>
            <LogoutButton
                onClick={()=>this.logout()}>Logout
            </LogoutButton>
            <LogoutButton
                onClick={()=>this.leaveLobby()}>Leave
            </LogoutButton>
            <Infos
            players ={this.state.players} lobbyName={this.state.lobbyName}>
            </Infos>
            <text>Chat</text>
            <ChatBox></ChatBox>
          </LeftContainer>
          <RightContainer>
            <TopRightContainer>
              <Timer></Timer>
              <Score score = {this.state.score}></Score>
              <Round rounds = {this.state.rounds}></Round>
            </TopRightContainer>
            <BottomRightContainer>
            <Picture
                players = {this.state.players}
                gameState = {this.state.gameState}
                currentGuesserId = {this.state.currentGuesserId}
            >
            </Picture>
              <InsideContainer>
                {this.displayPickWordState() ? <PickWordState pickWordFunction={this.pickWord} currentGuesserId = {this.state.currentGuesserId}/>:null}
                {this.displayEnterCluesState() ? <EnterCluesState currentWord = {this.state.currentWord} specialGame = {this.state.specialGame} currentGuesserId = {this.state.currentGuesserId}/>:null}
                {this.displayVoteOnClueState() ? <VoteOnClueState currentGuesserId = {this.state.currentGuesserId} clues={this.state.clues}/> : null}
                {this.displayEnterGuessState() ? <EnterGuessState  currentGuesserId = {this.state.currentGuesserId} clues={this.state.clues}/>: null}
                {this.displayTransitionState()? <TransitionState currentWord = {this.state.currentWord} currentGuesserId = {this.state.currentGuesserId} players = {this.state.players} isGuessCorrect = {this.state.isGuessCorrect}/>: null}
                {this.displayEndGameState() ? <EndGameState players = {this.state.players}/> : null}
              </InsideContainer>
            </BottomRightContainer>
          </RightContainer>
        </FormContainer>
    )
  }
}
export default withRouter(Game);