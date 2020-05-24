import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import Infos from "./GameInfos/Infos";
import PickWordState from "./States/PickWordState";
import EnterGuessState from "./States/EnterGuessState";
import EnterCluesState from "./States/EnterCluesState";
import VoteOnClueState from "./States/VoteOnClueState";
import TransitionState from "./States/TransitionState";
import EndGameState from "./States/EndGameState";


const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 768px;
  width: 1200px;
  align-items: flex-start; 
  color: white;
  margin: auto;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 768px;
  width: 800px; `;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 768px;
  width: 400px
  justify-content: space-between
 
 `
const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 100px;
  width: 800px;
  
 `
const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 668px;
  width: 800px
 `
const InsideContainer = styled.div`
  position: absolute
  height: 668px;
  width: 800px
 `






class GameGetter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            players: [],
            gameState: null,
            interval: null,
            currentGuesserId: 1,
            lobbyName: '',
            clues: [],
            specialGame: false,
            isGuessCorrect: null,
            invalidClues: [],
            currentGuess: null,
            rounds: 0,
            roundsPlayed: 0
        };
    }

    //needs to be adjusted since you have to logout of the game
    async logout() {
        try{
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem("id"),
                playerToken: localStorage.getItem("token")
            });
            await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/rageQuits`, requestBody)
            localStorage.removeItem("lobbyId")
        }
        catch(error){
        }
        try{
            const requestBody = JSON.stringify({
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token")
            });
            await api.put('/logout', requestBody);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
        }
        catch(error){
            alert(`Something went wrong during the logout \n${handleError(error)}`)
        }
        this.props.history.push('/login');
    }



    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async setGame(){
        const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game?token=${localStorage.getItem('token')}`);
        this.handleInputChange('game' ,response.data);
        this.handleInputChange('currentGuesserId', response.data.currentGuesser.id);
        this.handleInputChange('gameState', response.data.gameState);
        this.handleInputChange('players', response.data.players);
        this.handleInputChange('lobbyName', response.data.lobbyName);
        this.handleInputChange('currentWord', response.data.currentWord);
        this.handleInputChange('clues', response.data.enteredClues);
        this.handleInputChange('specialGame', response.data.specialGame);
        this.handleInputChange('invalidClues', response.data.invalidClues);
        this.handleInputChange('isGuessCorrect', response.data.guessCorrect);
        this.handleInputChange('score', response.data.overallScore);
        this.handleInputChange('rounds', response.data.rounds);
        this.handleInputChange('roundsPlayed', response.data.roundsPlayed);
        this.handleInputChange('currentGuess', response.data.currentGuess);
    }

    //gets Game half a second
    async getGame(){
        try{
            let interval = setInterval(async ()=>{
                    this.setGame()
                },500)
                this.setState({'interval': interval})
        }
        catch(error){
        }
    }

    //needs to clear interval when unmount or it keeps calling
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }




    async componentDidMount() {
        this.setGame()
        this.getGame()
    }

    async pickWord(number){
        try{
            const requestBody = JSON.stringify({
                number: number,
            });
            await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game/word?token=${localStorage.getItem("token")}`, requestBody)
        }
        catch(error){
        }
    }


    displayPickWordState(){
        //returns true if gamestate is PICKWORDSTATE and the user is the guesser
        if (this.state.gameState) {
            let state1 = this.state.gameState
            let state2 = "PICK_WORD_STATE"
            if (state1 === state2){
                return true
            }
            return false
        }
        else{return false}
    }


    displayVoteOnClueState(){
        if (this.state.gameState) {
            let state1 = this.state.gameState
            let state2 = "VOTE_ON_CLUES_STATE"
            if (state1 === state2){
                return true
            }
            return false
        }
        else{return false}

    }

    displayEnterCluesState(){
        if (this.state.gameState) {
            let state1 = this.state.gameState
            let state2 = "ENTER_CLUES_STATE"
            if (state1 === state2){
                return true
            }
            return false
        }
        else{return false}

    }

    displayEndGameState(){
        if (this.state.gameState) {
            let state1 = this.state.gameState
            let state2 = "END_GAME_STATE"
            if (state1 === state2){
                return true
            }
            return false
        }
        else{return false}

    }

    displayEnterGuessState(){
        if (this.state.gameState) {
            let state1 = this.state.gameState
            let state2 = "ENTER_GUESS_STATE"
            if (state1 === state2){
                return true
            }
            return false
        }
        else{return false}
    }

    displayTransitionState(){
        if (this.state.gameState) {
            let state1 = this.state.gameState
            let state2 = "TRANSITION_STATE"
            if (state1 === state2){
                return true
            }
            return false
        }
        else{return false}
    }


    render(){
        return(
            <FormContainer>
                <LeftContainer>
                    <Infos
                        players ={this.state.players}
                        lobbyName={this.state.lobbyName}
                        currentGuesserId = {this.state.currentGuesserId}
                        score = {this.state.score}
                        rounds = {this.state.rounds}
                        roundsPlayed = {this.state.roundsPlayed}
                    >
                    </Infos>
                    <ChatBox></ChatBox>
                </LeftContainer>
                <RightContainer>
                    <TopRightContainer></TopRightContainer>
                    <BottomRightContainer>
                        <InsideContainer>
                            {this.displayPickWordState() ? <PickWordState pickWordFunction={this.pickWord} currentGuesserId = {this.state.currentGuesserId}/>:null}
                            {this.displayEnterCluesState() ? <EnterCluesState  players = {this.state.players} currentWord = {this.state.currentWord} specialGame = {this.state.specialGame} currentGuesserId = {this.state.currentGuesserId}/>:null}
                            {this.displayVoteOnClueState() ? <VoteOnClueState  invalidClues={this.state.invalidClues} players = {this.state.players} currentGuesserId = {this.state.currentGuesserId} clues={this.state.clues}/> : null}
                            {this.displayEnterGuessState() ? <EnterGuessState  invalidClues={this.state.invalidClues} currentGuesserId = {this.state.currentGuesserId} clues={this.state.clues}/>: null}
                            {this.displayTransitionState()? <TransitionState  currentGuess= {this.state.currentGuess} currentWord = {this.state.currentWord} currentGuesserId = {this.state.currentGuesserId} players = {this.state.players} isGuessCorrect = {this.state.isGuessCorrect}/>: null}
                            {this.displayEndGameState() ? <EndGameState players = {this.state.players}/> : null}
                        </InsideContainer>
                    </BottomRightContainer>
                </RightContainer>
            </FormContainer>
        )
    }
}
export default withRouter(GameGetter);