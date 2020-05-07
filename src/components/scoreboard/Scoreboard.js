import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import InviteLobbyPhone from "../lobby/InviteLobbyPhone";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 700px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const ScoreContainer = styled.div`
  position: absolute;
  background: black;
  height: 238px;
  width: 195px;
  margin-left: ${props => props.marginLeft|| "0px"};
  margin-top: 147px;
  column-count:2;
`;

const ScoreTextLeft = styled.body`
    align-text: left;
    font-size: 24px;
    color: white;
    padding: 3px;
`;

const ScoreTextRight = styled(ScoreTextLeft)`
    align-text: right;
    float: right;
`;


class Scoreboard extends React.Component{
    constructor() {
        super();
        this.state = {
            phone: null
        };
    }

    async componentDidMount() {   this.lobby()

    }

    lobby(){
        this.state.phone = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.phone)
    }

    render() {
        return(
            <Background className={"scoreboard"}>
                <ScoreContainer
                    marginLeft={"215px"}>
                    <ScoreTextLeft>bruh</ScoreTextLeft>
                    <ScoreTextLeft>brudi</ScoreTextLeft>
                    <ScoreTextLeft>bruder</ScoreTextLeft>
                    <ScoreTextRight>420</ScoreTextRight>
                    <ScoreTextRight>69</ScoreTextRight>
                    <ScoreTextRight>-666</ScoreTextRight>
                </ScoreContainer>
                <ScoreContainer
                    marginLeft={"581px"}>
                </ScoreContainer>
                <InviteLobbyPhone changePhoneToOff={this.props.changePhoneToOff}
                                  changePhoneToOn={this.props.changePhoneToOn}
                                  changeTalkingToOff={this.props.changeTalkingToOff}
                                  changeTalkingToOn={this.props.changeTalkingToOn}
                >
                </InviteLobbyPhone>
            </Background>

        );
    }
}

export default withRouter(Scoreboard);
