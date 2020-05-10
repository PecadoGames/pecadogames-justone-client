import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";

const Box = styled.div`
    border: 2px solid white;
    width: 110px;
    height: auto;
    text-align: center;
`;

const NormalTime = styled.text`
    font-size: 40px;
    color: white;
`;

const TimerLow = styled(NormalTime)`
    color: #ad151c;
`;

class Timer extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null,
            interval: null,
            timer: null
        };
    }

    //gets time every half a second
    async getTimer(){
        this.state.interval = setInterval(async()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game/timer?token=${localStorage.getItem('token')}`);
            this.setState({['timer']: response.data}
           );
        }, 500)
    }


    componentDidMount() {
        this.getTimer().then(r => {});

    }

    //clears interval so it stops sending after page redirection
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    displayTime(){
        if (this.state.timer < 10){
            return <TimerLow>00:0{this.state.timer}</TimerLow>
        }
        else{
            return <NormalTime>00:{this.state.timer}</NormalTime>
        }
    }

    render(){
        return(
            <Box>{this.displayTime()}</Box>
        )
    }
}
export default withRouter(Timer);