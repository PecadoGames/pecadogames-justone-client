import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";

const BackgroundContainer = styled.div`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
   `

class PictureLobby extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            interval: null,
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.getGame()
    }

    //only updates after the state changes
    shouldComponentUpdate(nextState) {
        if (this.state.players !== nextState.players) {
            return true;}
        return false
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render(){
    return(
        <div>
        <BackgroundContainer className = 'tablePlain'>
        </BackgroundContainer>
            <BackgroundContainer className= 'table'>
            </BackgroundContainer>
        </div>
        )
    }
}
export default withRouter(PictureLobby);