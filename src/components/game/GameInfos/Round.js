import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Box = styled.div`
    border: 2px solid #c0c0c0;;
    width: 90px;
    height: auto;
    text-align: center;
    font-size: 18px;
    color: #c0c0c0;
`;

const Wrapper = styled.div`
    text-align: center;
    width: 90px;
    font-size: 18px;
    color: #c0c0c0;
`;



class Round extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rounds: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.rounds !== state.rounds) {
            return {
                rounds: props.rounds,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <Wrapper>
                ROUND
                <Box>
                    {this.state.rounds}/13
                </Box>
            </Wrapper>
        )
    }
}
export default withRouter(Round);