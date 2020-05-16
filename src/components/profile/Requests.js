import React from 'react';
import {withRouter} from 'react-router-dom';
import {BackgroundContainer} from "../main/Main";
import {WindowHeader, PhoneContainer, ButtonRow, ProfileContainer} from "./Assets/profileAssets";
import { PixelButton } from "../../views/design/PixelButton";
import RequestBox from "./Assets/RequestBox";
import {api} from "../../helpers/api";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    left: 0px;
    top: 700px;
    width: 100px;
    height: 100px;
    border: 2px solid red;
`;

const AcceptButton = styled.button`
    border: 2px solid black;
    height: 30%;
    width: 80%;
    font-size: 10px;
`;

const DeclineButton = styled(AcceptButton)`
    
`;


const Text = styled.div`
    color: white;
`;

class Requests extends React.Component {
    constructor() {
        super();
        this.state = {
            friendsRequest: [],

            phone: null,
            lobbies: [],
            phoneCheck: false,
            alreadyChanged: true,
            accepted: false,


        };
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async getInvitation(){
        this.state.phone = setInterval(async()=>{
                const response = await api.get(`/users/${localStorage.getItem('id')}/invitations?token=${localStorage.getItem('token')}`);
                this.handleInputChange('lobbies', response.data)
                this.checkPhone()
                if(this.state.accepted){
                    clearInterval(this.state.phone)
                }
            }
            , 500)
    }

    checkPhone(){
        if(this.state.lobbies.length > 0 && !this.state.phoneCheck ){
            this.handleInputChange('phoneCheck', true)
            if (this.state.phoneCheck === true && this.state.alreadyChanged ){
                this.props.changePhoneToOn()
                this.handleInputChange('alreadyChanged', false)
            }
        }
        else if(this.state.lobbies.length === 0){
            this.handleInputChange('phoneCheck', false)
            if (this.state.phoneCheck === false && !this.state.alreadyChanged ){
                this.handleInputChange('alreadyChanged', true)
                this.props.changePhoneToOff()
            }
        }
    }

    async accept(lobbyId){
        try {
            const requestBody = JSON.stringify({
                accepterId: localStorage.getItem('id'),
                accepterToken: localStorage.getItem('token'),
                accepted: true
            });
            await api.put(`/lobbies/${lobbyId}/acceptances`, requestBody);
            this.props.changeTalkingToOn()

        }
        catch(error){

        }
        this.handleInputChange('accepted', true)
        setTimeout(  ()=>localStorage.setItem('lobbyId', lobbyId), 1500)
        setTimeout(  ()=>this.props.history.push('/game'), 1600)
        setTimeout(  ()=>this.props.changeTalkingToOff(), 1600)
    }



    async decline(lobbyId){
        try {
            const requestBody = JSON.stringify({
                accepterId: localStorage.getItem('id'),
                accepterToken: localStorage.getItem('token'),
                accepted: false

            });
            await api.put(`/lobbies/${lobbyId}/acceptances`, requestBody);
        }
        catch(error){

        }
    }

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.state.id = this.props.match.params.id;
        this.getInvitation()
    }

    componentWillUnmount() {
        clearInterval(this.state.phone)
        this.props.changePhoneToOff()
    }

    render() {
        return (
            <BackgroundContainer className={"backgroundMain"}>


                {this.state.phoneCheck && !this.state.accepted ?  <Container>
                    {this.state.lobbies.map(lobby => {return(
                            <div>
                                <Text>Lobby: {lobby.lobbyName}</Text>
                                <Text>HostName: {lobby.hostName}</Text>
                                <AcceptButton
                                    onClick={() => {this.accept(lobby.lobbyId);}}
                                >accept
                                </AcceptButton>
                                <DeclineButton
                                    onClick={() => {this.decline(lobby.lobbyId);}}
                                >decline
                                </DeclineButton>

                            </div>
                        )}
                    )}
                </Container> : null}


                <PhoneContainer className={"phoneProfile"}>
                    <WindowHeader>
                    ..\Profile\Requests.js
                    </WindowHeader>
                    <ProfileContainer>
                        <RequestBox/>
                            <ButtonRow>
                                <PixelButton
                                    width="200px"
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                >
                                    Back
                                </PixelButton>
                            </ButtonRow>
                    </ProfileContainer>
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Requests);
