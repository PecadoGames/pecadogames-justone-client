import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Sound from 'react-sound';
import {BackgroundContainer} from "../main/Main";

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

const InputWrapper = styled.input`
    background: #ebd7b9;
    height: 40px;
    width: 80%;
    margin-bottom: 30px;
    margin-left: 5px;
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
    margin-right: 200px;
    margin-bottom: 20px;
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
`;

const Text = styled.body`
    font-size: 24px;
    margin-bottom: 5px;
    background: transparent;
    margin-left: 6px;
    margin-right: 200px;
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

class CreateLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbyName: null,
            amountPlayers: 4,
            voiceChat: true,
        }
        ;
    }

    //this checks if more players can be removed, sets the value and returns the corresponding button
    removePlayers(){
        if (this.state.amountPlayers > 3){
            return <SmallButton
                background={"#b03739"}
                onClick={()=>{
                        let newAmount = this.state.amountPlayers - 1;
                        this.setState({amountPlayers: newAmount})
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
        if (this.state.amountPlayers < 7){
            return <SmallButton
                background={"#5cb349"}
                onClick={()=>{
                    let newAmount = this.state.amountPlayers + 1;
                    this.setState({amountPlayers: newAmount})
                }}
            >+</SmallButton>
        }
        else{
            return <SmallButton
                background={"#88b57f"}
            />
        }
    }

    voiceChatEnable(){
        if (this.state.voiceChat){
            return <SmallButton
                background={"#88b57f"}
                onClick={()=>{
                    this.setState({voiceChat:false})
                }}
            >
                ✓
            </SmallButton>

        }
        else{
            return <SmallButton background={"#5cb349"}>✓</SmallButton>
        }
    }


    voiceChatDisable(){
        if (!this.state.voiceChat) {
            return <SmallButton
                background={"#cc7a7c"}
                onClick={() => {
                    this.setState({voiceChat: true})
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

    createLobby(){
        //TODO: create lobby
    }

    render(){
        return (
            <Background className={"lobbyCreation"}>
                <Paper className={"paperLobby"}>
                    <MenuWrapper>
                        <Title>Create lobby</Title>
                        <Line/>
                        <Text>Lobby Name</Text>
                        <InputWrapper></InputWrapper>
                        <Text>Amount of players</Text>
                            <TextWrapper>
                                {this.removePlayers()}
                                    <Number>{this.state.amountPlayers}</Number>
                                {this.addPlayers()}
                            </TextWrapper>
                        <Text>Voice chat?</Text>
                            <TextWrapper2>
                                {this.voiceChatEnable()}
                                {this.voiceChatDisable()}
                            </TextWrapper2>
                        <ButtonContainer>
                            <Button
                                background={"#e3b268"}
                                backgroundHover={"#e3bc81"}
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