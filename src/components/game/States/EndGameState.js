import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Text = styled.div`
    font-size: 40px;
    margin-top: 600px;
    margin-left: 200px;
`;

class EndGameState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectName: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('selectName', this.props.selectName)
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.selectName !== state.selectName) {
            return {
                selectName: props.selectName,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <div>
                <text>EndGame</text>
                <br/>
                <text>You will be redirected to the lobby in a few seconds</text>
                <Text>Hurray the game is over!</Text>
            </div>

        )
    }
}
export default withRouter(EndGameState);