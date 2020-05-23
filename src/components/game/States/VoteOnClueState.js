import {withRouter} from "react-router-dom";
import React from "react";
import {Button} from "../../../views/design/Button";
import styled from "styled-components";
import {api, handleError} from "../../../helpers/api";



const SignLeft = styled.div`
  display: flex;
  height: 80px;
  width: 150px;
  align-items: flex-start;  
  float:left;
`;

const Text = styled.div`
    height: auto;
    width: 300px;
    color: white;
    font-size: 25px;
  
  
`;

const TextSignLeft = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    font-size: 20px;
    color:black;
    transform:rotate(-3.5deg);
`;

const SignContainer = styled.div`
    width: 100%;
    height: 100%
    align-items: flex-start;
`;

const Wrapper = styled.div`
    height: 200px;
    width: 470px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 430px;
    margin-left: 170px;
    display: flex;
    flex-direction: column;
`;

const Wrapper1 = styled.div`
    display: inline;
    padding-right: 40px;
   
`;

const Wrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    background-color: hsla(220, 3%, 19%, 0.8);
    width: 60%;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 65px;

`;

class VoteOnClueState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null,
            clues: [],
            votes: [],
            voted: false,
            players: [],
            invalidClues: []
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    hasVoted(){
        for (let a in this.state.players){
            if (this.state.players[a].id === parseInt(localStorage.getItem('id'))){
                if(this.state.players[a].voted === true){
                    return true;
                }
            }
        }
        return false;
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.currentGuesserId !== state.currentGuesserId || props.clues !== state.clues
            || props.players !== state.players || props.invalidClues !== state.invalidClues) {
            return {
                currentGuesserId: props.currentGuesserId,
                clues: props.clues,
                players: props.players,
                invalidClues: props.invalidClues
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
        return false;
    }

    async voteOnClues(){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                invalidClues: this.state.votes

            })
            await api.put('/lobbies/' + localStorage.getItem('lobbyId') + '/game/vote', requestBody);
        }
    catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
        this.handleInputChange('voted', true)
    }

    addToList(clue){
        let list = this.state.votes
        list.push(clue)
        this.handleInputChange('votes',list)
    }

    removeFromList(clue){
        let list = this.state.votes
        for( let i = 0; i < list.length; i++){ if ( list[i] === clue) { list.splice(i, 1); }}
        this.handleInputChange('votes', list)
    }

    isInList(clue){
        for(let word in this.state.votes){
            if (this.state.votes[word] === clue){
                return false;
            }
        }
        return true;
    }

    displayClue(clue){
        if (clue.length <= 8){
            return <TextSignLeft style={{fontSize: 20}}>{clue}</TextSignLeft>
        }
        else if (clue.length <= 11){
            return <TextSignLeft style={{fontSize: 14, marginTop: 33}}>{clue}</TextSignLeft>
        }
        else{
            return <TextSignLeft style={{fontSize: 10, marginTop: 35}}>{clue}</TextSignLeft>
        }
    }
    render(){
        return(
            this.renderForGuesser()  || this.hasVoted() ?
                <Wrapper>
                    <Wrapper2>
                        <Text>Wait until your friends voted!</Text>
                    </Wrapper2>
                </Wrapper>
                :
                <Wrapper>
                    <Wrapper1>
                        <Button  background='hsla(220, 3%, 19%, 0.8);'
                                 boxShadow='none'
                                 width='100px'
                                 color='white'
                                 fontSize='30px'
                                 border='2px,red'
                                 height='47px'
                                 onClick={()=>{this.voteOnClues()}}>Vote</Button>
                    </Wrapper1>
                    <SignContainer>
                        {this.state.clues.map(clue => {
                            return (<SignLeft className={"guess-sign-left"}>{this.displayClue(clue.actualClue)}
                                {this.isInList(clue.actualClue) ?
                                    <Button onClick={()=>{this.addToList(clue.actualClue)}}
                                            background='none'
                                            boxShadow='none'
                                            color='#008000'
                                            fontSize='40px'
                                            weight='bold'>✓</Button>
                                    :
                                    <Button
                                        onClick={()=>{this.removeFromList(clue.actualClue)}}
                                        background='none'
                                        boxShadow='none'
                                        color='#FF0000'
                                        fontSize='40px'
                                        weight='bold'>X</Button>}</SignLeft>)})}
                    </SignContainer>
                </Wrapper>

        )
    }
}
export default withRouter(VoteOnClueState);