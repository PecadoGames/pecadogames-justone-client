import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import {InputField} from "../../views/design/InputField";
import {Button} from "../../views/design/Button";
import Timer from "./assets/Timer";

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

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `


class Lobby extends React.Component{
  constructor() {
    super();
    this.state = {
      lobby: null,
      message: '',
      chatMessage: ''
    };
  }

  //needs to be adjusted since you have to logout of the lobby
  async logout() {
    try{
      const requestBody = JSON.stringify({
        userId: localStorage.getItem("id"),
        userToken: localStorage.getItem("token")
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
          userId: localStorage.getItem("id"),
          userToken: localStorage.getItem("token")
        });
        await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/rageQuits`, requestBody)
        localStorage.removeItem("lobbyId")
        this.props.history.push('/game')
    }
    catch(error){

    }
  }

  //request to add Bot
  async addBot(){
    try{


    }
    catch(error){

    }

  }

  //request to add friend
  async invite(){
    try{


    }
    catch(error){

    }}

  async submitMessage(){
    const requestBody = JSON.stringify({
      lobbyId: localStorage.getItem('lobbyId'),
      userId: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      guess: this.state.message,
    })
    await api.put(`lobbies/${localStorage.getItem('lobbyId')}/game/message`,requestBody)
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  async sendMessage(){
    const requestBody = JSON.stringify({
      userId: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      message: this.state.chatMessage,
    })
    await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/chat`, requestBody)

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.state.chatMessage !== nextState.chatMessage || this.state.message !== nextState.message){
      return false;}
    return true;
  }

  componentDidMount() {

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
            <PlayerContainer>
              <br/>
              <text>LobbyName</text>
              <br/>
              <text>Player1____________Ready</text>
              <text>Player2____________Ready</text>
              <text>Player3____________Ready</text>
              <text>Player4____________Ready</text>
              <text>Player5____________Ready</text>
              <text>Player6____________Ready</text>
              <text>Player7____________Ready</text>
            </PlayerContainer>
            <br></br>
            <text>Enter Glue or guess</text>
            <InputField
                placeholder="clue.."
                width="30%"
                onChange={e => {
                  this.handleInputChange('message', e.target.value);
                }}>
            </InputField>
            <Button
            onClick={()=>this.submitMessage}>Submit</Button>
            <br/>
            <text>Chat</text>
            <ChatBox></ChatBox>
            <InputField
                placeholder="talk.."
                width="30%"
                onChange={e => {
                  this.handleInputChange('chatMessage', e.target.value);
                }}>
            </InputField>
            <Button
             onClick={()=>this.sendMessage()}>Send</Button>
          </LeftContainer>

          <RightContainer>
            <TopRightContainer>
              <Timer></Timer><text> Score + Round</text>
            </TopRightContainer>
            <BottomRightContainer className = 'lobbyBackground'>
            </BottomRightContainer>
          </RightContainer>

        </FormContainer>
    )
  }
}
export default withRouter(Lobby);