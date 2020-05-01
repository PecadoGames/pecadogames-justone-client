import {withRouter} from "react-router-dom";
import React from "react";




class EnterCluesState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.currentGuesserId !== state.currentGuesserId) {
            return {
                currentGuesserId: props.currentGuesserId,
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
                <div>
                    <text> EnterClues</text>
                    <br/>
                    <text> Display two enter clues if 'specialGame' boolean in Dto is true, else display one</text>
                </div>
                :
                <div>
                    <text> Wait for Clues</text>
                    <br/>
                    <text> Please wait until they submit</text>
                </div>


        )
    }
}
export default withRouter(EnterCluesState);