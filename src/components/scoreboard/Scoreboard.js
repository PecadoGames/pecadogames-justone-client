import React from 'react';
import styled from 'styled-components';
import {api} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import InviteLobbyPhone from "../lobby/InviteLobbyPhone";
import {PixelButton} from "../../views/design/PixelButton";

const Background = styled.div`
  display: inline-block;
  flex-direction: column;
  width: 1200px;
  height: 768px;
  border-radius: 20px;
`;

const BackgroundWrapper = styled.div`
    text-align: center;
`;

const ScoreContainer = styled.div`
  position: absolute;
  background: black;
  height: 290px;
  width: 238px;
  overflow-x: hidden;
  margin-left: ${props => props.marginLeft|| "0px"};
  margin-top: 175px;
  text-align: center;
  overflow-y: scroll;
`;

const ScoreTextLeft = styled.div`
    display: flex;
    align-items: center;
    height: 100%
    width: 50%
    overflow: hidden;
    text-align: left;
    font-size: 24px;
    color: white;
    float: left;
    margin-left: 3px;
    margin-right: 3px;
`;

const ScoreTextRight = styled(ScoreTextLeft)`
    display: flex;
    justify-content: flex-end;
    float: right;
    width: 50%
`;

export const NeonButton = styled.button`
    margin-top: ${props => props.marginTop || '0px'}
    outline: 2px solid ${props => props.outline || '#008000'}
    outline-offset: -7px
    height: 50px;
    width: 100px;
    display: inline-block;
    color: ${props => props.color || '#008000'}
    box-shadow: ${props => props.boxShadow || '0 0 50px #5ccc2f'}
    letter-space: 2px;
    text-transform: uppercase;
    font-size: 30px;
    overflow: hidden;
    background: ${props => props.background || '#5ccc2f'};
    border: none;
    &:hover {
        outline: ${props => props.hoverOutline}
        color: ${props => props.hoverColor || '#111'}
        background: ${props => props.hoverBackground || '#5ccc2f'}
        box-shadow: ${props => props.hoverBoxShadow}
  }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background: none;
    border-bottom: 2px solid white;
    margin-bottom: 2px;
    &:hover{
        cursor: ${props => props.clickable ? "pointer" : "default"};
    }
`;

const Title = styled.div`
    text-align: center;
    width: 100%;
    margin: center;
    color: white;
    font-size:36px;
    border-bottom: 2px solid white;
`;

const BackButtonContainer = styled.div`
    margin-left: 570px;
    margin-top: 698px;
    display: flex;
    flex-direction: column; 
    height: auto;
    width: 104px;
`



class Scoreboard extends React.Component{
    constructor() {
        super();
        this.state = {
            users: [],
            lobbies: [],
            lobby: false,
            score: false,
            phone: null
        };
    }

    componentDidMount() {
        this.lobby()        
        this.getUsers()
        this.getLobbies()
        let interval = setInterval(async()=>{
            this.lobby()
            this.getUsers()
            this.getLobbies()
        }
        ,1000)
        this.setState({phone: interval})
    }

    async getUsers(){
        const response = await api.get(`/users/scores?token=${localStorage.getItem('token')}`)
        let parsedUsers = response.data
        this.setState({'users': parsedUsers})
    }

    async getLobbies(){
        const response = await api.get(`lobbies/scores?token=${localStorage.getItem('token')}`)
        const lobbies = response.data;
        this.setState({'lobbies': lobbies})
    }

    lobby(){
        if(localStorage.getItem('lobbyId')){
        this.props.changeTalkingToOff();
        this.props.history.push('/game');}
    }

    componentWillUnmount() {
        clearInterval(this.state.phone)
    }

    getName(id){
        let x = null
        for(let a in this.state.users){
            if (this.state.users[a].id === id){
                x = this.state.users[a].username
            }
        }
        return <div>{x}</div>

    }



    render() {
        return(
            <BackgroundWrapper>
                <Background className={"scoreboard"}>
                    <ScoreContainer
                        className={"scoreboardScroller"}
                        marginLeft={"280px"}>
                        <Title>Players</Title>
                        {this.state.users.map(users => {return(
                            <Wrapper>
                                <ScoreTextLeft>{users.username}</ScoreTextLeft>
                                <ScoreTextRight>{users.score}</ScoreTextRight>
                            </Wrapper>
                        )})}
                    </ScoreContainer>
                    <ScoreContainer className={"scoreboardScroller"}
                        marginLeft={"720px"}>
                        <Title>Lobbies</Title>
                        {!this.state.lobby ? <div>
                        {this.state.lobbies.map(lobbies => {return(
                            <Wrapper
                                clickable={true} 
                                onClick={() => {
                                    this.setState({'lobby': lobbies})
                                    this.setState({'score': lobbies.score})
                            }}>
                                <ScoreTextLeft>{lobbies.lobbyName}</ScoreTextLeft>
                                <ScoreTextRight>{lobbies.score}</ScoreTextRight>
                            </Wrapper>
                        )})}
                        </div>: <div>
                            <Wrapper onClick={() => {
                                this.setState({'lobby': false})
                                this.setState({'score': false})
                            }}>
                            <ScoreTextLeft>{this.state.lobby.lobbyName}</ScoreTextLeft>
                            <ScoreTextRight>{this.state.lobby.score}</ScoreTextRight>
                        </Wrapper>
                            {this.state.lobby.playersIdInLobby.map( lobby=> {return(
                           <Wrapper>
                                <ScoreTextLeft>Player:</ScoreTextLeft>
                                <ScoreTextRight>{this.getName(lobby)}</ScoreTextRight>
                            </Wrapper>
                            )})}
                            <PixelButton

                                onClick={() => {
                                    this.setState({'lobby': false})
                                    this.setState({'score': false})
                                }}
                            >
                                Back
                            </PixelButton>
                        </div>}

                    </ScoreContainer>
                    <BackButtonContainer>
                        <NeonButton
                            outline="white"
                            color="white"
                            hoverColor="black"
                            hoverBackground="#0a5c03"
                            hoverBoxShadow="none"
                            hoverOutline="2px solid black"
                            onClick={() => {
                                this.props.history.push(`/game/main`);
                            }}
                        >
                            EXIT
                        </NeonButton>
                    </BackButtonContainer>
                    <InviteLobbyPhone
                        marginTop="-333px"
                        history={this.props.history}
                        showRules={true}
                        showLogout={true}
                        changePhoneToOff={this.props.changePhoneToOff}
                        changePhoneToOn={this.props.changePhoneToOn}
                        changeTalkingToOff={this.props.changeTalkingToOff}
                        changeTalkingToOn={this.props.changeTalkingToOn}/>
                </Background>
            </BackgroundWrapper>
        );
    }
}

export default withRouter(Scoreboard);
