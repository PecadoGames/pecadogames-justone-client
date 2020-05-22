import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import {api} from "../../../helpers/api";

import ShyGuyLeftFrontGifPink from "../Shyguys/Pink/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifPink from "../Shyguys/Pink/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifPink from "../Shyguys/Pink/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifPink from "../Shyguys/Pink/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifPink from "../Shyguys/Pink/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifPink from "../Shyguys/Pink/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifPinkReverse from "../../game/Shyguys/ReverseGifs/Pink/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifPinkReverse from "../../game/Shyguys/ReverseGifs/Pink/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifPinkReverse from "../../game/Shyguys/ReverseGifs/Pink/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifPinkReverse from "../../game/Shyguys/ReverseGifs/Pink/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifPinkReverse from "../../game/Shyguys/ReverseGifs/Pink/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifPinkReverse from "../../game/Shyguys/ReverseGifs/Pink/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifBot from "../Shyguys/Bot/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifBot from "../Shyguys/Bot/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifBot from "../Shyguys/Bot/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBot from "../Shyguys/Bot/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBot from "../Shyguys/Bot/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBot from "../Shyguys/Bot/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifBotReverse from "../../game/Shyguys/ReverseGifs/Bot/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifBotReverse from "../../game/Shyguys/ReverseGifs/Bot/ShyGuysRightFront.gif"
import ShyGuyLeftBehindGifBotReverse from "../../game/Shyguys/ReverseGifs/Bot/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBotReverse from "../../game/Shyguys/ReverseGifs/Bot/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBotReverse from "../../game/Shyguys/ReverseGifs/Bot/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBotReverse from "../../game/Shyguys/ReverseGifs/Bot/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifViolet from "../Shyguys/Violet/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifViolet from "../Shyguys/Violet/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifViolet from "../Shyguys/Violet/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifViolet from "../Shyguys/Violet/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifViolet from "../Shyguys/Violet/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifViolet from "../Shyguys/Violet/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifVioletReverse from "../../game/Shyguys/ReverseGifs/Violet/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifVioletReverse from "../../game/Shyguys/ReverseGifs/Violet/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifVioletReverse from "../../game/Shyguys/ReverseGifs/Violet/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifVioletReverse from "../../game/Shyguys/ReverseGifs/Violet/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifVioletReverse from "../../game/Shyguys/ReverseGifs/Violet/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifVioletReverse from "../../game/Shyguys/ReverseGifs/Violet/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifBlue from "../Shyguys/Blue/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifBlue from "../Shyguys/Blue/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifBlue from "../Shyguys/Blue/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBlue from "../Shyguys/Blue/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBlue from "../Shyguys/Blue/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBlue from "../Shyguys/Blue/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifBlueReverse from "../../game/Shyguys/ReverseGifs/Blue/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifBlueReverse from "../../game/Shyguys/ReverseGifs/Blue/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifBlueReverse from "../../game/Shyguys/ReverseGifs/Blue/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBlueReverse from "../../game/Shyguys/ReverseGifs/Blue/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBlueReverse from "../../game/Shyguys/ReverseGifs/Blue/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBlueReverse from "../../game/Shyguys/ReverseGifs/Blue/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifYellow from "../Shyguys/Yellow/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifYellow from "../Shyguys/Yellow/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifYellow from "../Shyguys/Yellow/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifYellow from "../Shyguys/Yellow/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifYellow from "../Shyguys/Yellow/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifYellow from "../Shyguys/Yellow/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifYellowReverse from "../../game/Shyguys/ReverseGifs/Yellow/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifYellowReverse from "../../game/Shyguys/ReverseGifs/Yellow/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifYellowReverse from "../../game/Shyguys/ReverseGifs/Yellow/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifYellowReverse from "../../game/Shyguys/ReverseGifs/Yellow/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifYellowReverse from "../../game/Shyguys/ReverseGifs/Yellow/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifYellowReverse from "../../game/Shyguys/ReverseGifs/Yellow/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifGreen from "../Shyguys/Green/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifGreen from "../Shyguys/Green/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifGreen from "../Shyguys/Green/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifGreen from "../Shyguys/Green/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifGreen from "../Shyguys/Green/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifGreen from "../Shyguys/Green/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifGreenReverse from "../../game/Shyguys/ReverseGifs/Green/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifGreenReverse from "../../game/Shyguys/ReverseGifs/Green/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifGreenReverse from "../../game/Shyguys/ReverseGifs/Green/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifGreenReverse from "../../game/Shyguys/ReverseGifs/Green/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifGreenReverse from "../../game/Shyguys/ReverseGifs/Green/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifGreenReverse from "../../game/Shyguys/ReverseGifs/Green/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifRed from "../Shyguys/Red/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifRed from "../Shyguys/Red/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifRed from "../Shyguys/Red/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifRed from "../Shyguys/Red/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifRed from "../Shyguys/Red/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifRed from "../Shyguys/Red/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifRedReverse from "../../game/Shyguys/ReverseGifs/Red/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifRedReverse from "../../game/Shyguys/ReverseGifs/Red/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifRedReverse from "../../game/Shyguys/ReverseGifs/Red/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifRedReverse from "../../game/Shyguys/ReverseGifs/Red/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifRedReverse from "../../game/Shyguys/ReverseGifs/Red/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifRedReverse from "../../game/Shyguys/ReverseGifs/Red/ShyGuyBehindRight.gif"

import ChairBehindLeft from "../Chairs/TableClosed/TischHintererStuhlLinks.png"
import ChairBehindRight from "../Chairs/TableClosed/TischHintererStuhlRechts.png"
import ChairLeftBehind from "../Chairs/TableClosed/TischLinkerHintererStuhl.png"
import ChairLeftFront from "../Chairs/TableClosed/TischLinkerVordererStuhl.png"
import ChairRightFront from "../Chairs/TableClosed/TischRechterVordererStuhl.png"
import ChairRightBehind from "../Chairs/TableClosed/TischRechterHintererStuhl.png"




const BackgroundContainer = styled.div`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 668px;
   width: 800px
   margin: auto+400px;
   margin-top: 100px;
    `


const ImageContainer = styled.img`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 668px;
   width: 800px
   margin: auto+400px;
   margin-top: 100px;

    `

class Picture extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            interval: null,
            gameState: null,
            currentGuesserId: null,
            counter: 0
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.getGame()
    }

    count(){
        let counter = 0
        for (let a in this.state.players){
            counter = counter + 1
        }
        this.handleInputChange('counter', counter)

    }

    //if we want to do something special with players or gameState
    async getGame(){
        try{
            this.state.interval = setInterval(async ()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game?token=${localStorage.getItem('token')}`);
                this.handleInputChange('currentGuesserId', response.data.currentGuesser.id);
                this.handleInputChange('gameState', response.data.gameState);
                const list = response.data.players
                const index = list.findIndex(x => x.id.toString() === localStorage.getItem('id'));
                if (index !== undefined) list.splice(index, 1);
                this.handleInputChange('players', list);
                this.count()}
                ,1000)
        }
        catch(error){
        }
    }

    //only updates after the state changes
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter || this.state.players !== nextState.players
            || this.state.gameState === 'END_GAME_STATE') {
            return true;}
        return false
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    imageLeftFront(avatarColor){
        if(avatarColor === "PINK" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifPink}/>)
        }
        if(avatarColor === "PINK" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifPinkReverse}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifBot}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifBotReverse}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifGreen}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifGreenReverse}/>)
        }
        if(avatarColor === "RED" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifRed}/>)
        }
        if(avatarColor === "RED" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifRedReverse}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifBlue}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifBlueReverse}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifViolet}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifVioletReverse}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifYellow}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftFrontGifYellowReverse}/>)
        }

    }
    imageRightFront(avatarColor){
        if(avatarColor === "PINK" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifPink}/>)
        }
        if(avatarColor === "PINK" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifPinkReverse}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifBot}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifBotReverse}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifGreen}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifGreenReverse}/>)
        }
        if(avatarColor === "RED" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifRed}/>)
        }
        if(avatarColor === "RED" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifRedReverse}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifBlue}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifBlueReverse}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifViolet}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifVioletReverse}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifYellow}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightFrontGifYellowReverse}/>)
        }
    }
    imageLeftBehind(avatarColor){
        if(avatarColor === "PINK" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifPink}/>)
        }
        if(avatarColor === "PINK" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifPinkReverse}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifBot}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifBotReverse}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifGreen}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifGreenReverse}/>)
        }
        if(avatarColor === "RED" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifRed}/>)
        }
        if(avatarColor === "RED" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifRedReverse}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifBlue}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifBlueReverse}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifViolet}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifVioletReverse}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifYellow}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyLeftBehindGifYellowReverse}/>)
        }
    }
    imageRightBehind(avatarColor){
        if(avatarColor === "PINK" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifPink}/>)
        }
        if(avatarColor === "PINK" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifPinkReverse}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifBot}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifBotReverse}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifGreen}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifGreenReverse}/>)
        }
        if(avatarColor === "RED" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifRed}/>)
        }
        if(avatarColor === "RED" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifRedReverse}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifBlue}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifBlueReverse}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifViolet}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifVioletReverse}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifYellow}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyRightBehindGifYellowReverse}/>)
        }
    }
    imageBehindLeft(avatarColor){
        if(avatarColor === "PINK" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifPink}/>)
        }
        if(avatarColor === "PINK" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifPinkReverse}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifBot}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifBotReverse}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifGreen}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifGreenReverse}/>)
        }
        if(avatarColor === "RED" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifRed}/>)
        }
        if(avatarColor === "RED" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifRedReverse}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifBlue}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifBlueReverse}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifViolet}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifVioletReverse}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifYellow}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindLeftGifYellowReverse}/>)
        }
    }
    imageBehindRight(avatarColor){
        if(avatarColor === "PINK" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifPink}/>)
        }
        if(avatarColor === "PINK" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifPinkReverse}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifBot}/>)
        }
        if(avatarColor === "BOT" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifBotReverse}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifGreen}/>)
        }
        if(avatarColor === "GREEN" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifGreenReverse}/>)
        }
        if(avatarColor === "RED" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifRed}/>)
        }
        if(avatarColor === "RED" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifRedReverse}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifBlue}/>)
        }
        if(avatarColor === "BLUE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifBlueReverse}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifViolet}/>)
        }
        if(avatarColor === "PURPLE" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifVioletReverse}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState !== 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifYellow}/>)
        }
        if(avatarColor === "YELLOW" && this.state.gameState === 'END_GAME_STATE'){
            return( <ImageContainer src={ShyGuyBehindRightGifYellowReverse}/>)
        }
    }


    render(){
    return(
        <div>
                    <BackgroundContainer className = 'tablePlain'>
                    </BackgroundContainer>
                    {this.state.counter > 5 ? this.imageBehindRight(this.state.players[5].avatarColor) : <ImageContainer src={ChairBehindRight}/>}
                    {this.state.counter > 4 ? this.imageBehindLeft(this.state.players[4].avatarColor) : <ImageContainer src={ChairBehindLeft}/>}
                    {this.state.counter > 3 ? this.imageRightBehind(this.state.players[3].avatarColor) : <ImageContainer src={ChairRightBehind}/>}
                    {this.state.counter > 2 ? this.imageLeftBehind(this.state.players[2].avatarColor) : <ImageContainer src={ChairLeftBehind}/>}
                    {this.state.counter > 1 ? this.imageRightFront(this.state.players[1].avatarColor) : <ImageContainer src={ChairRightFront}/>}
                    {this.state.counter > 0 ? this.imageLeftFront(this.state.players[0].avatarColor) : <ImageContainer src={ChairLeftFront}/>}
                    <BackgroundContainer className= 'table'>
                    </BackgroundContainer>
        </div>
        )
    }
}
export default withRouter(Picture);