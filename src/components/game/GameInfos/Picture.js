import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import {api} from "../../../helpers/api";
import ShyGuyRightFront from "../Shyguys/Red/ShyGuyRightFront.png"
import ShyGuyRightBehind from "../Shyguys/Red/ShyGuyRightBehind.png"
import ShyGuyLeftFront from "../Shyguys/Red/ShyGuyLeftFront.png"
import ShyGuyLeftBehind from "../Shyguys/Red/ShyGuyLeftBehind.png"
import ShyGuyBehindRight from "../Shyguys/Red/ShyGuyBehindRight.png"
import ShyGuyBehindLeft from "../Shyguys/Red/ShyGuyBehindLeft.png"
import ChairBehindLeft from "../Chairs/TableClosed/TischHintererStuhlLinks.png"
import ChairBehindRight from "../Chairs/TableClosed/TischHintererStuhlRechts.png"
import ChairLeftBehind from "../Chairs/TableClosed/TischLinkerHintererStuhl.png"
import ChairLeftFront from "../Chairs/TableClosed/TischLinkerVordererStuhl.png"
import ChairRightFront from "../Chairs/TableClosed/TischRechterVordererStuhl.png"
import ChairRightBehind from "../Chairs/TableClosed/TischRechterHintererStuhl.png"
import ChairRightFrontOPEN from "../Chairs/TableOpen/RightFrontChairOPEN.png"
import ChairLeftFrontOPEN from "../Chairs/TableOpen/LeftFrontChairOPEN.png"




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


const ImageContainer = styled.img`
   position: absolute
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
   margin-top: 100px;
   margin-left: 400px;
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
                this.handleInputChange('players', response.data.players);
                this.count()}
                ,1000)
        }
        catch(error){
        }
    }

    //only updates after the state changes
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.gameState !== nextState.gameState || this.state.counter !== nextState.counter) {
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
            <ImageContainer src={ChairBehindLeft}>
            </ImageContainer>
            <ImageContainer src={ChairBehindRight}>
            </ImageContainer>
            <ImageContainer src={ChairLeftBehind}>
            </ImageContainer>


            {this.state.counter > 1 ? <ImageContainer src={ChairLeftFrontOPEN}>
            </ImageContainer>: null}
            <ImageContainer src={ChairRightBehind}>
            </ImageContainer>
            {this.state.counter > 2 ? <ImageContainer src={ChairRightFrontOPEN}>
            </ImageContainer>: null}


            {this.state.counter < 3 ? <ImageContainer src={ChairRightFront}>
            </ImageContainer>: null}
            <ImageContainer src={ChairRightBehind}>
            </ImageContainer>
            {this.state.counter < 2 ? <ImageContainer src={ChairLeftFront}>
            </ImageContainer>: null}

            {this.state.counter >6 ?<ImageContainer src={ShyGuyBehindLeft}>
            </ImageContainer>: null}
            {this.state.counter >5 ? <ImageContainer src={ShyGuyBehindRight}>
            </ImageContainer> : null}
            {this.state.counter >3 ?<ImageContainer src={ShyGuyLeftBehind}>
            </ImageContainer>: null}
            {this.state.counter >1 ?<ImageContainer src={ShyGuyLeftFront}>
            </ImageContainer>: null}
            {this.state.counter >4 ?<ImageContainer src={ShyGuyRightBehind}>
            </ImageContainer>: null}
            {this.state.counter >2 ?<ImageContainer src={ShyGuyRightFront}>
            </ImageContainer>: null}

            <BackgroundContainer className= 'table'>
            </BackgroundContainer>


        </div>
        )
    }
}
export default withRouter(Picture);