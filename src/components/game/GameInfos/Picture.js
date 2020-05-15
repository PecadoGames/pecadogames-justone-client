import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import ShyGuy from "../Shyguys/shyguy-gif-1.gif"
import {api} from "../../../helpers/api";
import commercial from "../../login/assets/CommercialFunnyMusic.mp3";
import Sound from "react-sound";


const BackgroundContainer = styled.div`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
   margin-top: 100px;
   margin-left: 400px;
    `


const ShyGuyOne = styled.img`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   margin-top: 380px;
   margin-left: 400px;
   `




class Picture extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            interval: null,
            gameState: null,
            currentGuesserId: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.getGame()
    }

    //if we want to do something special with players or gameState
    async getGame(){
        try{
            this.state.interval = setInterval(async ()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game?token=${localStorage.getItem('token')}`);
                this.handleInputChange('currentGuesserId', response.data.currentGuesser.id);
                this.handleInputChange('gameState', response.data.gameState);
                this.handleInputChange('players', response.data.players);}
                ,1000)
        }
        catch(error){
        }
    }

    //only updates after the state changes
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.gameState !== nextState.gameState) {
            return true;}
        return false
    }


    render(){
    return(
        <div>
        <BackgroundContainer className = 'lobbyBackground'>
            <ShyGuyOne src={ShyGuy}></ShyGuyOne>
        </BackgroundContainer>
        <BackgroundContainer className= 'table'>
        </BackgroundContainer>
        </div>
        )
    }
}
export default withRouter(Picture);