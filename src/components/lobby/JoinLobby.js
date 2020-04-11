import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Sound from 'react-sound';
import FlipNewspaper from "../lobby/assets/FlipNewspaper.mp3"
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import {Button} from "../../views/design/Button";
import Lobby from "./assets/Lobby";

const Text = styled.div`
      font-size: 30px;
      color: #000000
      margin-left: 90px;

`;

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
  flex-direction: row;
  margin-top: 10px;
  margin-left: 10px;
  align-items: flex-start;  
  `

const LobbyContainer = styled.li`
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
 
`;

class JoinLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbies: null}
        ;
    }




    async getLobbies() {

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
            this.setState({lobbies: response.data});
        }
        catch(error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

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
                        height = "30px"
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
                    {!this.state.lobbies ? (<div>Work in progress</div>):(
                        <SmallContainer>
                    {this.state.lobbies.map(lobby => {
                        return (
                            <LobbyContainer key={lobby.id}>
                                <Lobby
                                    lobby={lobby}
                                />
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