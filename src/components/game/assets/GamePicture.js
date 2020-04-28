import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import PickWord from "./PickWord";
import Guesser from "./Guesser";


const BackgroundContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
    `

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: bottom;
   height: 350px;
   width: 400px
`

class GamePicture extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            gameState: '',
            currentGuesserId: null,
            clues: []

        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('players', this.props.players)
        this.handleInputChange('gameState', this.props.gameState)
        this.handleInputChange('currentGuesserId', this.props.currentGuesserId)
        this.handleInputChange('clues', this.props.clues)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.players !== state.players || props.gameState !== state.gameState
            || props.currentGuesserId !== state.currentGuesserId
            || props.clues !== state.clues) {
            return {
                players: props.players,
                gameState: props.gameState,
                currentGuesserId: props.currentGuesserId,
                clues: props.clues
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.currentGuesserId !== nextState.currentGuesserId || this.state.players !== nextState.players
            || this.state.clues !== nextState.clues){
            return false;
        }
        else{
        return true;
        }
    }

    displayPickWord(){
        //returns true if gamestate is PICKWORDSTATE and the user is the guesser
        if (this.state.gameState && this.props.currentGuesserId) {
            let state1 = this.state.gameState
            let state2 = "PICKWORDSTATE"
            let guesserId = this.props.currentGuesserId.toString()
            let playerId = localStorage.getItem("id")
            if (state1 === state2 && guesserId === playerId){
                return true
            }
            else {return false}
        }
    }

    //TODO: test this method
    displayCurrentWord(){
        //returns if there is a currentWord
        if (this.props.currentWord){
            return this.props.currentWord
        }
    }

    displayEnterGuess(){
        if (this.state.gameState && this.props.currentGuesserId){
            let state1 = this.state.gameState
            let state2 = "ENTERGUESSSTATE"
            let guesserId = this.props.currentGuesserId.toString()
            let playerId = localStorage.getItem("id")
            if (state1 === state2 && guesserId === playerId){
                return true
            }
            else {return false}
        }
    }

    render(){
    return(
        <BackgroundContainer className = 'lobbyBackground'>
            <Container>
                {this.state.gameState}
            </Container>
            {this.displayCurrentWord()}
            {this.displayPickWord() ? <PickWord pickWordFunction={this.props.pickWordFunction}/>:null}
            {this.displayEnterGuess() ? <Guesser clues={this.props.clues}/> : null}
            {this.state.gameState==="NLPSTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="VOTEONCLUESTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="TRANSITIONSTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="ENDGAMESTATE"? (<div></div>):(<div></div>)}
        </BackgroundContainer>
        )
    }
}
export default withRouter(GamePicture);