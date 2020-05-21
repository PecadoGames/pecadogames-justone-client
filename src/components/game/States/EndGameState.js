import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex
    flex-direction: column
    margin:auto;
    width: 500px;
    height: auto;
    background-color: hsla(220, 3%, 19%, 0.7);
    width: 60%;
    border: 2px solid black;
    border-radius: 5px;
    text-align: center;
`;

const Container = styled.div`
    background-color: #333333;
    width: 80%;
    height: 70%;
    margin-left: 10%;
    border-radius: 5px;
    border: 2px solid black;
    margin-bottom: 30px;
`;

const ScoreContainer = styled.div`
    background-color: #242424;
    width: 70%;
    height: 45px;
    border-radius: 8px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const TextLeft = styled.div`
    font-size: 22px;
    margin-top: 10px;
    margin-left: 10px;
    float:left;
`;

const TextRight = styled(TextLeft)`
    float:right;
    margin-right: 10px;
`;

const Line = styled.hr`
    border-top: 1px solid black;
    width: 80%;
`;

const Text = styled.div`
    font-size: 50px;
`;

const Player = styled.div`
    height: 20px;
    width: 20px;
`;

class EndGameState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            timer: 10
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    //redirects user to lobby after 10 seconds
    componentDidMount() {
        setTimeout(() => {this.redirectToLobby()}, 10000 );
        setTimeout(() => {this.timer()}, 1000 );
        setTimeout(() => {this.timer()}, 2000 );
        setTimeout(() => {this.timer()}, 3000 );
        setTimeout(() => {this.timer()}, 4000 );
        setTimeout(() => {this.timer()}, 5000 );
        setTimeout(() => {this.timer()}, 6000 );
        setTimeout(() => {this.timer()}, 7000 );
        setTimeout(() => {this.timer()}, 8000 );
        setTimeout(() => {this.timer()}, 9000 );
        setTimeout(() => {this.timer()}, 10000 );
    }

    timer(){
        this.handleInputChange('timer', this.state.timer -1)
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
            <Wrapper>
                <Text>Game Over!</Text>
                You will be redirected to the lobby in {this.state.timer} seconds
                <Line/>
                <Container>
                    {this.state.players.map(player => {
                        return (<ScoreContainer>
                            <TextLeft>{player.username}</TextLeft>
                            <TextRight>{player.score}</TextRight>
                        </ScoreContainer>)
                    })}
                </Container>
            </Wrapper>
        )
    }
}
export default withRouter(EndGameState);