import {withRouter} from "react-router-dom";
import React from "react";
import {Button} from "../../../views/design/Button";




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

    async voteOnClue(){

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
                    <Button onClick={()=>{this.voteOnClue()}}>vote on clue</Button>
                </div>

        )
    }
}
export default withRouter(VoteOnClueState);