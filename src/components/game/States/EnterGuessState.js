import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {InputField} from "../../../views/design/InputField";
import {api} from "../../../helpers/api";
import {Button} from "../../../views/design/Button";

const Wrapper = styled.div`
    height: 200px;
    width: 400px;
    background-color: #9c6f1c;
    padding: 10px;
    text-align: center;
    margin-top: 480px;
    margin-left: 200px;
    display: flex;
    flex-direction: column;
  
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
                userId: localStorage.getItem('id'),
                userToken: localStorage.getItem('token'),
                guess: this.state.guess
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
                    <Text>The Clues:</Text>
                    <Clues>
                        {this.state.clues.map(clue => {
                            return (<Clue>{clue.clue}</Clue>)})}
                    </Clues>
                    <br/>
                    <Text>Guess:</Text>
                    <InputField width = '350px'
                                marginTop = '10px'
                                placeholder= 'Enter your guess'
                                onChange={e => {
                                    this.handleInputChange('guess', e.target.value);

                                }}
                                onKeyDown={this._handleKeyDown}>

                    </InputField>
                    <Button
                        onClick={()=>this.submitGuess()}
                    >Submit
                    </Button>
                </Wrapper>
                :
                <Wrapper>
                    <Text>This is for the Submitter</Text>
                </Wrapper>



        )
    }
}
export default withRouter(EnterGuessState);