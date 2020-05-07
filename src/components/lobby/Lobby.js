import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import LobbyInfos from "./assets/LobbyInfos";
import {Button} from "../../views/design/Button";
import EditLobby from "./assets/EditLobby"
import LobbyInvite from "./assets/LobbyInvite";

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
  height: 150px;
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
  height: 400px;
  width: 400px
 `


class Lobby extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null,
            players: [],
            lobbyName: '',
            interval: null,
            hostName: '',
            inviteFriends: false,
            hostId: null
        };
    }

    //needs to be adjusted since you have to logout of the lobby
    async logout() {
        try{
            const requestBody1 = JSON.stringify({
                playerId: localStorage.getItem("id"),
                playerToken: localStorage.getItem("token")
            });
            await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/rageQuits`, requestBody1)

            localStorage.removeItem('lobbyId')

            const requestBody2 = JSON.stringify({
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token")
            });
            await api.put('/logout', requestBody2);

            localStorage.removeItem("token");
            localStorage.removeItem("id");
        }
        catch(error){
            alert(`Something went wrong during the logout \n${handleError(error)}`)
        }
        this.props.history.push('/login');
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

        }
        catch(error){

        }

        this.props.history.push(`/game/main`)
    }


    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }





    //starts the game
    async startGame(){
        try{
            const requestBody = JSON.stringify({
                hostId: localStorage.getItem("id"),
                hostToken: localStorage.getItem("token")
            });
            await api.post(`/lobbies/${localStorage.getItem('lobbyId')}`, requestBody)
            localStorage.setItem('gameId', localStorage.getItem('lobbyId'))

        }
        catch(error){

        }
    }

    async getLobby(){
        this.state.interval = setInterval(async()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}?token=${localStorage.getItem('token')}`);
        this.setState({['lobby']: response.data});
            this.setState({['players']:response.data.playersInLobby});
            this.setState({['lobbyName']: response.data.lobbyName});
            this.setState({['hostId']: response.data.hostId});
            if(response.data.gameStarted === true){
                localStorage.setItem('gameId', response.data.lobbyId)
                this.props.history.push(window.location.pathname +'/game')
            }
            this.getHostName(response.data.hostId)
                let isInList = false
                for (let a in this.state.lobbies){
                    if (this.state.lobbies[a].id === parseInt(localStorage.getItem('id'))){
                        isInList = true
                    }
                }
                if (isInList === false){
                    localStorage.removeItem(this.lobbyId)
                    this.props.history.push('/game')
                }
        }
        , 400)

    }

    async getHostName(hostId){
        const response = await api.get(`/users/${hostId}?token=${localStorage.getItem('token')}`)
        this.handleInputChange('hostName', response.data.username)
    }

    editLobby(){
        if (this.state.lobby){
            if (this.state.lobby.hostId.toString() === localStorage.getItem("id")){
                return <EditLobby
                        lobby={this.state.lobby} toggleInviteFriends={this.toggleInviteFriends}
                />
            }

        }
    }

    isHost(){
        if (this.state.lobby){
            if (this.state.lobby.hostId.toString() === localStorage.getItem("id")){
                return true;
            }
        return false;
        }
    }

    toggleInviteFriends=()=>{
        this.setState(prevState => ({
        inviteFriends: !prevState.inviteFriends
      }));}


    componentDidMount() {
        this.getLobby()
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }
    //this block is for closing tab
    //doSomethingBeforeUnload = () => {
      //  const requestBody2 = JSON.stringify({
        //    id: localStorage.getItem("id"),
          //  token: localStorage.getItem("token")
       // });
        //api.put('/logout', requestBody2);
     //   localStorage.removeItem('token');
     //   localStorage.removeItem('id');
    //}

    //setupBeforeUnloadListener = () => {
      //  window.addEventListener("beforeunload", (ev) => {
        //    ev.preventDefault();
         //   return this.doSomethingBeforeUnload();
      //  });
   // }
    //block ends here


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
                    <text>Host: {this.state.lobby ? this.state.hostName : null}</text>
                    <PlayerContainer>
                        <LobbyInfos players={this.state.players} lobbyName={this.state.lobbyName} hostId={this.state.hostId}/>
                    </PlayerContainer>
                    {this.isHost() ? <Button
                        onClick={()=>this.startGame()}>Start Game
                        </Button> :  null}
                    <text>Chat</text>
                    <ChatBox></ChatBox>
                </LeftContainer>
                <RightContainer>
                    <TopRightContainer>
                        {this.editLobby()}
                    </TopRightContainer>
                    <BottomRightContainer className = 'lobbyBackground'>
                        {this.state.inviteFriends &&
                        <LobbyInvite/>}
                    </BottomRightContainer>
                </RightContainer>

            </FormContainer>
        )
    }
}
export default withRouter(Lobby);