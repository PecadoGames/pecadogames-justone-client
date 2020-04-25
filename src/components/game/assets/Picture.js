import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";


const BottomRightContainer = styled.div`
display: flex;
flex-direction: column;
align-items: left;
height: 700px;
width: 800px
    `

class Picture extends React.Component{
    constructor() {
        super();
        this.state = {
            players: null,
            gameState: '',
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('players', this.props.players)
        this.handleInputChange('gameState', this.props.gameState)
    }


    render(){
    return(
        <BottomRightContainer className = 'lobbyBackground'>
        </BottomRightContainer>



    )
}
}
export default withRouter(Picture);