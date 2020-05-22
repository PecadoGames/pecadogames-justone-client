import styled from "styled-components";
import React from "react";
import {PixelButton} from "../../../views/design/PixelButton";
import { AcceptButton, DeclineButton} from "../../profile/Assets/RequestBox";
import {PhoneScreen} from "../Lobby";
import LobbyInvite from "../assets/LobbyInvite";
import {api, handleError} from "../../../helpers/api";


const SubmitButton = styled(PixelButton)`
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

const PlusButton = styled(AcceptButton)`
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    &:hover {
        outline: ${props => props.disabled ? "2px solid #1D6F42" : "2px solid #000000"};
        background: ${props => props.disabled ? "#000000" : "#1D6F42"};
        color: ${props => props.disabled ? "#1D6F42" : "#000000"};
      }
`;

const MinusButton = styled(DeclineButton)`
opacity: ${props => (props.disabled ? 0.6 : 1)};
&:hover {
    outline: ${props => props.disabled ? "2px solid red" : "2px solid #000000"};
    background: ${props => props.disabled ? "#000000" : "red"};
    color: ${props => props.disabled ? "red" : "#000000"};
  }
`;

const RowTitle = styled.div`
    display: flex;
    height: 30px;
    font-size: 25px;
    color: #c0c0c0;
`;

const AddRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 55px;
`;

const Amount = styled.div`
    color: #c0c0c0;
    font-size: 25px;
    height: 30px;
    width: 70px;
    margin-left: ${props => props.marginLeft || "10px"};
    text-align: center;
`;

const Header = styled.div`
    margin-top: -40px;
    text-align: center;
    color: #c0c0c0;
    font-size: 30px;
    text-decoration: underline;
`;

const EditWrapper = styled.div`
    margin-top: 20px
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

class EditLobby extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: [],
            maxPlayersAndBots: null,
            playerAmount: null,
            botAmount: null,
            isInvitingFriends: false,
            sentUpdate: false,
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('lobby', this.props.lobby)
        this.handleInputChange('maxPlayersAndBots', this.props.lobby.maxPlayersAndBots)
        this.handleInputChange('botAmount', this.props.lobby.currentNumBots)
        this.handleInputChange('playerAmount', this.props.lobby.currentNumPlayers)
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
                maxNumberOfPlayersAndBots: this.state.maxPlayersAndBots,
                hostToken: localStorage.getItem("token")
            })
            //this disables the button temporarily to avoid too many updates
            setTimeout(() => {this.handleInputChange('sentUpdate', false)}, 2500);
            await api.put(`/lobbies/${this.state.lobby.lobbyId}`, requestBody);
        }catch (error) {
            alert(`Could not update lobby: \n${handleError(error)}`);
        }
    }

    //returns true if there are more than 3 players and fewer than the max amount of players
    canRemovePlayer(){
        if (this.state.maxPlayersAndBots > (this.totalPlayers()) && this.state.maxPlayersAndBots > 3){
            return true;
        }
        else{return false;}
    }

    removePlayer(){
        if (this.canRemovePlayer()){
            this.handleInputChange('maxPlayersAndBots', this.state.maxPlayersAndBots - 1)
        }
        if(this.state.botAmount >= (this.state.maxPlayersAndBots - this.state.playerAmount)){
            this.removeBot()
        }
    }

    canIncreaseTotalPlayers(){
        if (this.state.maxPlayersAndBots < 7){
            return true;
        }
        else{
            return false;
        }
    }

    addPlayer(){
        if(this.canIncreaseTotalPlayers()){
            this.handleInputChange('maxPlayersAndBots', this.state.maxPlayersAndBots + 1)
        }
    }

    canRemoveBot(){
        if (this.state.botAmount > 0){
            return true;
        }
        else{return false;}
    }

    canIncreaseBots(){
        if ((this.state.botAmount + this.state.playerAmount) < this.state.maxPlayersAndBots){
            return true;
        }
        else{return false;}
    }


    removeBot(){
        if (this.canRemoveBot()){
            this.handleInputChange('botAmount', this.state.botAmount - 1)
        }
    }

    addBot(){
        if(this.canIncreaseBots()){
            this.handleInputChange('botAmount', this.state.botAmount + 1)
        }
    }

    updateLobbyButton(){
        if (!this.state.sentUpdate){
            return (
                <SubmitButton
                    width={"200px"}
                    marginTop={"10px"}
                    onClick={()=>this.updateLobby()}
                >Update Lobby</SubmitButton>)
        }
        else {
            return(
                <SubmitButton
                    width={"200px"}
                    marginTop={"10px"}
                    disabled={"true"}
                    onClick={()=>this.updateLobby()}
                >Updated Lobby!</SubmitButton>
            )
        }
    }

    totalPlayers(){
        return parseInt(this.state.lobby.currentNumPlayers) + parseInt(this.state.lobby.currentNumBots);
    }

    toggleInviteFriends=()=>{
        this.setState(prevState => ({
        isInvitingFriends: !prevState.isInvitingFriends
      }));}

    render(){
        return(
            <div>
            {!this.state.isInvitingFriends ? 
            <PhoneScreen>
                <Header>
                    ../EditLobby.js
                </Header>
                <EditWrapper>
                    <RowTitle>
                        Total Players 
                    </RowTitle>
                    <AddRow>
                            <MinusButton
                                marginTop="0px"
                                width="50px"
                                disabled={!this.canRemovePlayer()}
                                onClick={() => this.removePlayer()}>
                                -
                            </MinusButton>
                            <Amount
                                marginLeft="5px">
                                {this.state.maxPlayersAndBots}
                            </Amount>
                            <PlusButton                        
                                marginTop="0px"
                                width="50px"
                                disabled={!this.canIncreaseTotalPlayers()}
                                onClick={()=>this.addPlayer()}
                                >
                                +
                            </PlusButton>
                    </AddRow>
                    <RowTitle>
                        Bots 
                    </RowTitle>
                    <AddRow>
                            <MinusButton
                                marginTop="0px"
                                width="50px"
                                    disabled={!this.canRemoveBot()}
                                    onClick={() => this.removeBot()}
                                >
                                -
                            </MinusButton>
                            <Amount>
                                {this.state.botAmount} / {this.state.maxPlayersAndBots - this.state.playerAmount}
                            </Amount>
                            <PlusButton                        
                                marginTop="0px"
                                width="50px"
                                disabled={!this.canIncreaseBots()}
                                onClick={()=>this.addBot()}
                                >
                                +
                            </PlusButton>
                    </AddRow>
                    <PixelButton
                        onClick = {() => this.toggleInviteFriends()}>
                        Invite Friend
                    </PixelButton>
                    {this.updateLobbyButton()}
                    <DeclineButton
                        width = "190px"
                        onClick = {() => this.props.isEditingLobby()}>
                        {"Discard Changes"}
                    </DeclineButton>
                </EditWrapper>
            </PhoneScreen> 
            :
            <LobbyInvite
                toggleInviteFriends={this.toggleInviteFriends}/>   
        }
        </div> 

        //     <Wrapper>
        //         <Text>Edit Lobby</Text>
        //         <ButtonContainer>
        //             <SmallContainer>
        //                 <AdjustableContainer
        //                     marginLeft={"30px"}
        //                     marginTop={"13px"}
        //                 >
        //                     <AddPlayerButton
        //                         onClick={()=>this.removePlayer()}
        //                         disabled={!this.canRemovePlayer()}
        //                         background={"#b03739"}
        //                     >
        //                         -
        //                     </AddPlayerButton>
        //                         <Text2>
        //                             {(this.state.lobby.currentNumBots + this.state.currentNumPlayers)/this.state.maxPlayersAndBots}
        //                         </Text2>
        //                     <AddPlayerButton
        //                         onClick={()=>this.addPlayer()}
        //                         disabled={!this.canAddPlayer()}
        //                         background={"#5cb349"}
        //                     >
        //                         +
        //                     </AddPlayerButton>
        //                 </AdjustableContainer>
        //             </SmallContainer>
        //             <SmallContainer>
        //                 <AdjustableContainer marginTop={"8px"}>
        //                 <PixelButton
        //                     onClick={
        //                         () => 
        //                         this.props.toggleInviteFriends()}>
        //                     Invite Friend
        //                 </PixelButton>
        //                 </AdjustableContainer>
        //             </SmallContainer>
        //             <SmallContainer>
        //                 <AdjustableContainer marginTop={"8px"}>
        //                 <PixelButton>
        //                     Add Bot
        //                 </PixelButton>
        //                 </AdjustableContainer>
        //             </SmallContainer>
        //         </ButtonContainer>
        //         <SmallContainer>
        //             <AdjustableContainer marginTop={"8px"}>
        //                 <PixelButton>
        //                     Kick Bot
        //                 </PixelButton>
        //             </AdjustableContainer>
        //         </SmallContainer>
        //         {this.updateLobbyButton()}
        //     </Wrapper>
        // )
        )}
}

export default EditLobby;