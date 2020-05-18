import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import {api} from "../../helpers/api";

//Pink
import ShyGuyLeftFrontGifPink from "../game/Shyguys/Pink/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifPink from "../game/Shyguys/Pink/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifPink from "../game/Shyguys/Pink/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifPink from "../game/Shyguys/Pink/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifPink from "../game/Shyguys/Pink/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifPink from "../game/Shyguys/Pink/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifPinkReverse from "../game/Shyguys/ReverseGifs/Pink/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifPinkReverse from "../game/Shyguys/ReverseGifs/Pink/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifPinkReverse from "../game/Shyguys/ReverseGifs/Pink/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifPinkReverse from "../game/Shyguys/ReverseGifs/Pink/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifPinkReverse from "../game/Shyguys/ReverseGifs/Pink/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifPinkReverse from "../game/Shyguys/ReverseGifs/Pink/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontPink from "../game/Shyguys/Fixed/Pink/LeftFrontPink.png"
import ShyGuyRightFrontPink from "../game/Shyguys/Fixed/Pink/RightFrontPink.png"
import ShyGuyLeftBehindPink from "../game/Shyguys/Fixed/Pink/LeftBehindPink.png"
import ShyGuyRightBehindPink from "../game/Shyguys/Fixed/Pink/RightBehindPink.png"
import ShyGuyBehindLeftPink from "../game/Shyguys/Fixed/Pink/BehindLeft.png"
import ShyGuyBehindRightPink from "../game/Shyguys/Fixed/Pink/BehindRightPink.png"

//Violet
import ShyGuyLeftFrontGifViolet from "../game/Shyguys/Violet/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifViolet from "../game/Shyguys/Violet/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifViolet from "../game/Shyguys/Violet/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifViolet from "../game/Shyguys/Violet/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifViolet from "../game/Shyguys/Violet/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifViolet from "../game/Shyguys/Violet/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifVioletReverse from "../game/Shyguys/ReverseGifs/Violet/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifVioletReverse from "../game/Shyguys/ReverseGifs/Violet/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifVioletReverse from "../game/Shyguys/ReverseGifs/Violet/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifVioletReverse from "../game/Shyguys/ReverseGifs/Violet/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifVioletReverse from "../game/Shyguys/ReverseGifs/Violet/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifVioletReverse from "../game/Shyguys/ReverseGifs/Violet/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontViolet from "../game/Shyguys/Fixed/Violet/LeftFrontViolet.png"
import ShyGuyRightFrontViolet from "../game/Shyguys/Fixed/Violet/RightFrontViolet.png"
import ShyGuyLeftBehindViolet from "../game/Shyguys/Fixed/Violet/LeftBehindViolet.png"
import ShyGuyRightBehindViolet from "../game/Shyguys/Fixed/Violet/RightBehindViolet.png"
import ShyGuyBehindLeftViolet from "../game/Shyguys/Fixed/Violet/BehindLeft.png"
import ShyGuyBehindRightViolet from "../game/Shyguys/Fixed/Violet/BehindRightViolet.png"

//Blue
import ShyGuyLeftFrontGifBlue from "../game/Shyguys/Blue/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifBlue from "../game/Shyguys/Blue/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifBlue from "../game/Shyguys/Blue/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBlue from "../game/Shyguys/Blue/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBlue from "../game/Shyguys/Blue/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBlue from "../game/Shyguys/Blue/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifBlueReverse from "../game/Shyguys/ReverseGifs/Blue/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifBlueReverse from "../game/Shyguys/ReverseGifs/Blue/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifBlueReverse from "../game/Shyguys/ReverseGifs/Blue/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifBlueReverse from "../game/Shyguys/ReverseGifs/Blue/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifBlueReverse from "../game/Shyguys/ReverseGifs/Blue/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifBlueReverse from "../game/Shyguys/ReverseGifs/Blue/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontBlue from "../game/Shyguys/Fixed/Blue/LeftFrontBlue.png"
import ShyGuyRightFrontBlue from "../game/Shyguys/Fixed/Blue/RightFrontBlue.png"
import ShyGuyLeftBehindBlue from "../game/Shyguys/Fixed/Blue/LeftBehindBlue.png"
import ShyGuyRightBehindBlue from "../game/Shyguys/Fixed/Blue/RightBehindBlue.png"
import ShyGuyBehindLeftBlue from "../game/Shyguys/Fixed/Blue/BehindLeft.png"
import ShyGuyBehindRightBlue from "../game/Shyguys/Fixed/Blue/BehindRightBlue.png"

//Yellow
import ShyGuyLeftFrontGifYellow from "../game/Shyguys/Yellow/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifYellow from "../game/Shyguys/Yellow/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifYellow from "../game/Shyguys/Yellow/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifYellow from "../game/Shyguys/Yellow/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifYellow from "../game/Shyguys/Yellow/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifYellow from "../game/Shyguys/Yellow/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifYellowReverse from "../game/Shyguys/ReverseGifs/Yellow/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifYellowReverse from "../game/Shyguys/ReverseGifs/Yellow/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifYellowReverse from "../game/Shyguys/ReverseGifs/Yellow/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifYellowReverse from "../game/Shyguys/ReverseGifs/Yellow/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifYellowReverse from "../game/Shyguys/ReverseGifs/Yellow/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifYellowReverse from "../game/Shyguys/ReverseGifs/Yellow/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontYellow from "../game/Shyguys/Fixed/Yellow/LeftFrontYellow.png"
import ShyGuyRightFrontYellow from "../game/Shyguys/Fixed/Yellow/RightFront.png"
import ShyGuyLeftBehindYellow from "../game/Shyguys/Fixed/Yellow/LeftBehindYellow.png"
import ShyGuyRightBehindYellow from "../game/Shyguys/Fixed/Yellow/RightBehindYellow.png"
import ShyGuyBehindLeftYellow from "../game/Shyguys/Fixed/Yellow/BehindYellow.png"
import ShyGuyBehindRightYellow from "../game/Shyguys/Fixed/Yellow/BehindRightYellow.png"

//Green
import ShyGuyLeftFrontGifGreen from "../game/Shyguys/Green/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifGreen from "../game/Shyguys/Green/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifGreen from "../game/Shyguys/Green/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifGreen from "../game/Shyguys/Green/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifGreen from "../game/Shyguys/Green/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifGreen from "../game/Shyguys/Green/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifGreenReverse from "../game/Shyguys/ReverseGifs/Green/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifGreenReverse from "../game/Shyguys/ReverseGifs/Green/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifGreenReverse from "../game/Shyguys/ReverseGifs/Green/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifGreenReverse from "../game/Shyguys/ReverseGifs/Green/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifGreenReverse from "../game/Shyguys/ReverseGifs/Green/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifGreenReverse from "../game/Shyguys/ReverseGifs/Green/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGreen from "../game/Shyguys/Fixed/Green/LeftFrontGreen.png"
import ShyGuyRightFrontGreen from "../game/Shyguys/Fixed/Green/RightFrontGreen.png"
import ShyGuyLeftBehindGreen from "../game/Shyguys/Fixed/Green/LeftBehindGreen.png"
import ShyGuyRightBehindGreen from "../game/Shyguys/Fixed/Green/RightBehindGreen.png"
import ShyGuyBehindLeftGreen from "../game/Shyguys/Fixed/Green/BehindLeft.png"
import ShyGuyBehindRightGreen from "../game/Shyguys/Fixed/Green/BehindRightGreen.png"

//Red
import ShyGuyLeftFrontGifRed from "../game/Shyguys/Red/ShyguyLeftFront.gif"
import ShyGuyRightFrontGifRed from "../game/Shyguys/Red/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifRed from "../game/Shyguys/Red/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifRed from "../game/Shyguys/Red/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifRed from "../game/Shyguys/Red/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifRed from "../game/Shyguys/Red/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontGifRedReverse from "../game/Shyguys/ReverseGifs/Red/ShyGuyLeftFront.gif"
import ShyGuyRightFrontGifRedReverse from "../game/Shyguys/ReverseGifs/Red/ShyGuyRightFront.gif"
import ShyGuyLeftBehindGifRedReverse from "../game/Shyguys/ReverseGifs/Red/ShyGuyLeftBehind.gif"
import ShyGuyRightBehindGifRedReverse from "../game/Shyguys/ReverseGifs/Red/ShyGuyRightBehind.gif"
import ShyGuyBehindLeftGifRedReverse from "../game/Shyguys/ReverseGifs/Red/ShyGuyBehindLeft.gif"
import ShyGuyBehindRightGifRedReverse from "../game/Shyguys/ReverseGifs/Red/ShyGuyBehindRight.gif"
import ShyGuyLeftFrontRed from "../game/Shyguys/Fixed/Red/LeftFrontRed.png"
import ShyGuyRightFrontRed from "../game/Shyguys/Fixed/Red/RightFrontRed.png"
import ShyGuyLeftBehindRed from "../game/Shyguys/Fixed/Red/LeftBehindRed.png"
import ShyGuyRightBehindRed from "../game/Shyguys/Fixed/Red/RightBehindRed.png"
import ShyGuyBehindLeftRed from "../game/Shyguys/Fixed/Red/BehindLeft.png"
import ShyGuyBehindRightRed from "../game/Shyguys/Fixed/Red/BehindRightRed.png"

import ChairBehindLeft from "../game/Chairs/TableClosed/TischHintererStuhlLinks.png"
import ChairBehindRight from "../game/Chairs/TableClosed/TischHintererStuhlRechts.png"
import ChairLeftBehind from "../game/Chairs/TableClosed/TischLinkerHintererStuhl.png"
import ChairLeftFront from "../game/Chairs/TableClosed/TischLinkerVordererStuhl.png"
import ChairRightFront from "../game/Chairs/TableClosed/TischRechterVordererStuhl.png"
import ChairRightBehind from "../game/Chairs/TableClosed/TischRechterHintererStuhl.png"




const BackgroundContainer = styled.div`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
    `


const ImageContainer = styled.img`
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
            player1: false,
            player1Copy: false,
            player2: false,
            player2Copy: false,
            player3: false,
            player3Copy: false,
            player4: false,
            player4Copy: false,
            player5: false,
            player5Copy: false,
            player6: false,
            player6Copy: false
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }



    componentDidMount() {
        this.getGame()
    }





    //only updates after the state changes
    shouldComponentUpdate(nextProps, nextState, nextContext) {
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