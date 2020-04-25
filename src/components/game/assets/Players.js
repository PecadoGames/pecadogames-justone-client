import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";


const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 300px;
  width: 400px
 `

class Players extends React.Component{
    constructor() {
        super();
        this.state = {
            players: [],
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('players', this.props.players)

    }


    render(){
        return(
            <PlayersContainer>
                {this.state.players.map(player => {return(
                    <PlayerContainer>
                        <div>Username: {player.username}</div>
                        <div>Status: {player.status}</div>
                        </PlayerContainer>
                )})}

            </PlayersContainer>
        )
    }
}
export default withRouter(Players);