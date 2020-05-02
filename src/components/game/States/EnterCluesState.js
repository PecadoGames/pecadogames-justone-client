import {withRouter} from "react-router-dom";
import React from "react";
import {InputField} from "../../../views/design/InputField";
import {Button} from "../../../views/design/Button";
import {api, handleError} from "../../../helpers/api";




class EnterCluesState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null,
            specialGame: false,
            clue: '',
            clue2: ''
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.currentGuesserId !== state.currentGuesserId || props.specialGame !== state.specialGame) {
            return {
                currentGuesserId: props.currentGuesserId,
                specialGame: props.specialGame
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.clue !== nextState.clue || this.state.clue2 !== nextState.clue2){
            return false;}
        return true;
    }

    async submit(){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                clue: this.state.clue,
                clue2: this.state.clue2
            })
            await api.put('/lobbies/' + localStorage.getItem('lobbyId') + '/game/clue', requestBody);
        }
        catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
    }


    render(){
        return(
            this.renderForGuesser() ?
                <div>
                    <text> Wait for Clues</text>
                    <br/>
                    <text> Please wait until they submit</text>
                </div>
                :
                this.state.specialGame ?
                    <div>
                        <text> EnterClues</text>
                        <br/>
                        <text> Display two enter clues</text>
                        <br/>
                        <InputField width = '350px'
                                    marginTop = '10px'
                                    placeholder= 'Enter your first clue'
                                    onChange={e => {
                                        this.handleInputChange('clue', e.target.value);

                                    }}
                                    >
                        </InputField>
                        <br/>
                        <InputField width = '350px'
                                    marginTop = '10px'
                                    placeholder= 'Enter your second clue'
                                    onChange={e => {
                                        this.handleInputChange('clue2', e.target.value);

                                    }}
                                    >
                        </InputField>
                        <Button onClick={()=>{this.submit()}}>Submit</Button>
                    </div>
                    :
                    <div>
                        <text> EnterClues</text>
                        <br/>
                        <text> Display one enter Clue</text>
                        <br/>
                        <InputField width = '350px'
                                    marginTop = '10px'
                                    placeholder= 'Enter your clue'
                                    onChange={e => {
                                        this.handleInputChange('clue', e.target.value);

                                    }}
                                    >
                        </InputField>
                        <Button onClick={()=>{this.submit()}}>Submit</Button>
                    </div>

        )
    }
}
export default withRouter(EnterCluesState);