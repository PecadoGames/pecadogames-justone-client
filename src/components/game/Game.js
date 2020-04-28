import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import Timer from "./assets/Timer";
import GamePicture from "./assets/GamePicture";
import GameInfos from "./assets/GameInfos";


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




class Lobby extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      players: [],
      gameState: null,
      interval: null,
      currentGuesserId: 1,
      lobbyName: '',
      clues: []
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
      this.handleInputChange('currentWord', response.data.currentWord)
      this.handleInputChange('clues', response.data.clues)},500)
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
        || this.state.clues !== nextState.clues){
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
      await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/game/word?token=${localStorage.getItem("token")}`, requestBody)
      this.props.history.push('/game')
    }
    catch(error){
    }
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
            <GameInfos
            players ={this.state.players} lobbyName={this.state.lobbyName}>
            </GameInfos>
            <text>Chat</text>
            <ChatBox></ChatBox>
          </LeftContainer>
          <RightContainer>
            <TopRightContainer>
              <Timer></Timer><text> Score + Round</text>
            </TopRightContainer>
            <BottomRightContainer>
            <GamePicture
                players = {this.state.players}
                gameState = {this.state.gameState}
                pickWordFunction={this.pickWord}
                currentWord={this.state.currentWord}
                currentGuesserId = {this.state.currentGuesserId}
                clues = {this.state.clues}
            >
            </GamePicture>
            </BottomRightContainer>
          </RightContainer>
        </FormContainer>
    )
  }
}
export default withRouter(Lobby);