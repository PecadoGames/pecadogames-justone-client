import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../../views/design/Button";
import {api, handleError} from "../../../helpers/api";
import User from "../../shared/models/User";

const Wrapper = styled.div`
    height: 150px;
    width: 100%;
    background-color: #3b3d3b;
    border-radius: 5px;
    border: 2px solid black;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: inline;
    column-count: 3;
`;

const Text = styled.div`
    color: white;
    font-size: 24px;
`;

const SmallContainer = styled.div`
    width: 160px;
    float: left;
    margin-left: 30px;
    height: 60px;
    background-color: #202120;
    border-radius: 5px;
`;

const AdjustableContainer = styled.div`
   margin-left: ${props=> props.marginLeft|| "0px"};
   margin-top: ${props=> props.marginTop|| "0px"};
 
   
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

const Text2 = styled.div`
    color: white;
    font-size: 20px;
    width: 30px;
    padding: 0px;
    float:left;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 4px;
`;

const SubmitButton = styled(Button)`
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

const AddPlayerButton = styled(SmallButton)`
    
    opacity: ${props => (props.disabled ? 1 : 0.8)};
    cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

class EditLobby extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: [],
            maxPlayersAndBots: null,
            sentUpdate: false,
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('lobby', this.props.lobby)
        this.handleInputChange('maxPlayersAndBots', this.props.lobby.maxPlayersAndBots)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.lobby !== state.lobby) {
            return {
                lobby: props.lobby,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    async updateLobby(){
        try {
            this.handleInputChange('sentUpdate', true)
            const requestBody = JSON.stringify({
                maxPlayersAndBots: this.state.maxPlayersAndBots,
                token: localStorage.getItem("token")
            })
            setTimeout(() => {this.handleInputChange('sentUpdate', false)}, 2500);
            await api.put(`/lobbies/${this.state.lobby.lobbyId}`, requestBody);
        }catch (error) {
            alert(`Could not update lobby: \n${handleError(error)}`);
        }
    }

    //returns true if there are more than 3 players and fewer than the max amount of players
    canRemovePlayer(){
        if (this.state.maxPlayersAndBots > this.state.lobby.currentNumPlayersAndBots && this.state.maxPlayersAndBots > 3){
            return true;
        }
        else{return false;}
    }

    removePlayer(){
        if (this.canRemovePlayer()){
            this.handleInputChange('maxPlayersAndBots', this.state.maxPlayersAndBots - 1)
        }
    }

    canAddPlayer(){
        if (this.state.maxPlayersAndBots < 7){
            return true;
        }
        else{return false;}
    }

    addPlayer(){
        if(this.canAddPlayer()){
            this.handleInputChange('maxPlayersAndBots', this.state.maxPlayersAndBots + 1)
        }
    }

    updateLobbyButton(){
        if (!this.state.sentUpdate){
            return (
                <SubmitButton
                    width={"50%"}
                    marginTop={"10px"}
                    onClick={()=>this.updateLobby()}
                >Update Lobby</SubmitButton>)
        }
        else {
            return(
                <SubmitButton
                    width={"50%"}
                    marginTop={"10px"}
                    disabled={"true"}
                    onClick={()=>this.updateLobby()}
                >Updated Lobby!</SubmitButton>
            )
        }
    }

    render(){
        return(
            <Wrapper>
                <Text>Edit Lobby</Text>
                <ButtonContainer>
                    <SmallContainer>
                        <AdjustableContainer
                            marginLeft={"30px"}
                            marginTop={"13px"}
                        >
                            <AddPlayerButton
                                onClick={()=>this.removePlayer()}
                                disabled={!this.canRemovePlayer()}
                                background={"#b03739"}
                            >
                                -
                            </AddPlayerButton>
                                <Text2>
                                    {this.state.lobby.currentNumPlayersAndBots}/{this.state.maxPlayersAndBots}
                                </Text2>
                            <AddPlayerButton
                                onClick={()=>this.addPlayer()}
                                disabled={!this.canAddPlayer()}
                                background={"#5cb349"}
                            >
                                +
                            </AddPlayerButton>
                        </AdjustableContainer>
                    </SmallContainer>
                    <SmallContainer>
                        <AdjustableContainer marginTop={"8px"}>
                        <Button>
                            Invite Friend
                        </Button>
                        </AdjustableContainer>
                    </SmallContainer>
                    <SmallContainer>
                        <AdjustableContainer marginTop={"8px"}>
                        <Button>
                            Add Bot
                        </Button>
                        </AdjustableContainer>
                    </SmallContainer>
                </ButtonContainer>
                <SmallContainer>
                    <AdjustableContainer marginTop={"8px"}>
                        <Button>
                            Kick Bot
                        </Button>
                    </AdjustableContainer>
                </SmallContainer>
                {this.updateLobbyButton()}
            </Wrapper>
        )
    }
}

export default EditLobby;