import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
 `

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `


const MiniContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 200px;
  justify-content: space-between

 `

class Infos extends React.Component{
    constructor() {
        super();
        this.state = {
            players: [],
            lobbyName: '',
            currentGuesser: null
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
        if (props.players !== state.players || props.lobbyName !== state.lobbyName ||  props.currentGuesserId !== state.currentGuesserId) {
            return {
                players: props.players,
                lobbyName: props.lobbyName,
                currentGuesserId: props.currentGuesserId
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <PlayersContainer className={'tv'}>
                LobbyName: {this.state.lobbyName}
                {this.state.players.map(player => {return(
                    <PlayerContainer>
                        <MiniContainer>
                            <div>Username: {player.username}</div>{this.state.currentGuesserId === player.id ?
                            <div>Guesser</div>
                            :
                            null}
                            <div></div>
                        </MiniContainer>
                    </PlayerContainer>
                )})}
            </PlayersContainer>
        )
    }
}
export default withRouter(Infos);