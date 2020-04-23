import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {Events} from "react-scroll";

class Timer extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null,
            interval: null,
            timer: 0
        };
    }


    async getTimer(){
        this.state.interval = setInterval(async()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game/timer`);
            this.setState({['timer']: response.data});
        }, 500)
    }


    componentDidMount() {
        this.getTimer().then(r => {});

    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }


    render(){
        return( <div>Timer: {this.state.timer}</div> )
    }
}
export default withRouter(Timer);