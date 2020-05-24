import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import InviteLobbyPhone from "./InviteLobbyPhone";
import {ButtonRow} from "../profile/Assets/profileAssets";
import {NavigationButton} from "../lobby/JoinLobby";



const Background = styled.div`
  display: flex;
  height: 768px;
  width: 1200px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const TableContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 768px;
    width: 1179px;
`;

const MenuWrapper = styled.div`
    margin-left: 160px;
    margin-top: 150px;
    width: 410px;
    height: 540px;
`;

const Title = styled.div`
    color: #565553
    font-size: 48px;
    font-weight: medium;
    margin-bottom: 0px;
    margin-left: 0px;
    border-bottom: 2px solid #565553;
    width: 270px;
`;

const Input = styled.input`
    background: transparent;
    border: none;
    color: #565553;
    border-bottom: 2px solid #565553;
    font-size: 22px;    
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justifyContent || "space-between"};
    width: 100%;
    height: 40px;
    margin-top: ${props => props.marginTop || "50px"};
    color: #565553;
`;

const TextWrapper = styled.div`
    background: transparent;
    height: 40px;
    width: 120px;
    margin-bottom: 30px;
    margin-left: 5px;
    display: inline-block;
    float: left;
    column-count: 3;
    padding:2px;
`;

const Text = styled.div`
    font-size: 24px;
    background: transparent;
    color: #565553;
`;

const Number = styled.body`
    font-size: 24px;
    background: transparent;
    margin-left: 6px;
    margin-right: 6px;
    height: 100%
`;

const SmallButton = styled.button`
  padding-top: 0px;
  padding-bottom: 8px;
  width: 25px;
  height: 25px;
  font-size: 18px;
  margin-top: 4px;
  float:left;
  border: 2px solid black;
  background: ${props => props.background|| "white"};
`;

const YesNoButton = styled(SmallButton)`
    color: black;
    margin-left: ${props => props.marginLeft};
    opacity: ${props => (props.disabled ? 1 : 0.4)};
    cursor: ${props => (props.disabled ? "default" : "pointer")}
`;

class CreateLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbyName: null,
            numberOfPlayers: 4,
            voiceChat: false,
            isPrivate: false,
            interval: null,
        };
    }

    //this checks if more players can be removed, sets the value and returns the corresponding button
    removePlayers(){
        if (this.state.numberOfPlayers > 3){
            return <SmallButton
                background={"#b03739"}
                onClick={()=>{
                        let newAmount = this.state.numberOfPlayers - 1;
                        this.setState({numberOfPlayers: newAmount})
                }}
            >-</SmallButton>
        }
        else{
            return <SmallButton
                background={"#cc7a7c"}
            />
        }
    }

    //this checks if more players can be added, sets the value and returns the corresponding button
    addPlayers(){
        if (this.state.numberOfPlayers < 7){
            return <SmallButton
                background={"#5cb349"}
                onClick={()=>{
                    let newAmount = this.state.numberOfPlayers + 1;
                    this.setState({numberOfPlayers: newAmount})
                }}
            >+</SmallButton>
        }
        else{
            return <SmallButton
                background={"#88b57f"}
            />
        }
    }

    //return false if valid lobby name
    checkLobbyName(name){
        if (name){
            if (name.length <= 10 && !name.includes(" ")){
                return false;
            }
            return true;
        }
        else{
            return true;
        }
    }

    enableVoiceChat(){
        if (this.state.voiceChat){
            return <SmallButton
                background={"#88b57f"}

                onClick={()=>{
                    this.setState({voiceChat:true})
                }}
            >
                ✓
            </SmallButton>

        }
        else{
            return <SmallButton background={"#5cb349"}>✓</SmallButton>
        }
    }

    disableVoiceChat(){
        if (this.state.voiceChat) {
            return <SmallButton
                background={"#cc7a7c"}
                onClick={() => {
                    this.setState({voiceChat: false})
                }}
            >
                X
            </SmallButton>
        }
        else{
            return <SmallButton
                background={"#b03739"}
            >X</SmallButton>
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.lobby()
        this.props.changeBottleToOn()

    }

    lobby(){
        let interval = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
        this.setState({'interval': interval})
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
        this.props.changeBottleToOff()
    }

    async createLobby(){
        try {
            const requestBody = JSON.stringify({
                lobbyName: this.state.lobbyName,
                maxPlayersAndBots: this.state.numberOfPlayers,
                hostId: localStorage.getItem("id"),
                hostToken: localStorage.getItem("token"),
                private: this.state.isPrivate,
                voiceChat: this.state.voiceChat
            })
            //posts lobby
            let response = await api.post("lobbies", requestBody);
            let url = response.headers.location
            //gets lobbyId from the location url
            this.lobbyId = url.substring(url.lastIndexOf('/')+1)
            //pushes user to lobby
            localStorage.setItem('lobbyId', this.lobbyId)
            this.props.history.push('/game/lobbies/' + this.lobbyId)
        }
        catch(error){
            alert(`Could not create a lobby. \n${handleError(error)}`)
        }
    }


    render(){
        return (
            <Background className={"lobbyCreation"}>
                <TableContainer className={"paperLobby"}>
                    <MenuWrapper>
                        <Title>Create lobby</Title>
                        <Row
                            marginTop="100px">
                            <Text>Name</Text>
                            <Input
                                placeholder={"Enter name"}
                                onChange={e =>{
                                    this.handleInputChange('lobbyName', e.target.value)
                                }}
                            />
                        </Row>
                        <Row>
                            <Text>Number of players</Text>
                            <TextWrapper>
                                {this.removePlayers()}
                                    <Number>{this.state.numberOfPlayers}</Number>
                                {this.addPlayers()}
                            </TextWrapper>            
                        </Row>
                        <Row>
                            <Text>Private</Text>
                                <TextWrapper>
                                    <YesNoButton
                                        background={"#5cb349"}
                                        disabled={this.state.isPrivate}
                                        onClick={()=>{
                                            this.setState({isPrivate:true})
                                        }}
                                    >
                                        ✓
                                    </YesNoButton>
                                    <YesNoButton
                                        background={"#b03739"}
                                        disabled={!this.state.isPrivate}
                                        marginLeft="44px"
                                        onClick={()=>{
                                            this.setState({isPrivate:false})
                                        }}
                                    >
                                        X
                                    </YesNoButton>
                                </TextWrapper>    
                        </Row>
                        <ButtonRow
                            marginTop="75px">
                            <NavigationButton                                
                                    onClick={()=>{
                                        this.props.history.push(`/game`)
                                }}>
                                    Main Menu
                            </NavigationButton>
                            <NavigationButton
                                disabled={this.checkLobbyName(this.state.lobbyName)}
                                onClick={()=>{
                                    this.createLobby();
                                }}>
                                Create 
                            </NavigationButton>
                        </ButtonRow>
                    </MenuWrapper>
                    <InviteLobbyPhone
                        marginTop="415px"
                        showRules={true}
                        showLogout={true} 
                        history={this.props.history}
                        changePhoneToOff={this.props.changePhoneToOff}
                        changePhoneToOn={this.props.changePhoneToOn}
                        changeTalkingToOff={this.props.changeTalkingToOff}
                        changeTalkingToOn={this.props.changeTalkingToOn}/>
                </TableContainer>
            </Background>
        );
    }}

export default withRouter(CreateLobby);