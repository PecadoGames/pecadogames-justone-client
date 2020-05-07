import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../../views/design/Button";
import {api} from "../../../helpers/api";


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  height: 30px;
  width: 400px
 `

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
            <PlayersContainer>
                lobbyName: {this.state.lobbyName}
                <br></br>
                <br></br>
                <text>Players:</text>
                {this.state.players.map(player => {return(
                    <PlayerContainer>
                        <div>Username: {player.username}</div> {this.valid(player.id) ?
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

            </PlayersContainer>
        )
    }
}
export default withRouter(LobbyInfos);