import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {DeclineButton} from "../../profile/Assets/RequestBox";
import {api} from "../../../helpers/api";
import ShyGuyIconRed from "../assets/ShyGuyIcon/red_icon.png"
import ShyGuyIconBlue from "../assets/ShyGuyIcon/blue_icon.png"
import ShyGuyIconGreen from "../assets/ShyGuyIcon/green_icon.png"
import ShyGuyIconYellow from "../assets/ShyGuyIcon/yellow_icon.png"
import ShyGuyIconPink from "../assets/ShyGuyIcon/pink_icon.png"
import ShyGuyIconPurple from "../assets/ShyGuyIcon/purple_icon.png"
import ShyGuyIconBot from "../assets/ShyGuyIcon/bot_icon.png"


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: ${props => props.autoHeight ? "330px": "400px"};
  width: 100%;
  margin-top: 5px;
 `;

const ShyGuyIcon = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 95%;
    width: 50px;
`;

const LobbyName = styled.div`
    text-align: center;
    width: 100%;
    font-size: 25px;
    color: #c0c0c0;
    text-decoration: underline
`;

const PlayerInfos = styled.div`
    display: flex; 
    flex-direction: column;
    width: 100%;
`

const UserRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    width: 99%
`;

const UserName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    color: #c0c0c0;
    font-size: 20px;
    height: 35px;
    width: 300px;
`;

const KickButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${props => props.autoWidth ? "auto" : "100px"};
`;

const GameInfoRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: ${props => props.height ? "50px" : ""}
`;

const GameInfoText = styled.div`
    color: #c0c0c0;
    font-size: 20px;
`



class LobbyInfos extends React.Component{
    constructor() {
        super();
        this.state = {
            players: [],
            lobby: null,
            lobbyName: '',
            hostId: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    displayIcon(color){
        if (color === "RED"){
            return ShyGuyIconRed;
        }
        else if (color === "PURPLE"){
            return ShyGuyIconPurple;
        }
        else if (color === "GREEN"){
            return ShyGuyIconGreen;
        }
        else if (color === "YELLOW"){
            return ShyGuyIconYellow;
        }
        else if (color === "BLUE"){
            return ShyGuyIconBlue;
        }
        else if (color === "PINK"){
            return ShyGuyIconPink;
        }
        else if (color === "BOT"){
            return ShyGuyIconBot;
        }
        else{
            return null;
        }
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.players !== state.players || props.lobbyName !== state.lobbyName || props.hostId !== state.hostId) {
            return {
                lobby: props.lobby,
                players: props.players,
                lobbyName: props.lobbyName,
                hostId: props.hostId
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    valid(id){
        //check if player is host or not
        let a = (this.state.hostId !== id)
        let b = (this.state.hostId === parseInt(localStorage.getItem('id')))
        return a && b

    }

    async kick(id){
        const requestBody = JSON.stringify({
            hostToken: localStorage.getItem('token'),
            playerToKickId: id,
            maxNumberOfPlayersAndBots: 0
        });
        await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/kick`, requestBody);
    }

    render(){
        return(
            <PlayersContainer
                autoHeight={this.state.hostId === localStorage.getItem('id')}>
                <LobbyName>
                    {this.state.lobbyName}
                </LobbyName>                                
                {this.state.lobby !== null &&
                    <GameInfoRow
                        height={this.state.hostId != localStorage.getItem('id')}>
                        <GameInfoText>
                            {"Players: "+this.state.lobby.currentNumPlayersAndBots+"/"+this.state.lobby.maxPlayersAndBots}
                        </GameInfoText>
                        <GameInfoText>
                            {"Rounds: "+this.state.lobby.rounds}
                        </GameInfoText>
                    </GameInfoRow>
                }
                <PlayerInfos>
                {this.state.players.map(player => {return(
                        <UserRow>
                            <ShyGuyIcon>
                                <img src={this.displayIcon(player.avatarColor)} alt={"corresponding avatar"}/>
                            </ShyGuyIcon>
                            <UserName>
                                {player.username}
                            </UserName>
                            <KickButtonContainer
                                autoWidth={this.state.hostId != localStorage.getItem('id')}>
                                {this.valid(player.id) &&
                                <DeclineButton
                                        marginTop="0px"
                                        marginLeft="0px"
                                        marginRight="0px"
                                        width='50px'
                                        height='35px'
                                        color='red'
                                        fontSize='20px'
                                        onClick={() => {this.kick(player.id);}}>
                                            Kick
                                </DeclineButton>
                                }
                            </KickButtonContainer>
                        </UserRow>
                )})}
                </PlayerInfos>
            </PlayersContainer>
        )
    }
}
export default withRouter(LobbyInfos);