import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 200px;
    width: 400px;
    background-color: #9c6f1c;
    padding: 10px;
    text-align: center;
    margin-left: 200px;
    margin-top: 480px;
    bottom: 21px;
    left: 0px;
`;

const Container = styled.div`
    display: table;
    column-count: 1;
    row-count: 5;
    width: 200px;
    position: relative;
    top: 12px;
    left: 13px;
`;

const Text = styled.div`
    text-align: center;
    position: relative;
    top: 150px;
    font-size: 36px;
    border: 1px solid black;
`;

const HandContainer = styled.div`
  margin-left:300px;
  height:445px;
  width:450px;
  margin-top:200px;
`;

const PickWordButton = styled.button`
    width:150px;
    height:30px;
    margin-top: 7px;
    margin-left: 15px;
    font-size: 20px;
    text-shadow: 1px 1px 0px #4f4f4f;
    background-color:transparent;
    display: inline-block
    color: black;
    padding-top:0px;
    padding-bottom: 5px;
    border:2px solid;
    &:hover {
        background: #d9d9d9;
    }
    border-color: ${props => props.borderColor|| "black"};
`;

class PickWordState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentGuesserId: null,
            number: [1, 2, 3, 4, 5]
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
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


    componentDidMount() {

    }

    getButton(n){
        switch (n){
            case 1:
                return <PickWordButton borderColor="#0bb845" onClick={()=>{this.submitWord(n)}}
                >?????</PickWordButton>
            case 2:
                return <PickWordButton borderColor="#2273f5" onClick={()=>{this.submitWord(n)}}>
                    ?????</PickWordButton>
            case 3:
                return <PickWordButton onClick={()=>{this.submitWord(n)}}>?????</PickWordButton>
            case 4:
                return <PickWordButton borderColor="#c73110" onClick={()=>{this.submitWord(n)}}>
                    ?????</PickWordButton>
            case 5:
                return <PickWordButton borderColor="#e0dd16" onClick={()=>{this.submitWord(n)}}>
                    ?????</PickWordButton>
            default:
                return alert("Sorry, the word you tried to pick does not exist")
        }
    }

    async submitWord(number){
        this.props.pickWordFunction(number);
    }

    render(){
        return(
            this.renderForGuesser() ?
                <div>
                    <Text>Pick a word to start the game</Text>
                    <HandContainer className={"smallHandWithCard"}>
                        <Container>
                            {this.state.number.map(n => {
                                return this.getButton(n)
                            })}
                        </Container>
                    </HandContainer>
                </div>
                :
                <div>
                    <Text>The guesser is currently picking a word</Text>
                </div>
        )
    }
}

export default withRouter(PickWordState);