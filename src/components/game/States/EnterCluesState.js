import {withRouter} from "react-router-dom";
import React from "react";
import {InputField} from "../../../views/design/InputField";
import {api, handleError} from "../../../helpers/api";
import { PixelButton } from "../../../views/design/PixelButton";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 195px;
    width: 460px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 350px;
    margin-left: 220px;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    padding-top: 10px;
    margin-top: ${props => props.marginTop};
    height: auto;
    width: 300px;
    background-color: hsla(220, 3%, 19%, 0.8);
    border: 2px solid black;
    color: white;
    border-radius: 8px;
    border: 2px solid black;
`;

const Wrapper1 = styled.div`
    margin-top: 0px;
    height: auto;
    width: 300px;
    background-color: hsla(220, 3%, 19%, 0.8);
    border: 2px solid black;
    color: white;
    border-radius: 8px;
    border: 2px solid black;
    font-size: 26px;
`;

const Text = styled.div`
    align-text: center;
    font-size: 26px;
    color:white;
    
`;

export const SubmitButton = styled(PixelButton)`
    margin-top:0px;
    margin-right:0px;
    background:transparent;
    outline:2px solid white;
    border:none;
    color:white;
    width:90px;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.opacity ? 0.4 : 1)};
    &:hover {
      outline: ${props => !props.disabled ? "2px solid #000000" : "2px solid #b5b5b5"};
      background: ${props => !props.disabled ? "white" : "transparent"};
      color: ${props => !props.disabled ? "black" : "#b5b5b5"};
    }
`;


class EnterCluesState extends React.Component{
    constructor() {
        super();
        this.state = {
            currentGuesserId: null,
            specialGame: false,
            clue: '',
            clue2: '',
            currentWord: '',
            clueIsSent: false,
            players: []
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {

    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.currentGuesserId !== state.currentGuesserId || props.specialGame !== state.specialGame
            || props.players !== state.players
            || props.currentWord !== state.currentWord) {
            return {
                currentGuesserId: props.currentGuesserId,
                specialGame: props.specialGame,
                currentWord: props.currentWord,
                players: props.players
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    //returns true if user can submit a clue
    canSubmitClue(){
        if (!this.state.specialGame){
            if (this.state.clue.length > 0){
                if (this.state.clue.length <= 12){
                    return true;
                }
                return false;
            }
            return false;
        }
        else{
            if (this.state.clue.length > 0 && this.state.clue2.length > 0){
                if (this.state.clue.length <= 12 && this.state.clue2.length <= 12){
                    return true;
                }
                return false;
            }
            return false;
        }
    }

    renderForGuesser(){
        const guesser = this.state.currentGuesserId;
        const currentPlayer = localStorage.getItem("id");
        if (guesser.toString() === currentPlayer.toString()){
            return true;
        }
        return false;
    }

    hasSend(){
        for (let a in this.state.players){
            if (this.state.players[a].id === parseInt(localStorage.getItem('id'))){
                if(this.state.players[a].clueIsSent === true){
                   return true;
                }
            }
        }
        return false;
    }

    async submit(){
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token'),
                message: this.state.clue,
                message2: this.state.clue2
            })
            await api.put('/lobbies/' + localStorage.getItem('lobbyId') + '/game/clue', requestBody);
        }
        catch(error){
            alert(`Something went wrong during the voting \n${handleError(error)}`)
        }
        this.handleInputChange('clueIsSent', true)
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.canSubmitClue()){
            this.submit()
        }
    }

    render(){
        return(
            this.renderForGuesser() || this.hasSend()?
                <Wrapper style={{marginTop:"425px"}}>
                    <Wrapper1>
                        Your fellow players are currently entering clues
                    </Wrapper1>
                </Wrapper>
                :
                this.state.specialGame ?
                    <Wrapper>
                        <Container
                        marginTop="40px">
                            The word is:
                            <Text>{this.state.currentWord}</Text>
                            Enter two clues to help the guesser
                            <br/>
                            <div style={{display: "block"}}>
                                <InputField
                                    width = '80%'
                                    marginTop = '5px'
                                    placeholder= 'Your first clue...'
                                    color={"white"}
                                    onChange={e => {
                                        this.handleInputChange('clue', e.target.value)
                                    }}
                                >
                                </InputField>
                                <InputField
                                    id= "inputField"
                                    width = '80%'
                                    marginTop = '10px'
                                    placeholder= 'Your second clue...'
                                    color={"white"}
                                    onKeyDown={this._handleKeyDown}
                                    onChange={e => {
                                        this.handleInputChange('clue2', e.target.value)
                                    }}
                                >
                                </InputField>
                                <SubmitButton
                                    marginTop="-8px"
                                    disabled={!this.canSubmitClue()}
                                    onClick={()=>{this.submit()}}>
                                    Submit
                                </SubmitButton>
                            </div>
                        </Container>
                    </Wrapper>
                    :
                    <Wrapper>
                        <Container
                            marginTop="100px">
                            The word is:
                            <Text>{this.state.currentWord}</Text>
                            Enter a clue to help the guesser
                            <br/>
                                <div style={{display: "flex"}}>
                                <InputField width = '60%'
                                            marginTop = '10px'
                                            placeholder= 'Your clue...'
                                            color={"white"}
                                            onChange={e => {
                                                this.handleInputChange('clue', e.target.value)
                                            }}
                                            onKeyDown={this._handleKeyDown}
                                >
                                </InputField>
                                <PixelButton

                                    disabled={!this.canSubmitClue()}
                                    onClick={()=>{this.submit()}}>
                                    Submit
                                </PixelButton>
                                </div>
                        </Container>
                    </Wrapper>
        )
    }
}
export default withRouter(EnterCluesState);