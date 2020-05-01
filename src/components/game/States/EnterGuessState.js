import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {InputField} from "../../../views/design/InputField";

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
            clues: []
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('clues', this.props.clues)
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.clues !== state.clues) {
            return {
                clues: props.clues,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <Wrapper>
                <Text>Your Clues:</Text>
                <Clues>
                {this.state.clues.map(clue => {
                return (<Clue>{clue.clue}</Clue>)})}
                </Clues>
                <Text>Guess:</Text>
                <InputField width = '350px'
                            marginTop = '30px'></InputField>
            </Wrapper>



        )
    }
}
export default withRouter(EnterGuessState);