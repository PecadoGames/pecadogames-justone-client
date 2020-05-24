import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {InputField} from "../../../views/design/InputField";
import {api, handleError} from "../../../helpers/api";
import {SubmitButton} from "./EnterCluesState";

const Wrapper = styled.div`
    height: 200px;
    width: 470px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 432px;
    margin-left: 170px;
    display: flex;
    flex-direction: column;
`;

const Text = styled.div`
    height: auto;
    width: 300px;
    color: white;
    font-size: 25px;
`;

const Wrapper1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: hsla(220, 3%, 19%, 0.8);
    width: 60%;
    margin-top: -11px;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 65px;
`;

const Wrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    background-color: hsla(220, 3%, 19%, 0.8);
    width: 60%;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 65px;
    height: 65px;
    padding-top: 4.5px;
    padding-bottom: 4px;
    align-items: center;  
`;

const SignLeft = styled.div`
  display: flex;
  height: 80px;
  width: 150px;
  align-items: flex-start;  
  float:left;
`;

const TextSignLeft = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    color:black;
    transform:rotate(-3.5deg);
    font-size: ${props => (props.fontSize || '20px')};
`;

const SignContainer = styled.div`
    width: 100%;
    height: 100%
    align-items: flex-start;
`;

class EnterGuessState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clues: [],
            guess: '',
            currentGuesserId: null,
            invalidClues: [],
            sent: false
        };
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.canSubmitGuess(this.state.guess)){
            this.submitGuess()
        }
    }

    async submitGuess(){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                message: this.state.guess
            })
            await api.put(`lobbies/${localStorage.getItem('lobbyId')}/game/guess`, requestBody)
        }
        catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
        this.handleInputChange('sent', true)
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('clues', this.props.clues)
    }

    canSubmitGuess(guess){
        if (guess){
            if (guess.length <= 12){
                return true;
            }
            return false;
        }
        return false;
    }


    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.clues !== state.clues || props.currentGuesserId !== state.currentGuesserId || props.invalidClues !== state.invalidClues) {
            return {
                clues: props.clues,
                currentGuesserId: props.currentGuesserId,
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

    displayClue(clue){
        if (clue.length <= 8){
            return <TextSignLeft style={{fontSize: 20}}>{clue}</TextSignLeft>
        }
        else if (clue.length <= 11){
            return <TextSignLeft style={{fontSize: 14, marginTop: 33}}>{clue}</TextSignLeft>
        }
        else{
            return <TextSignLeft style={{fontSize: 12, marginTop: 35}}>{clue}</TextSignLeft>
        }
    }


    render(){
        return(
            this.renderForGuesser() ?

                <Wrapper>
                    <Wrapper1>
                    <InputField
                        height= '40px'
                        marginTop="7px"
                        paddingTop="5px"
                        width={"60%"}
                        placeholder= 'Your guess'
                        onChange={e => {
                            this.handleInputChange('guess', e.target.value);

                        }}
                        onKeyDown={this._handleKeyDown}>
                    </InputField>
                    <SubmitButton
                                disabled={!this.canSubmitGuess(this.state.guess)}
                                onClick={()=>{this.submitGuess()}}
                            >Submit
                        </SubmitButton>
                    </Wrapper1>
                    <div>
                        <SignContainer>
                            {this.state.clues.map(clue => {
                                return (<SignLeft className={"guess-sign-left"}>{this.displayClue(clue.actualClue)}</SignLeft>)})}
                        </SignContainer>
                    </div>
                </Wrapper>
                :
                <Wrapper>
                    <Wrapper2>
                        <Text>
                            Waiting for the guess
                        </Text>
                    </Wrapper2>
                    <div>
                        <SignContainer>
                            {this.state.clues.map(clue => {
                                return (<SignLeft className={"guess-sign-left"}>{this.displayClue(clue.actualClue)}</SignLeft>)})}
                            {this.state.invalidClues.map(clue => {
                                return (<SignLeft className={"guess-sign-red"}>{this.displayClue(clue.actualClue)}</SignLeft>)})}
                        </SignContainer>
                    </div>
                </Wrapper>
        )
    }
}
export default withRouter(EnterGuessState);