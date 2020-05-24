import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 200px;
    width: 470px;
    background-color: none;
    padding: 10px;
    text-align: center;
    margin-top: 412px;
    margin-left: 170px;
    display: flex;
    flex-direction: column;
    justify-content:center;
`;

const Wrapper1 = styled.div`
    display: flex;
    flex-direction: row;
    background-color: hsla(220, 3%, 19%, 0.8);
    width: 70%;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 50px;
    padding-right:10px;
    padding-left: 10px;
    margin-top: ${props => props.marginTop}
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
    height: auto;
    width: 300px;
    color: white;
    font-size: 24px;
`;

const HandContainer = styled.div`
  margin-left:300px;
  height:450px;
  width:450px;
  margin-top:218px;
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
        return false;
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

                    <HandContainer className={"smallHandWithCard"}>
                        <Container>
                            {this.state.number.map(n => {
                                return this.getButton(n)
                            })}
                        </Container>
                    </HandContainer>
                </div>
                :
                <Wrapper>
                    <Wrapper1
                    marginTop="30px">
                    <Text>Waiting for word to guess</Text>
                    </Wrapper1>
                </Wrapper>
        )
    }
}

export default withRouter(PickWordState);