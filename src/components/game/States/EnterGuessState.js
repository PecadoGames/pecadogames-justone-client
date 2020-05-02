import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {InputField} from "../../../views/design/InputField";
import {api} from "../../../helpers/api";
import {Button} from "../../../views/design/Button";

const Wrapper = styled.div`
    height: 200px;
    width: 470px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 420px;
    margin-left: 150px;
    display: flex;
    flex-direction: column;
`;

const Wrapper2 = styled.div`
    height: 200px;
    width: 600px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 530px;
    margin-left: 150px;
    text-align: center;
`;

const Wrapper1 = styled.div`
    display: inline;
    background-color: hsla(220, 3%, 19%, 0.8);
    width: 60%;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 85px;
`;


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

const Text = styled.div`
    font-size: 20px;
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
    font-size: 20px;
    color:black;
    transform:rotate(-3.5deg)
`;

const SignContainer = styled.div`
    width: 100%;
    height: 100%
    align-items: flex-start;
`;



const InputFieldGuess = styled(InputField)`
      
`;


class EnterGuessState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clues: [],
            guess: '',
            currentGuesserId: null
        };
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter'){
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

        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('clues', this.props.clues)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.guess !== nextState.guess){
            return false;}
        return true;
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.clues !== state.clues || props.currentGuesserId !== state.currentGuesserId) {
            return {
                clues: props.clues,
                currentGuesserId: props.currentGuesserId
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

                <Wrapper>
                    <Wrapper1>
                    <Text>Guess:</Text>
                    <InputFieldGuess
                                width={"60%"}
                                placeholder= 'Your guess...'
                                onChange={e => {
                                    this.handleInputChange('guess', e.target.value);

                                }}
                                onKeyDown={this._handleKeyDown}>

                    </InputFieldGuess>
                    <Button
                        onClick={()=>this.submitGuess()}
                    >Submit
                    </Button>
                    </Wrapper1>
                    <div>
                        <SignContainer>
                            {this.state.clues.map(clue => {
                                return (<SignLeft className={"guess-sign-left"}><TextSignLeft>{clue.clue}</TextSignLeft></SignLeft>)})}
                        </SignContainer>
                    </div>
                </Wrapper>
                :
                    <Wrapper2>
                        <SignContainer>
                            {this.state.clues.map(clue => {
                                return (<SignLeft className={"guess-sign-left"}><TextSignLeft>{clue.clue}</TextSignLeft></SignLeft>)})}
                        </SignContainer>
                    </Wrapper2>
        )
    }
}
export default withRouter(EnterGuessState);