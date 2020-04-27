import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import PickWord from "./PickWord";


const BackgroundContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
    `

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: bottom;
   height: 350px;
   width: 400px
`

class Picture extends React.Component{
    constructor(props) {
        super(props);
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

    static getDerivedStateFromProps(props, state) {
        if (props.players !== state.players || props.gameState !== state.gameState ) {
            return {
                players: props.players,
                gameState: props.gameState
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
    return(
        <BackgroundContainer className = 'lobbyBackground'>
            <Container>
                {this.state.gameState}
            </Container>
            {this.state.gameState==="PICKWORDSTATE"? (<PickWord pickWordFunction={this.props.pickWordFunction}/>):(<div></div>)}
            {this.state.gameState==="ENTERCLUESTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="NLPSTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="VOTEONCLUESTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="TRANSITIONSTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="ENTERGUESSSTATE"? (<div></div>):(<div></div>)}
            {this.state.gameState==="ENDGAMESTATE"? (<div></div>):(<div></div>)}
        </BackgroundContainer>



    )
}
}
export default withRouter(Picture);