import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../../views/design/Button";
import {api} from "../../../helpers/api";
import ShyGuyIconRed from "../assets/ShyGuyIcon/red_icon.png"
import ShyGuyIconBlue from "../assets/ShyGuyIcon/blue_icon.png"
import ShyGuyIconGreen from "../assets/ShyGuyIcon/green_icon.png"
import ShyGuyIconYellow from "../assets/ShyGuyIcon/yellow_icon.png"
import ShyGuyIconPink from "../assets/ShyGuyIcon/pink_icon.png"
import ShyGuyIconPurple from "../assets/ShyGuyIcon/purple_icon.png"


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 330px;
  width: 400px
  margin: 0px;
  margin-bottom: 20px;
  margin-top: 10px;
 `

const PlayerContainer = styled.div`
  display: flex;
  height: 30px;
  width: 100%;
 `

const ContentWrapper = styled.div`
    margin-left: 31px;
    margin-top: 31px;
    width: 263px;
    height: 220px;
`;

const ShyGuyIcon = styled.div`
    height: 18px;
    width: 22px;
    display: block;
`;

const UserNameText = styled.div`
    float: left;
    display: block;
    margin-left: 5px;
`;

class LobbyInfos extends React.Component{
    constructor() {
        super();
        this.state = {
            players: [],
            lobby: false,
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
        else{
            return null;
        }
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.players !== state.players || props.lobbyName !== state.lobbyName || props.hostId !== state.hostId) {
            return {
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
            <PlayersContainer className={"tv"}>
                <ContentWrapper>
                <div style={{fontSize: "28px", textAlign:"center"}}>{this.state.lobbyName}</div>
                    {this.state.players.map(player => {return(
                        <PlayerContainer>
                            <ShyGuyIcon>
                                <img src={this.displayIcon(player.avatarColor)}/>
                            </ShyGuyIcon>
                            <UserNameText>
                                {player.username}
                            </UserNameText>
                            {this.valid(player.id) ?
                            <Button
                                    height='10px'
                                    background='none'
                                    boxShadow='none'
                                    color='#FF0000'
                                    fontSize='16px'
                                    weight='bold'
                                    onClick={() => {this.kick(player.id);}}>Kick</Button>
                            :
                            null
                        }
                            <div>
                            </div>
                        </PlayerContainer>
                    )})}
                </ContentWrapper>
            </PlayersContainer>
        )
    }
}
export default withRouter(LobbyInfos);