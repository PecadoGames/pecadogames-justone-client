import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `

class GameInfos extends React.Component{
    constructor() {
        super();
        this.state = {
            players: [],
            lobbyName: ''
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
        if (props.players !== state.players || props.lobbyName !== state.lobbyName) {
            return {
                players: props.players,
                lobbyName: props.lobbyName
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <PlayersContainer>
                LobbyName: {this.state.lobbyName}
                {this.state.players.map(player => {return(
                    <PlayerContainer>
                        <div>Username: {player.username}</div>
                        <div></div>
                        </PlayerContainer>
                )})}

            </PlayersContainer>
        )
    }
}
export default withRouter(GameInfos);