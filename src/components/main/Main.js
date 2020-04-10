import React from 'react';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import Background from './assets/main_background.png';
import {LogoutButton} from "../../views/design/LogoutButton"
import {api, handleError} from "../../helpers/api";

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 1200px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const HandContainer = styled.div`
  margin-left:450px;
  height:700px;
  width:600px;
  margin-top:200px;
`;

const ButtonContainer = styled.div`
    margin-left:42px;
    margin-top:30px;
`;

const MainMenuButton = styled.button`
    margin-bottom:20px;   
    margin-right:100px;
    width:200px;
    height:45px;
    font-size: 28px
    text-shadow: 1px 1px 0px #4f4f4f;
    background-color:transparent;
    display: inline-block
    color: black;
    padding-top:0px;
    padding-bottom: 5px;
    border:4px solid;
    &:hover {
        background: #d9d9d9;
    }
    border-color: ${props => props.borderColor|| "black"};
`;

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            id : localStorage.getItem("id")
        };
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

    render(){
        return (
            <BackgroundContainer className ={"backgroundMain"}>
                <LogoutButton
                    onClick={()=>{
                        this.logout();
                    }}
                >Logout</LogoutButton>
                <HandContainer
                    className={"handWithCard"}
                >
                    <ButtonContainer>
                        <MainMenuButton
                             borderColor="#2273f5"
                        >Join Lobby</MainMenuButton>
                        <MainMenuButton
                            borderColor="#0bb845"
                        >Create Lobby</MainMenuButton>
                        <MainMenuButton
                            borderColor="#c73110"
                            onClick={() => {
                                this.props.history.push(`users/${this.state.id}`)
                            }}
                        >Profile</MainMenuButton>
                        <MainMenuButton
                            borderColor="#e0dd16"
                        >
                            Scoreboard</MainMenuButton>
                    </ButtonContainer>
                </HandContainer>
            </BackgroundContainer>
        );
    }
}
export default withRouter(Main);