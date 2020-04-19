import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import {InputField} from "../../views/design/InputField";
import {Button} from "../../views/design/Button";

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
      lobby: null
    };
  }

  //needs to be adjusted since you have to logout of the lobby
  async logout() {
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


  componentDidMount() {
    //getLobby
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
            <text>Enter Glue Or Hint</text>
            <InputField>
            </InputField>
            <Button>Submit</Button>
            <br/>
            <text>Chat</text>
            <ChatBox></ChatBox>
            <InputField>
            </InputField>
          </LeftContainer>

          <RightContainer>
            <TopRightContainer>
              <text>Timer + Score + Round</text>
            </TopRightContainer>
            <BottomRightContainer className = 'lobbyBackground'>
            </BottomRightContainer>
          </RightContainer>

        </FormContainer>
    )
  }
}
export default withRouter(Lobby);