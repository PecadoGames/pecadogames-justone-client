import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";


const BackgroundContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
    `



class Picture extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            gameState: '',
            currentGuesserId: null,


        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('players', this.props.players)
        this.handleInputChange('gameState', this.props.gameState)
        this.handleInputChange('currentGuesserId', this.props.currentGuesserId)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.players !== state.players || props.gameState !== state.gameState
            || props.currentGuesserId !== state.currentGuesserId) {
            return {
                players: props.players,
                gameState: props.gameState,
                currentGuesserId: props.currentGuesserId
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    render(){
    return(
        <BackgroundContainer className = 'lobbyBackground'>
        </BackgroundContainer>
        )
    }
}
export default withRouter(Picture);