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
  height: 243px;
  width: 195px;
  overflow-x: hidden;
  margin-left: ${props => props.marginLeft|| "0px"};
  margin-top: 147px;
  text-align: center;
  overflow-y: scroll;
`;

const ScoreTextLeft = styled.body`
    width: 75px;
    overflow: hidden;
    text-align: left;
    font-size: 24px;
    color: white;
    float: left;
    margin-left: 3px;
    margin-right: 3px;
`;

const ScoreTextRight = styled(ScoreTextLeft)`
    text-align: right;
    float: right;
`;

const NeonButton = styled.button`
    position: absolute;
    top: 5px;
    left: 5px;
    z: 3;
    height: 50px;
    width: 100px;
    display: inline-block;
    color: #008000
    letter-space: 2px;
    text-transform: uppercase;
    font-size: 30px;
    overflow: hidden;
    background: none;
    border: none;
    &:hover {
        color: ${props => props.color || '#111'}
        background: ${props => props.background || '#39ff14'}
        box-shadow: ${props => props.boxShadow || '0 0 50px #39ff14'}
  }
`;

const Wrapper = styled.div`
    display: inline-block;
    width: 170px;
    height: 40px;
    border-top: 1px solid white;
    margin-bottom: 5px;
`;

const Title = styled.div`
    text-align: center;
    width: 100%;
    margin: center;
`;



class Scoreboard extends React.Component{
    constructor() {
        super();
        this.state = {
            phone: null,
            users: [],
            lobbies: []
        };
    }

    componentDidMount() {
        this.lobby()
        this.getUsers()
        this.getLobbies()
    }

    async getUsers(){
        const response = await api.get('/users')
        let parsedUsers = response.data
        /**
         for (let user in parsedUsers){
            let indexResponse = parsedUsers.findIndex(x => x.id === parsedUsers[user].id)
            if (indexResponse !== undefined || indexResponse !== -1) parsedUsers.splice(indexResponse, 1);
        }
         parsedUsers.sort(function (a, b){
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });**/
        this.setState({['users']: parsedUsers})
    }

    async getLobbies(){
        const response = await api.get(`lobbies/scores?token=${localStorage.getItem('token')}`)
        const lobbies = response.data;
        this.setState({['lobbies']: lobbies})
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
            <div>
                <NeonButton
                    onClick={() => {
                        this.props.history.push(`/game/main`);
                    }}
                >EXIT</NeonButton>
                <Background className={"scoreboard"}>
                    <ScoreContainer
                        style={{color:"white", fontSize:"36px"}}
                        marginLeft={"215px"}>
                        <Title>Players</Title>
                        {this.state.users.map(users => {return(
                            <Wrapper>
                                <ScoreTextLeft>{users.username}</ScoreTextLeft>
                                <ScoreTextRight>{users.score}</ScoreTextRight>
                            </Wrapper>
                        )})}
                    </ScoreContainer>
                    <ScoreContainer
                        marginLeft={"581px"}>
                        <Title>Players</Title>
                        {this.state.lobbies.map(lobbies => {return(
                            <Wrapper>
                                <ScoreTextLeft>{lobbies.lobbyName}</ScoreTextLeft>
                                <ScoreTextRight>{lobbies.lobbyScore}</ScoreTextRight>
                            </Wrapper>
                        )})}
                    </ScoreContainer>
                    <InviteLobbyPhone changePhoneToOff={this.props.changePhoneToOff}
                                      changePhoneToOn={this.props.changePhoneToOn}
                                      changeTalkingToOff={this.props.changeTalkingToOff}
                                      changeTalkingToOn={this.props.changeTalkingToOn}
                    >
                    </InviteLobbyPhone>
                </Background>
            </div>
        );
    }
}

export default withRouter(Scoreboard);
