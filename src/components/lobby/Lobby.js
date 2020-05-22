import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import LobbyInfos from "./assets/LobbyInfos";
import EditLobby from "./assets/EditLobby"
import LobbyInvite from "./assets/LobbyInvite";
import { DeclineButton} from "../profile/Assets/RequestBox";
import { PixelButton } from "../../views/design/PixelButton";

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 768px;
  width: 1200px;
  align-items: flex-start;  
  color: white;
  margin: auto;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 768px;
  width: 800px; `;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 768px;
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
    justify-content: center;
    height: 700px;
    width: 800px;
 `;
 
 const PhoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0px;
    margin-top: 70px;    
    width: 324px;
    height: 560px;
 `;

 export const PhoneScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 480px;
 `;

 export const ScreenHeader = styled.text`
    margin-top: 10px;
    text-align: center;
    color: #c0c0c0;
    font-size: 30px;
    text-decoration: underline;
`;


class Lobby extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null,
            players: [],
            lobbyName: '',
            interval: null,
            hostName: '',
            isEditingLobby: false,
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

        this.getHostName(response.data.hostId);
        let isInList = false;
        for (let a in response.data.playersInLobby){
            if (response.data.playersInLobby[a].id === parseInt(localStorage.getItem('id'))){
                isInList = true;
            }
            if (parseInt(a) === response.data.playersInLobby.length-1 && (isInList === false)){
                localStorage.removeItem('lobbyId');
                this.props.history.push('/game');
            }
        }
        }
        , 700)
    }

    async getHostName(hostId){
        const response = await api.get(`/users/${hostId}?token=${localStorage.getItem('token')}`)
        this.handleInputChange('hostId', response.data.id)
        this.handleInputChange('hostName', response.data.username)
    }

    editLobby=()=>{
        this.setState(prevState => ({
            isEditingLobby: !prevState.isEditingLobby
        }))
    }

    isHost(){
        if (this.state.lobby){
            if (this.state.lobby.hostId.toString() === localStorage.getItem("id")){
                return true;
            }
        return false;
        }
    }

    componentDidMount() {
        this.getLobby()
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }


    render(){
        return(
            <FormContainer>
                <LeftContainer>
                    <LobbyInfos 
                        players={this.state.players} 
                        lobbyName={this.state.lobbyName} 
                        hostId={this.state.hostId}/>
                    <ChatBox className={"chatBox"}/>
                </LeftContainer>
                <RightContainer>
                    <TopRightContainer>
                        {/* {this.editLobby()} */}
                    </TopRightContainer>
                    <BottomRightContainer className = 'lobbyBackground'>
                        <PhoneContainer 
                        className= 'phoneImageLobby'>
                            {!this.state.isEditingLobby ? 
                            <PhoneScreen>
                                    {this.isHost() && 
                                    <PixelButton
                                        width="180px"
                                        onClick={()=>this.startGame()}>
                                            Start Game
                                    </PixelButton>
                                    }
                                {this.isHost() &&
                                    <PixelButton
                                        onClick={()=>this.editLobby()}>
                                            Edit Lobby
                                    </PixelButton>}
                                <DeclineButton
                                    onClick={()=>this.leaveLobby()}>
                                        Leave Lobby
                                </DeclineButton>
                            </PhoneScreen>                                    
                            :
                            <EditLobby
                                lobby={this.state.lobby}
                                isEditingLobby={this.editLobby}/>}
                        </PhoneContainer>
                        {this.state.inviteFriends &&
                        <LobbyInvite/>}
                    </BottomRightContainer>
                </RightContainer>
            </FormContainer>
        )
    }
}
export default withRouter(Lobby);