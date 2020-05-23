import {withRouter} from "react-router-dom";
import React from "react";
import {InputField} from "../../../views/design/InputField";
import {Button} from "../../../views/design/Button";
import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 195px;
    width: 460px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 380px;
    margin-left: 220px;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    padding-top: 10px;
    margin-top: 20px;
    height: auto;
    width: 300px;
    background-color: hsla(220, 3%, 19%, 0.8);
    border: 2px solid black;
    color: white;
    border-radius: 8px;
    border: 2px solid black;
`;

const Wrapper1 = styled.div`
    margin-top: 20px;
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

const SubmitButton = styled.div`
     height: 35px;
     cursor: ${props => (props.disabled ? "default" : "pointer")};
     opacity: ${props => (props.disabled ? 0.4 : 1)};
     background-color: #2e2d2c;
     border: 2px solid black;
     margin-top: 10px;
     padding-top: 5px;
     color: white;
     border-radius: 3px;
     margin-left: ${props => (props.marginLeft || "0px")}
     width: ${props => (props.width || "80px")}
     margin-bottom: 20px;
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





    renderForGuesser(){
        const guesser = this.state.currentGuesserId;
        const currentPlayer = localStorage.getItem("id");
        if (guesser.toString() === currentPlayer.toString()){
            return true;
        }
        else {return false;}
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
        if (e.key === 'Enter'){
            this.submit()
        }
    }

    render(){
        return(
            this.renderForGuesser() || this.hasSend()?
                <Wrapper style={{marginTop:"425px"}}>
                    <Wrapper1>
                        Your team mates are currently entering clues
                    </Wrapper1>
                </Wrapper>
                :
                this.state.specialGame ?
                    <Wrapper>
                        <Container>
                            The word is:
                            <Text>{this.state.currentWord}</Text>
                            Enter two clues to help your mate
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
                                    marginLeft = '22px'
                                    width = '250px'
                                    disabled={!(this.state.clue && this.state.clue2)}
                                    onClick={()=>{this.submit()}}>
                                    Submit
                                </SubmitButton>
                            </div>
                        </Container>
                    </Wrapper>
                    :
                    <Wrapper>
                        <Container>
                            The word is:
                            <Text>{this.state.currentWord}</Text>
                            Enter a clue to help your mate
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
                                <SubmitButton
                                    width = '80px'
                                    disabled={!this.state.clue}
                                    onClick={()=>{this.submit()}}>
                                    Submit
                                </SubmitButton>
                                </div>
                        </Container>
                    </Wrapper>
        )
    }
}
export default withRouter(EnterCluesState);