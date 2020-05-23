import React from 'react';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import InviteLobbyPhone from "../lobby/InviteLobbyPhone"

export const BackgroundContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 768px;
    width: 1200px;
    border-radius: 20px;
    align-items: flex-start;  
    padding-left: 20px;
`;

const HandPhoneWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 77px;
    margin-left:450px;
    height:700px;
    width: 730px;
`

const HandContainer = styled.div`
    height:500px;
    width:400px;
    margin-top:185px;
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
            id : localStorage.getItem("id"),
        };
        this.phone = null;
    }

    componentDidMount() {
        this.props.changeMusicToNormal()
        this.lobby()

    }

    lobby(){
        this.phone = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.phone)
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
            this.props.history.push('/login')
        }
        catch(error){
            alert(`Something went wrong during the logout \n${handleError(error)}`)
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            this.props.history.push('/login')
        }
    }


    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }


    render(){
        return (
            <BackgroundContainer className ={"backgroundMain"}>
                <HandPhoneWrapper>
                    <HandContainer
                        className={"handWithCard"}>
                        <ButtonContainer>
                            <MainMenuButton
                                onClick={() => {this.props.history.push(`lobbies`)}}
                                borderColor="#2273f5"
                            >Join Lobby</MainMenuButton>
                            <MainMenuButton
                                borderColor="#0bb845"
                                onClick={() => {
                                    this.props.history.push(`createLobby`)
                                }}
                            >Create Lobby</MainMenuButton>
                            <MainMenuButton
                                borderColor="#c73110"
                                onClick={() => {
                                    this.props.history.push(`users/${this.state.id}`)
                                }}
                            >Profile</MainMenuButton>
                            <MainMenuButton
                                borderColor="#e0dd16"
                                onClick={() => {
                                    this.props.history.push(`scoreboard`)
                                }}
                            >
                                Scoreboard</MainMenuButton>
                        </ButtonContainer>
                    </HandContainer>
                    <InviteLobbyPhone
                        marginTop="338px"
                        showRules={true}
                        showLogout={true} 
                        history={this.props.history}
                        changePhoneToOff={this.props.changePhoneToOff}
                        changePhoneToOn={this.props.changePhoneToOn}
                        changeTalkingToOff={this.props.changeTalkingToOff}
                        changeTalkingToOn={this.props.changeTalkingToOn}/>
                </HandPhoneWrapper>
            </BackgroundContainer>
        );
    }
}
export default withRouter(Main);