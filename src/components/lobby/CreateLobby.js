import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";

const MenuWrapper = styled.div`
    margin-left: 160px;
    margin-top: 150px;
    width: 400px;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 860px;
  width: 1290px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const Paper = styled.div`
    height: 900px;
    width: 900px;
    margin-left: 0px;
    flex-direction: column;
    align-items: flex-start;  
`;

const Title = styled.div`
    font-size:48px;
    font-weight:bold;
    margin-bottom: 0px;
    margin-left: 0px;
`;

const Input = styled.input`
    background: #ebd7b9;
    height: 40px;
    width: 80%;
    margin-bottom: 30px;
    margin-left: 5px;
    padding-left: 5px;
    border: none;
    border-bottom: 2px solid black;
    font-size: 20px;
    
`;

const TextWrapper = styled.div`
    background: #ebd7b9;
    height: 40px;
    width: 120px;
    margin-bottom: 30px;
    margin-left: 5px;
    display: inline-block;
    float: left;
    column-count: 3;
    padding:2px;
`;

const TextWrapper2 = styled(TextWrapper)`
    column-count: 2;
    width: 80px;
    margin-bottom: 20px;
    margin-right: 20px;
`;

const InputWrapper = styled.div`
   column-count:2;
   width: 400px;
`;

const ButtonContainer = styled.div`
    width: 300px;
`;
const Button = styled.button`
  padding-top: 0px;
  width: 200px;
  height: 40px;
  font-size: 28px;
  margin-top: 4px;
  border: 2px solid black;
  background: ${props => props.background|| "white"};
  &:hover {
    background: ${props => props.backgroundHover || "white"}
  }
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

const Text = styled.body`
    font-size: 24px;
    margin-bottom: 5px;
    background: transparent;
    margin-left: 6px;
    float:left;
`;

const Number = styled.body`
    font-size: 24px;
    background: transparent;
    margin-left: 6px;
    margin-right: 6px;
    height: 100%
`;
const Line = styled.hr`
  border: 2px solid black;
  width: 80%;
  margin-left: 0px;
  margin-bottom: 5px;
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
    opacity: ${props => (props.disabled ? 1 : 0.4)};
    cursor: ${props => (props.disabled ? "default" : "pointer")}
`;

class CreateLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbyName: null,
            numberOfPlayers: 4,
            voiceChat: true,
            isPrivate:false,
        }
        ;
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

    async createLobby(){
        try {
            const requestBody = JSON.stringify({
                lobbyName: this.state.lobbyName,
                numberOfPlayers: this.state.numberOfPlayers,
                userId: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                isPrivate: this.state.isPrivate,
                voiceChat: this.state.voiceChat
            })
            //posts lobby
            let response = await api.post("lobbies", requestBody);
            let url = response.headers.location
            //gets lobbyId from the location url
            this.state.lobbyId = url.substring(url.lastIndexOf('/')+1)
            //pushes user to lobby

            this.props.history.push('/game/lobbies/' + this.state.lobbyId)
        }
        catch(error){
            alert(`Could not create a lobby. \n${handleError(error)}`)
        }
    }


    render(){
        return (
            <Background className={"lobbyCreation"}>
                <Paper className={"paperLobby"}>
                    <MenuWrapper>
                        <Title>Create lobby</Title>
                        <Line/>
                        <Text>Lobby Name</Text>
                        <Input
                            placeholder={"Enter here..."}
                            onChange={e =>{
                                this.handleInputChange('lobbyName', e.target.value)
                            }}
                        />
                        <Text>Enter number of players:     </Text>
                            <TextWrapper>
                                {this.removePlayers()}
                                    <Number>{this.state.numberOfPlayers}</Number>
                                {this.addPlayers()}
                            </TextWrapper>

                        <InputWrapper>
                        <div>
                            <Text>Private lobby?</Text>
                                <TextWrapper2>
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
                                        onClick={()=>{
                                            this.setState({isPrivate:false})
                                        }}
                                    >
                                        X
                                    </YesNoButton>
                                </TextWrapper2>
                        </div>
                        <div>
                            <Text>Voice chat??</Text>
                            <TextWrapper2>
                                <YesNoButton
                                    background={"#5cb349"}
                                    disabled={this.state.voiceChat}
                                    onClick={()=>{
                                        this.setState({voiceChat:true})
                                    }}
                                >
                                    ✓
                                </YesNoButton>
                                <YesNoButton
                                    background={"#b03739"}
                                    disabled={!this.state.voiceChat}
                                    onClick={()=>{
                                        this.setState({voiceChat:false})
                                    }}
                                >
                                    X
                                </YesNoButton>
                            </TextWrapper2>
                        </div>
                        </InputWrapper>
                        <ButtonContainer>
                            <Button
                                background={"#e3b268"}
                                backgroundHover={"#e3bc81"}
                                disabled={!this.state.lobbyName}
                                onClick={()=>{
                                    this.createLobby();
                                }}
                            >Create Lobby</Button>
                            <Button
                                background={"#c9c3bb"}
                                backgroundHover={"#d6d3d0"}
                                onClick={()=>{
                                    this.props.history.push(`/game`)
                                }}
                            >Back</Button>
                        </ButtonContainer>
                    </MenuWrapper>
                </Paper>
            </Background>
        );
    }}

export default withRouter(CreateLobby);