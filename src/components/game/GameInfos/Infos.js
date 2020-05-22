import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import ShyGuyIconRed from "../../lobby/assets/ShyGuyIcon/red_icon.png";
import ShyGuyIconPurple from "../../lobby/assets/ShyGuyIcon/purple_icon.png";
import ShyGuyIconGreen from "../../lobby/assets/ShyGuyIcon/green_icon.png";
import ShyGuyIconYellow from "../../lobby/assets/ShyGuyIcon/yellow_icon.png";
import ShyGuyIconBlue from "../../lobby/assets/ShyGuyIcon/blue_icon.png";
import ShyGuyIconPink from "../../lobby/assets/ShyGuyIcon/pink_icon.png";
import GuesserIcon from "./guesser_icon.png"
import Timer from "./Timer";
import Round from "./Round";
import Score from "./Score";
import CluerIcon from "./cluer_icon.png"


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  height: 300px;
  width: 400px
 `

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
 `

const ShyGuyIcon = styled.div`
    height: 18px;
    width: 22px;
    display: block;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const UserNameText = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    width: 120px;
    display: flex;
    flex-direction: row;
    align-text: left;
`;

const ContentWrapper = styled.div`
    margin-left: 31px;
    margin-top: 31px;
    width: 263px;
    height: 220px;
`;

const IconWrapper = styled.div`
    height: 18px;
    width: 18px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
`;

const PlayerInfo = styled.div`
    float: left;
    width: 60%;
    height: 170px;
    overflow: hidden;
`;

const GameInfo = styled.div`
    float: left;
    width: 40%;
    height: 170px;
    overflow: hidden;
`;


class Infos extends React.Component{
    constructor() {
        super();
        this.state = {
            players: [],
            lobbyName: '',
            currentGuesser: null,
            score: 0,
            rounds: 0,
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('players', this.props.players)
        this.handleInputChange('lobbyName', this.props.lobbyName)

    }

    static getDerivedStateFromProps(props, state) {
        if (props.rounds !== state.rounds || props.score !== state.score || props.players !== state.players || props.lobbyName !== state.lobbyName ||  props.currentGuesserId !== state.currentGuesserId) {
            return {
                rounds: props.rounds,
                score: props.score,
                players: props.players,
                lobbyName: props.lobbyName,
                currentGuesserId: props.currentGuesserId
            };
        }
        // Return null if the state hasn't changed
        return null;
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


    render(){
        return(
            <PlayersContainer className={"tv"}>
                <ContentWrapper>
                    <div style={{fontSize: "28px", textAlign:"center"}}>Channel: {this.state.lobbyName}</div>
                    <PlayerInfo>
                        {this.state.players.map(player => {return(
                            <PlayerContainer>
                                    <ShyGuyIcon>
                                        <img src={this.displayIcon(player.avatarColor)} alt={"avatar"}/>
                                    </ShyGuyIcon>
                                    <UserNameText>
                                        {player.username}
                                    </UserNameText>
                                    {this.state.currentGuesserId === player.id ?
                                        <IconWrapper>
                                            <img src={GuesserIcon} alt={"guesser"}/>
                                        </IconWrapper>
                                    :
                                        <IconWrapper>
                                            <img src={CluerIcon} alt={"cluer"}/>
                                        </IconWrapper>
                                    }
                            </PlayerContainer>
                        )})}
                    </PlayerInfo>
                    <GameInfo>
                        <Timer/>
                        <Round rounds = {this.state.rounds}/>
                        <Score score = {this.state.score}/>
                    </GameInfo>
                </ContentWrapper>
            </PlayersContainer>
        )
    }
}
export default withRouter(Infos);