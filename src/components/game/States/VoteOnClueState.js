import {withRouter} from "react-router-dom";
import React from "react";
import {Button} from "../../../views/design/Button";
import styled from "styled-components";
import {api, handleError} from "../../../helpers/api";

const Clues = styled.div`
    margin-left: 100px;
    display: flex;
    flex-direction: row;
    align-items: left;
`;

const Clue = styled.div`

    margin-left: 10px;
    align-items: left;
`;


class VoteOnClueState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null,
            clues: []
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

    async voteYesOnClue(clue){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                clue: clue,
                vote: true
            })
            await api.put('/lobbies/' + localStorage.getItem('lobbyId') + '/game/vote', requestBody);
        }
    catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
    }

    async voteNoOnClue(clue){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                clue: clue,
                vote: false
            })
            await api.put('/lobbies/' + localStorage.getItem('lobbyId') + '/game/vote', requestBody);
        }
    catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
    }

    render(){
        return(
            this.renderForGuesser() ?
                <div>
                    <text>VoteOnClue for Guesser, wait until they voted</text>
                </div>
                :
                <div>
                    <text>VoteOnClue for the Clue submitter, please vote</text>
                    <Clues>
                        {this.state.clues.map(clue => {
                            return (<Clue>{clue.clue} <Button onClick={()=>{this.voteYesOnClue(clue.clue)}}>Okay</Button><Button onClick={()=>{this.voteNoOnClue(clue.clue)}}>Wrong!</Button></Clue>
                            )})}
                    </Clues>

                </div>

        )
    }
}
export default withRouter(VoteOnClueState);