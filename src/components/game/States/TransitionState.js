import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

const Container = styled.div`
    margin-top: 68px;
  
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

const Green = styled.div`
    color: green
    float: right;
    margin-left: 10px;
`;

const Red = styled.div`
    color: red
    float: right;
    margin-left: 10px;
`;



class TransitionState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null,
            players: [],
            isGuessCorrect: null,
            currentWord: '',
            currentGuess: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.currentGuesserId !== state.currentGuesserId || props.players !== state.players
            || props.isGuessCorrect !== state.isGuessCorrect || props.currentWord !== state.currentWord
            || props.currentGuess !== state.currentGuess) {
            return {
                currentGuesserId: props.currentGuesserId,
                players: props.players,
                isGuessCorrect: props.isGuessCorrect,
                currentWord: props.currentWord,
                currentGuess: props.currentGuess
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    renderForGuesser(){
        const guesser = this.state.currentGuesserId;
        const currentPlayer = localStorage.getItem("id");
        if (guesser.toString() === currentPlayer.toString()){
            return true;
        }
        else {return false;}
    }


    render(){
        return(
            this.renderForGuesser() ?
                <Container>
                    {this.state.players.map(player => {
                        return (<div>
                            {player.score !== -1 ?
                                <ScoreContainer>
                                    <TextLeft>{player.username}</TextLeft>
                                    <TextRight>{player.score}</TextRight>
                                </ScoreContainer>: null
                            }
                        </div>
                        )})}
                    <ScoreContainer>
                    <TextLeft>{this.state.isGuessCorrect ?
                        <div>Your guess was correct!</div>
                        :
                        <div>You guessed wrong! </div>}
                    </TextLeft>
                    </ScoreContainer>
                    <ScoreContainer> <TextLeft>The word was <Green>{this.state.currentWord}</Green></TextLeft> </ScoreContainer>
                    <ScoreContainer><TextLeft><div>You guessed: {!this.state.isGuessCorrect ? <Red>{this.state.currentGuess}</Red> : <Green>{this.state.currentGuess}</Green>}</div></TextLeft></ScoreContainer>
                </Container>
                :
                <Container>
                    {this.state.players.map(player => {
                        return (<div>
                            {player.score !== -1 ?
                                <ScoreContainer>
                                    <TextLeft>{player.username}</TextLeft>
                                    <TextRight>{player.score}</TextRight>
                                </ScoreContainer>: null
                            }
                        </div>)})}
                    <ScoreContainer>
                    <TextLeft>{this.state.isGuessCorrect ?
                        <div>Your teammate guessed correct!</div>
                        :
                        <div>Your teammate guessed wrong!</div>}
                    </TextLeft>
                    </ScoreContainer>
                    <ScoreContainer> <TextLeft>The word was <Green>{this.state.currentWord}</Green></TextLeft> </ScoreContainer>
                    <ScoreContainer><TextLeft><div>Your teammate guessed: {!this.state.isGuessCorrect ? <Red>{this.state.currentGuess}</Red> : <Green>{this.state.currentGuess}</Green>}</div></TextLeft></ScoreContainer>
                </Container>
        )
    }
}
export default withRouter(TransitionState);