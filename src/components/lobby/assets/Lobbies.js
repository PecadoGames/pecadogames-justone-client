import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import LobbyField from "./LobbyField";
import {Button} from "../../../views/design/Button";
import {api, handleError} from "../../../helpers/api";


const Number = styled.div`
  font-size: 10px;
  color: #000000
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 31px;
`


const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 10px;
  align-items: flex-start;  
  `

const LobbyContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 330px
  border: 1px solid
  margin-top: 5px
`;

const ButtonContainer = styled.div`
  margin-left: 10px;
  margin-top: 30px;  
  align-items: flex-start;  
  display: flex;
  flex-direction: column;
`

const SiteButton = styled.button`
  position: absolute
  margin-top: 100px;
`



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
        return(  <div>
            {this.state.displayedLobbies === [] ?
                <div>There are no lobbies</div>
                :
                <SmallContainer>
                    {this.state.displayedLobbies.map(lobby => {
                        return (
                            <LobbyContainer key={lobby.lobbyId} >
                                <LobbyField
                                    lobby={lobby}
                                />
                                <ButtonContainer className= 'phoneCall'>
                                    <Button
                                        background = "none"
                                        hover="none"
                                        height= "30px"
                                        boxShadow = "none"
                                        transition = "none"
                                        width = "20px"
                                        color= "black"
                                        fontSize="10px"

                                        onClick={() => {this.joinLobby(lobby.lobbyId)}}> </Button>
                                </ButtonContainer>
                                <Number> *****</Number>
                            </LobbyContainer>
                        );
                    })
                }
                </SmallContainer>
            }

        </div>
        )
    }
}
export default withRouter(Lobbies);