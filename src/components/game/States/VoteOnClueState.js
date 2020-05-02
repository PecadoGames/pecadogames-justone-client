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
    text-align: center;
    position: relative;
    top: 150px;
    font-size: 36px;
    border: 1px solid black;
`;

const TextSignLeft = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    font-size: 20px;
    color:black;
    transform:rotate(-3.5deg)
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
    margin-top: 500px;
    margin-left: 170px;
    display: flex;
    flex-direction: column;
`;

const Wrapper1 = styled.div`
    display: inline;
    padding-right: 40px;
   
`;

class VoteOnClueState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null,
            clues: [],
            votes: []
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {

    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.currentGuesserId !== state.currentGuesserId || props.clues !== state.clues) {
            return {
                currentGuesserId: props.currentGuesserId,
                clues: props.clues,
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

    async voteOnClues(){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                list: this.state.votes

            })
            await api.put('/lobbies/' + localStorage.getItem('lobbyId') + '/game/vote', requestBody);
        }
    catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
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


    render(){
        return(
            this.renderForGuesser() ?
                <Text>Wait until your friends voted!</Text>
                :
                <Wrapper>
                    <Wrapper1>
                        <Button  background='#FAEBD7'
                                 boxShadow='none'
                                 width='200px'

                                 color='black'
                                 fontSize='30px'
                                 onClick={()=>{this.voteOnClues()}}>Send Vote</Button>
                    </Wrapper1>
                    <SignContainer>
                        {this.state.clues.map(clue => {
                            return (<SignLeft className={"guess-sign-left"}><TextSignLeft>{clue}</TextSignLeft>
                                {this.isInList(clue) ?
                                    <Button onClick={()=>{this.addToList(clue)}}
                                            background='none'
                                            boxShadow='none'
                                            color='#008000'
                                            fontSize='40px'
                                            weight='bold'>✓</Button>
                                    :
                                    <Button
                                        onClick={()=>{this.removeFromList(clue)}}
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