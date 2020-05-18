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

import ShyGuyLeftFrontGifViolet from "../Shyguys/Violet/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifViolet from "../Shyguys/Violet/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifViolet from "../Shyguys/Violet/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifViolet from "../Shyguys/Violet/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifViolet from "../Shyguys/Violet/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifViolet from "../Shyguys/Violet/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifBlue from "../Shyguys/Blue/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifBlue from "../Shyguys/Blue/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifBlue from "../Shyguys/Blue/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBlue from "../Shyguys/Blue/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBlue from "../Shyguys/Blue/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBlue from "../Shyguys/Blue/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifYellow from "../Shyguys/Yellow/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifYellow from "../Shyguys/Yellow/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifYellow from "../Shyguys/Yellow/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifYellow from "../Shyguys/Yellow/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifYellow from "../Shyguys/Yellow/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifYellow from "../Shyguys/Yellow/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifGreen from "../Shyguys/Green/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifGreen from "../Shyguys/Green/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifGreen from "../Shyguys/Green/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifGreen from "../Shyguys/Green/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifGreen from "../Shyguys/Green/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifGreen from "../Shyguys/Green/ShyGuyBehindRight.gif"

import ShyGuyLeftFrontGifRed from "../Shyguys/Red/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifRed from "../Shyguys/Red/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifRed from "../Shyguys/Red/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifRed from "../Shyguys/Red/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifRed from "../Shyguys/Red/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifRed from "../Shyguys/Red/ShyGuyBehindRight.gif"

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
   height: 700px;
   width: 800px
   margin: auto+400px;
   margin-top: 100px;
    `


const ImageContainer = styled.img`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
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
        if (this.state.gameState !== nextState.gameState || this.state.counter !== nextState.counter
            || this.state.players !== nextState.players) {
            return true;}
        return false
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    imageLeftFront(avatarColor){
        if(avatarColor === "PINK"){
            return( <ImageContainer src={ShyGuyLeftFrontGifPink}/>)
        }
        if(avatarColor === "GREEN"){
            return( <ImageContainer src={ShyGuyLeftFrontGifGreen}/>)
        }
        if(avatarColor === "RED"){
            return( <ImageContainer src={ShyGuyLeftFrontGifRed}/>)
        }
        if(avatarColor === "BLUE"){
            return( <ImageContainer src={ShyGuyLeftFrontGifBlue}/>)
        }
        if(avatarColor === "VIOLET"){
            return( <ImageContainer src={ShyGuyLeftFrontGifViolet}/>)
        }
        if(avatarColor === "YELLOW"){
            return( <ImageContainer src={ShyGuyLeftFrontGifYellow}/>)
        }

    }
    imageRightFront(avatarColor){
        if(avatarColor === "PINK"){
            return( <ImageContainer src={ShyGuyRightFrontGifPink}/>)
        }
        if(avatarColor === "GREEN"){
            return( <ImageContainer src={ShyGuyRightFrontGifGreen}/>)
        }
        if(avatarColor === "RED"){
            return( <ImageContainer src={ShyGuyRightFrontGifRed}/>)
        }
        if(avatarColor === "BLUE"){
            return( <ImageContainer src={ShyGuyRightFrontGifBlue}/>)
        }
        if(avatarColor === "VIOLET"){
            return( <ImageContainer src={ShyGuyRightFrontGifViolet}/>)
        }
        if(avatarColor === "YELLOW"){
            return( <ImageContainer src={ShyGuyRightFrontGifYellow}/>)
        }
    }
    imageLeftBehind(avatarColor){
        if(avatarColor === "PINK"){
            return( <ImageContainer src={ShyGuyLeftBehindGifPink}/>)
        }
        if(avatarColor === "GREEN"){
            return( <ImageContainer src={ShyGuyLeftBehindGifGreen}/>)
        }
        if(avatarColor === "RED"){
            return( <ImageContainer src={ShyGuyLeftBehindGifRed}/>)
        }
        if(avatarColor === "BLUE"){
            return( <ImageContainer src={ShyGuyLeftBehindGifBlue}/>)
        }
        if(avatarColor === "VIOLET"){
            return( <ImageContainer src={ShyGuyLeftBehindGifViolet}/>)
        }
        if(avatarColor === "YELLOW"){
            return( <ImageContainer src={ShyGuyLeftBehindGifYellow}/>)
        }
    }
    imageRightBehind(avatarColor){
        if(avatarColor === "PINK"){
            return( <ImageContainer src={ShyGuyRightBehindGifPink}/>)
        }
        if(avatarColor === "GREEN"){
            return( <ImageContainer src={ShyGuyRightBehindGifGreen}/>)
        }
        if(avatarColor === "RED"){
            return( <ImageContainer src={ShyGuyRightBehindGifRed}/>)
        }
        if(avatarColor === "BLUE"){
            return( <ImageContainer src={ShyGuyRightBehindGifBlue}/>)
        }
        if(avatarColor === "VIOLET"){
            return( <ImageContainer src={ShyGuyRightBehindGifViolet}/>)
        }
        if(avatarColor === "YELLOW"){
            return( <ImageContainer src={ShyGuyRightBehindGifYellow}/>)
        }
    }
    imageBehindLeft(avatarColor){
        if(avatarColor === "PINK"){
            return( <ImageContainer src={ShyGuyBehindLeftGifPink}/>)
        }
        if(avatarColor === "GREEN"){
            return( <ImageContainer src={ShyGuyBehindLeftGifGreen}/>)
        }
        if(avatarColor === "RED"){
            return( <ImageContainer src={ShyGuyBehindLeftGifRed}/>)
        }
        if(avatarColor === "BLUE"){
            return( <ImageContainer src={ShyGuyBehindLeftGifBlue}/>)
        }
        if(avatarColor === "VIOLET"){
            return( <ImageContainer src={ShyGuyBehindLeftGifViolet}/>)
        }
        if(avatarColor === "YELLOW"){
            return( <ImageContainer src={ShyGuyBehindLeftGifYellow}/>)
        }
    }
    imageBehindRight(avatarColor){
        if(avatarColor === "PINK"){
            return( <ImageContainer src={ShyGuyBehindRightGifPink}/>)
        }
        if(avatarColor === "GREEN"){
            return( <ImageContainer src={ShyGuyBehindRightGifGreen}/>)
        }
        if(avatarColor === "RED"){
            return( <ImageContainer src={ShyGuyBehindRightGifRed}/>)
        }
        if(avatarColor === "BLUE"){
            return( <ImageContainer src={ShyGuyBehindRightGifBlue}/>)
        }
        if(avatarColor === "VIOLET"){
            return( <ImageContainer src={ShyGuyBehindRightGifViolet}/>)
        }
        if(avatarColor === "YELLOW"){
            return( <ImageContainer src={ShyGuyBehindRightGifYellow}/>)
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