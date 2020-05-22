import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import Picture from "./GameInfos/Picture";

import EndGameState from "./States/EndGameState";
import EnterGuessState from "./States/EnterGuessState";
import EnterCluesState from "./States/EnterCluesState";
import PickWordState from "./States/PickWordState";
import TransitionState from "./States/TransitionState";
import VoteOnClueState from "./States/VoteOnClueState";



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
  height: 700px;
  width: 800px
 `

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
 `


const MainMenuButton = styled.button`
    margin-bottom:20px;   
    width:200px;
    height:45px;
    font-size: 28px
    text-shadow: 1px 1px 0px #4f4f4f;
    background-color:transparent;
    display: inline-block
    color: black;
    padding-bottom: 5px;
    border:4px solid;
    &:hover {
        background: #d9d9d9;
    }
    border-color: ${props => props.borderColor|| "black"};
`;




class GameTestGetter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            players: [{'username': 'asdf', 'score': '420', 'avatarColor': 'BLUE'},{'username': 'fdsa', 'score': '420', 'avatarColor': 'BLUE'}, {'username': 'ramon', 'score': '420', 'avatarColor': 'BLUE'},{'username': 'marion', 'score':'69', 'avatarColor': 'BLUE'}],
            gameState: null,
            interval: null,
            currentGuesserId: parseInt(localStorage.getItem('id')),
            lobbyName: '',
            clues: [{'actualClue':'clue'},{'actualClue':'whatsUp'},{'actualClue':'tinder'},{'actualClue':'Ramono'}],
            stateName: '',
            number: 1,
            currentWord: 'marion',
            isGuessCorrect: true,
            invalidClues: [{'actualClue': 'Test'}, {'actualClue': 'Test'}],
            currentGuess: 'Test'
        };
    }



    handleInputChange(key, value) {
        this.setState({ [key]: value });
        localStorage.setItem(key,value)
    }

    stateChange(){
        if(this.state.stateName === 'EndGameState'){
            return <EndGameState players={this.state.players}/>
        }
        if(this.state.stateName === 'EnterCluesState'){
            return <EnterCluesState invalidClues={this.state.invalidClues} players={this.state.players} currentWord={this.state.currentWord } specialGame={this.state.specialGame} currentGuesserId={this.state.number}/>
        }
        if(this.state.stateName === 'EnterGuessState'){
            return <EnterGuessState invalidClues={this.state.invalidClues} clues={this.state.clues} currentGuesserId={this.state.number}/>
        }
        if(this.state.stateName === 'PickWordState'){
            return <PickWordState currentGuesserId={this.state.number}/>
        }
        if(this.state.stateName === 'TransitionState'){
            return <TransitionState currentGuess= {this.state.currentGuess} currentWord = {this.state.currentWord} currentGuesserId={this.state.number} players={this.state.players} isGuessCorrect={this.state.isGuessCorrect}/>
        }
        if(this.state.stateName === 'VoteOnClueState'){
            return <VoteOnClueState invalidClues={this.state.invalidClues} clues={this.state.clues} currentGuesserId={this.state.number}/>
        }
    }

    handleMode(){
        if(this.state.specialGame===false){
            this.handleInputChange('specialGame',true)}
        else{
            this.handleInputChange('specialGame',false)}

    }


    changeId(){
        if(this.state.number===parseInt(localStorage.getItem('id'))){
            this.handleInputChange('number',parseInt(localStorage.getItem('id'))+1)}
        else{
            this.handleInputChange('number',parseInt(localStorage.getItem('id')))}
    }



    componentDidMount() {
        this.setState({'stateName': localStorage.getItem('stateName')})
    }




    render(){
        return(
            <FormContainer>
                <FormContainer>
                <LeftContainer>
                    <SmallContainer>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.changeId()}}>Change Id</MainMenuButton>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleMode()}}>Mode</MainMenuButton>
                    </SmallContainer>
                    <MainMenuButton borderColor="#0bb845"
                                    onClick={() => {this.handleInputChange('stateName', 'PickWordState')}}>PickWord</MainMenuButton>
                    <MainMenuButton borderColor="#0bb845"
                                    onClick={() => {this.handleInputChange('stateName', 'EnterCluesState')}}>Clue</MainMenuButton>
                    <MainMenuButton borderColor="#0bb845"
                                    onClick={() => {this.handleInputChange('stateName', 'VoteOnClueState')}}>VoteOnClue</MainMenuButton>
                    <MainMenuButton borderColor="#0bb845"
                                    onClick={() => {this.handleInputChange('stateName', 'EnterGuessState')}}>Guess</MainMenuButton>
                    <MainMenuButton borderColor="#0bb845"
                                    onClick={() => {this.handleInputChange('stateName', 'TransitionState')}}>Transition</MainMenuButton>

                    <MainMenuButton borderColor="#0bb845"
                                    onClick={() => {this.handleInputChange('stateName', 'EndGameState')}}>End</MainMenuButton>
                </LeftContainer>
                <RightContainer>
                    <TopRightContainer>
                    </TopRightContainer>
                    <BottomRightContainer  className = 'lobbyBackground'>
                        {this.state.stateName=== 'EndGameState'? <EndGameState players={this.state.players}/>: null}
                        {this.state.stateName=== 'EnterCluesState'? <EnterCluesState invalidClues={this.state.invalidClues} players={this.state.players} currentWord={this.state.currentWord } specialGame={this.state.specialGame} currentGuesserId={this.state.number}/>: null}
                        {this.state.stateName=== 'EnterGuessState'? <EnterGuessState invalidClues={this.state.invalidClues} clues={this.state.clues} currentGuesserId={this.state.number}/> : null}
                        {this.state.stateName=== 'PickWordState'? <PickWordState currentGuesserId={this.state.number}/>: null}
                        {this.state.stateName=== 'TransitionState'? <TransitionState currentGuess= {this.state.currentGuess} currentWord = {this.state.currentWord} currentGuesserId={this.state.number} players={this.state.players} isGuessCorrect={this.state.isGuessCorrect}/>: null}
                        {this.state.stateName=== 'VoteOnClueState'? <VoteOnClueState invalidClues={this.state.invalidClues} clues={this.state.clues} currentGuesserId={this.state.number}/>: null}
                    </BottomRightContainer>
                </RightContainer>
                </FormContainer>
            </FormContainer>
        )
    }
}
export default withRouter(GameTestGetter);