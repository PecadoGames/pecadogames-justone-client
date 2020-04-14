import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Sound from 'react-sound';
import FlipNewspaper from "../lobby/assets/FlipNewspaper.mp3"
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import {Button} from "../../views/design/Button";
import LobbyField from "./assets/LobbyField";


const ButtonContainer = styled.div`
  margin-left: 10px;
  margin-top: 30px;  
   align-items: flex-start;  
  display: flex;
  flex-direction: column;
`
const Text = styled.div`
      font-size: 30px;
      color: #000000
      margin-left: 120px;
`;

const Number = styled.div`
      font-size: 10px;
      color: #000000
      margin-left: 3px;
      margin-right: 3px;
      margin-top: 31px;
     
`

const FormContainer = styled.div`
    display: flex;
  flex-direction: column;
  height: 800px;
  width: 1200px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 848px
  width: 807px;
  border-radius: 20px;
  align-items: flex-start;  
  margin-left: 270px;
  margin-top: 150px;
  padding-right: 730px;
  padding-bottom: 800px;
`;

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

class JoinLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbies: null}
        ;
    }




    async joinLobby(lobbyId) {
        try {
            const requestBody = JSON.stringify({
                lobbyId: lobbyId,
                userId: localStorage.getItem('id'),
                token: localStorage.getItem('token')
            })
            await api.put('/lobbies/' + lobbyId + '/joins', requestBody);
            this.props.history.push('game/lobbies/' + lobbyId);
        }
        catch(error){
            alert(`Something went wrong during the joinLobby \n${handleError(error)}`)
        }
    }



    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async logout() {
        try{
            const requestBody = JSON.stringify({
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token")
            });
            await api.put('/logout', requestBody);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            this.props.history.push('/login');
        }
        catch(error){
            alert(`Something went wrong during the logout \n${handleError(error)}`)
        }
    }

    back(){
        this.props.history.push(`/game`);
    }


    async componentDidMount() {
        try {
            this.props.stopNoise()
            this.props.changeMusicToNormal()
            const response = await api.get('/lobbies')
            this.setState({lobbies: response.data})


        }
        catch(error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }


    render() {
        return (
            <FormContainer className={"backgroundMain"}>
                <LogoutButton
                    onClick={()=>{
                        this.logout();
                    }}
                >Logout</LogoutButton>
                <Sound url={FlipNewspaper}
                             playStatus={Sound.status.PLAYING}
                             volume={40}
                             playFromPosition={0}
                />
                <Container className={"blankNewsPaper"}>
                    <SmallContainer className={"backArrow"}>
                        <Button
                        height = "15px"
                        width="40px"
                        background= "none"
                        opacity= "0"
                        boxShadow = "null"
                        onClick={()=>{
                        this.back();
                    }}
                        >

                        </Button>
                        <Text>Lobbies</Text>
                    </SmallContainer>
                    {!this.state.lobbies ? (<div>There are no lobbies</div>):(
                        <SmallContainer>
                    {this.state.lobbies.map(lobby => {
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
                    })}
                        </SmallContainer>
                        )}
                </Container>

            </FormContainer>

        )
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(JoinLobby);