import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";

const Box = styled.div`
    border: 2px solid white;
    width: 90px;
    height: auto;
    text-align: center;
    font-size: 18px;
    color: white;
`;

const NormalTime = styled.text`
    font-size: 32px;
    color: white;
`;

const TimerLow = styled(NormalTime)`
    color: #ad151c;
`;

const Wrapper = styled.div`
    text-align: center;
    width: 90px;
    font-size: 18px;
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
        else if (this.state.timer >= 10){
            return <NormalTime>00:{this.state.timer}</NormalTime>
        }
        else{
            return <TimerLow>00:00</TimerLow>
        }
    }

    render(){
        return(
            <Wrapper>
                TIME
                <Box>
                    {this.displayTime()}
                </Box>
            </Wrapper>
        )
    }
}
export default withRouter(Timer);