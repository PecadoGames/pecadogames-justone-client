import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import LobbyInfos from "./assets/LobbyInfos";
import EditLobby from "./assets/EditLobby"
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
    justify-content: space-around;
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

const ScreenOffline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 250px;
  width: 300px
 `
const Screen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
  margin-top: -250px;
 `

const TvButtonTop = styled.button`
  height: 45px;
  width: 45px
  position: absolute
  margin-left: 347px;
  margin-top: 147px
  background: none;
  border:none;
 `

const Counter = styled.div`
  color: #32CD32;
  font-size: 20px;
  margin-top: 36px;
  margin-left: 262px
 `

const TvButtonBottom = styled.button`
  height: 45px;
  width: 45px
  position: absolute
  margin-left:347px;
  margin-top: 199px;
  background: none;
  border:none;
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
            isEditingLobby: false,
            hostId: null,
            counter: 0,
            tv: 'tvOffline'
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
        if(this.state.players.length <3){
            alert('You have to be at least 3 players/bots to start the game')
        }
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
        const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}?token=${localStorage.getItem('token')}`);
        this.setState({'lobby': response.data});
        this.setState({'players':response.data.playersInLobby});
        this.setState({'lobbyName': response.data.lobbyName});
        this.setState({'hostId': response.data.hostId});
        if(response.data.gameStarted === true){
            localStorage.setItem('gameId', response.data.lobbyId)
            this.props.history.push(window.location.pathname +'/game')
        }
        if (response.data.hostId !== this.state.hostId){
            this.getHostName(response.data.hostId);
        }
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

    async componentDidMount() {
        this.props.changeTvToOn()
        const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}?token=${localStorage.getItem('token')}`);
        this.setState({'lobby': response.data});
        this.setState({'players':response.data.playersInLobby});
        this.setState({'lobbyName': response.data.lobbyName});
        this.setState({'hostId': response.data.hostId});
        if(response.data.gameStarted === true){
            localStorage.setItem('gameId', response.data.lobbyId)
            this.props.history.push('/game')
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
        let interval = setInterval(async()=>{
        this.getLobby()
        }
        , 500)
        this.handleInputChange('interval', interval)
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
        this.props.changeTvToOff()
    }

    switchUp(){
        let x = this.state.counter + 1
        //normal case
        if (x <= 5){
            this.handleInputChange('tv', 'tvChannel' + x);
            this.handleInputChange('counter', x)
            this.props.changeTvToOff()
        }
        //overflow
        else{
            this.handleInputChange('tv', 'tvOffline');
            this.handleInputChange('counter', 0)
            this.props.changeTvToOn()
        }
    }


    switchDown(){
        let x = this.state.counter - 1
        //overflow
        if(x < 0){
            this.handleInputChange('tv', 'tvChannel5');
            this.handleInputChange('counter', 5)
            this.props.changeTvToOff()
        }
        //null case
        else if (x === 0){
            this.handleInputChange('tv', 'tvOffline');
            this.handleInputChange('counter', 0)
            this.props.changeTvToOn()
        }
        //normal case
        else{
            this.handleInputChange('tv', 'tvChannel' + x);
            this.handleInputChange('counter', x)
            this.props.changeTvToOff()
        }
    }

    render(){
        return(
            <FormContainer>
                <LeftContainer>
                    <ScreenOffline className={this.state.tv}/>
                    <Screen className='tv'>
                        <Counter>0{this.state.counter}</Counter>
                    </Screen>
                    <TvButtonTop
                        onClick={()=>this.switchUp()}>
                    </TvButtonTop>
                    <TvButtonBottom
                        onClick={()=>this.switchDown()}>
                    </TvButtonBottom>
                    <ChatBox className={"chatBox"}/>
                </LeftContainer>
                <RightContainer>
                    <TopRightContainer>
                    </TopRightContainer>
                    <BottomRightContainer className = 'lobbyBackground'>
                        <PhoneContainer 
                        className= 'phoneImageLobby'>
                            {!this.state.isEditingLobby ? 
                            <PhoneScreen>
                                <LobbyInfos
                                lobby={this.state.lobby}
                                players={this.state.players} 
                                lobbyName={this.state.lobbyName} 
                                hostId={this.state.hostId}/>
                                    {this.isHost() &&
                                    <PixelButton
                                        marginTop="1px"
                                        height="47px"
                                        width="180px"
                                        onClick={()=>this.startGame()}>
                                            Start Game
                                    </PixelButton>
                                    }
                                {this.isHost() &&
                                    <PixelButton
                                        marginTop="1px"
                                        onClick={()=>this.editLobby()}>
                                            Edit Lobby
                                    </PixelButton>}
                                <DeclineButton
                                    marginTop="1px"
                                    onClick={()=>this.leaveLobby()}>
                                        Leave Lobby
                                </DeclineButton>
                            </PhoneScreen>
                            :
                            <EditLobby
                                lobby={this.state.lobby}
                                isEditingLobby={this.editLobby}/>}
                        </PhoneContainer>
                    </BottomRightContainer>
                </RightContainer>
            </FormContainer>
        )
    }
}
export default withRouter(Lobby);