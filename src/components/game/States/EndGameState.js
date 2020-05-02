import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Text = styled.div`
    font-size: 40px;
    margin-top: 600px;
    margin-left: 200px;
`;

const Player = styled.div`
    height: 20px;
    width: 20px;
`;

class EndGameState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        setTimeout(() => {this.redirectToLobby()}, 10000 );
    }

    redirectToLobby(){
        localStorage.removeItem('gameId')
        this.props.history.push(`/game/lobbies/${localStorage.getItem('lobbyId')}`);
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.players !== state.players) {
            return {
                players: props.players,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <div>
                <text>EndGame</text>
                <br/>
                <text>You will be redirected to the lobby in 10 seconds</text>
                <Text>Hurray the game is over!</Text>
                {this.state.players.map(player => {
                    return (<Player>{player.username}</Player>)})}
            </div>

        )
    }
}
export default withRouter(EndGameState);