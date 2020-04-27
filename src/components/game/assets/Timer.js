import {api, handleError} from "../../../helpers/api";

import React from "react";
import {withRouter} from "react-router-dom";


class Timer extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null,
            interval: null,
            timer: 0
        };
    }

    //gets time every half a second
    async getTimer(){
        this.state.interval = setInterval(async()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/game/timer?token=${localStorage.getItem('token')}`);
            this.setState({['timer']: response.data});
        }, 500)
    }


    componentDidMount() {
        this.getTimer().then(r => {});

    }

    //clears interval so it stops sending after page redirection
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }


    render(){
        return( <div>Timer: {this.state.timer}</div> )
    }
}
export default withRouter(Timer);