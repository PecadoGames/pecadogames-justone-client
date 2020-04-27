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
`;

const Container = styled.div`
    display: inline;
    column-count: 5;
`;

const NumberButton = styled.button`
    margin-right: 20px;
    margin-left: 10px;
    border: 2px solid black;
    height: 40px;
    width: 40px;
`;

const Text = styled.body`
    font-size: 36px;
    border: 1px solid black;
`;

class PickWord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null,
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {

    }

    async submitWord(number){
        this.props.pickWordFunction(number);
    }

    render(){
        return(
            <Wrapper>
                <Text>Pick a number to start the game</Text>
                <Container>
                    <NumberButton
                        onClick={()=>this.submitWord(1)}
                    >1</NumberButton>
                    <NumberButton
                        onClick={()=>this.submitWord(2)}
                    >2</NumberButton>
                    <NumberButton
                        onClick={()=>this.submitWord(3)}
                    >3</NumberButton>
                    <NumberButton
                        onClick={()=>this.submitWord(4)}
                    >4</NumberButton>
                    <NumberButton
                        onClick={()=>this.submitWord(5)}
                    >5</NumberButton>
                </Container>
            </Wrapper>
        )
    }
}

export default withRouter(PickWord);