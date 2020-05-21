import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import LobbyField from "./LobbyField";
import {PixelButton} from "../../../views/design/PixelButton";
import {api, handleError} from "../../../helpers/api";
import PhoneImg from '../assets/PhoneCall.png';


const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 10px;
  align-items: flex-start;
  `;

const LobbyContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 330px
  border-bottom: 2px solid #565553; 
  margin-top: 5px
`;

const JoinButton = styled(PixelButton)`
    margin-top: 0px;
    border: none;
    outline: 2px solid #565553;
    background: none;
    color: #565553;
    height: 50px;
    &:hover {
        outline: 2px solid #ffffff;
        background: #565553;
        color: #000000;
      }
`;

const Phone = styled.img`
    width: 23px;
    height: 29px
    margin-top: 2px;
    ${JoinButton}:hover & {
        filter: invert(100%)
    }
`;

const ButtonSpan = styled.span`
    display: flex
    justify-content: space-evenly;
    color: #565553;
    font-size: 26px;
    &:hover {
        color: #ffffff;
    }
    ${JoinButton}:hover & {
        color: #ffffff;
    }
`;



class Lobbies extends React.Component{
    constructor() {
        super();
        this.state = {
            lobbies: [],
            displayedLobbies: [],
            number: 0,


        };
    }

    async joinLobby(lobbyId) {
        try {
            const requestBody = JSON.stringify({
                playerId: localStorage.getItem('id'),
                playerToken: localStorage.getItem('token')
            })
            await api.put('/lobbies/' + lobbyId + '/joins', requestBody);
            localStorage.setItem('lobbyId', lobbyId)
            this.props.history.push('/game/lobbies/' + lobbyId);
        }
        catch(error){
            alert(`Something went wrong during the joinLobby \n${handleError(error)}`)
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.lobbies !== nextProps.lobbies){
            this.buildSite()
            return true
        }
        else{
            return false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.lobbies !== state.lobbies || props.number !== state.number) {
            return {
                lobbies: props.lobbies,
                number: props.number
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    buildSite(){
        this.handleInputChange('displayedLobbies', this.state.lobbies.slice(this.state.number-5,this.state.number))

    }

    componentDidMount() {
        this.buildSite()
    }


    render(){
        return(  
        <div>
            <SmallContainer>
                {this.state.displayedLobbies.map(lobby => {
                    return (
                        <LobbyContainer key={lobby.lobbyId} >
                                <LobbyField
                                lobby={lobby}
                            />
                                <JoinButton
                                    onClick={() => {this.joinLobby(lobby.lobbyId)}}>
                                        <ButtonSpan>
                                            <Phone src={PhoneImg}/>
                                            Join
                                        </ButtonSpan>
                                </JoinButton>
                        </LobbyContainer>
                    );
                })
            }
            </SmallContainer>
        </div>
        )
    }
}
export default withRouter(Lobbies);