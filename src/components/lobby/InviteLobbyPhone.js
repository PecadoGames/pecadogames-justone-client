import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import { PixelButton } from "../../views/design/PixelButton";
import {TextContainer} from "../profile/Assets/profileAssets";
import {BackgroundContainer} from "../main/Main";

const Container = styled.div`
    position: fixed;
    bottom: 0px;
`;

const AcceptButton = styled.button`
    height: 30px;
    float:left;
    width: 30px;
    border: 2px solid black;
    padding-top: -3px;
    font-size: 20px;
    text-align: center;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 5px;
    background-color: #1d9c06;
`;

const ButtonContainer = styled.div`
    display: inline-block;
    width: 100px;
    height: 35px;
    text-align: center;
`;

const DeclineButton = styled(AcceptButton)`
        background-color: #a8120a;
`;

const Wrapper = styled.div`
    margin-left: 20px;
    width: 140px;
    text-align: center;
    overflow: auto;
    height: 290px;
`;

const PhoneContainerWithMessage = styled.div`
    width: 200px;
    height: 346px;
    padding: 10px;
    padding-top: 30px;
    margin-top: 0px;
`;

const PhoneContainerNoMessage = styled.div`
    width: 200px;
    height: 146px;
    margin-top: 195px;
`;

const MessageWrapper = styled.div`
    text-align: center;
    background-color:#5c5b5b;
    border-radius: 10px;
    width: 95%;
    padding-bottom: 5px;
    margin-bottom: 5px;
`;


const Text = styled.div`
    color: white;
`;

class InviteLobbyPhone extends React.Component {
    constructor() {
        super();
        this.state = {
            phone: null,
            lobbies: [],
            phoneCheck: false,
            alreadyChanged: true,
            accepted: false,
        }
        ;
    }

    componentDidMount() {
      this.getInvitation()
    }



    handleInputChange(key, value) {
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

    componentWillUnmount() {
        clearInterval(this.state.phone)
        this.props.changePhoneToOff()

    }

    render(){
    return (
        this.state.phoneCheck && !this.state.accepted ?
            <Container>
                <PhoneContainerWithMessage className={"lobbyInvitePhone"}>
                    <Wrapper>
                    <Text style={{fontSize: "28px"}}>Invitations</Text>
                        {this.state.lobbies.map(lobby => {return(
                            <MessageWrapper>
                                    <Text>Lobby: {lobby.lobbyName}</Text>
                                    <Text>HostName: {lobby.hostName}</Text>
                                    <ButtonContainer>
                                        <AcceptButton
                                            onClick={() => {this.accept(lobby.lobbyId);}}
                                        >✓
                                        </AcceptButton>
                                        <DeclineButton
                                            onClick={() => {this.decline(lobby.lobbyId);}}
                                        >X
                                        </DeclineButton>
                                    </ButtonContainer>
                            </MessageWrapper>
                        )}
                        )}
                    </Wrapper>
                </PhoneContainerWithMessage>
            </Container>
            :
            <Container>
                <PhoneContainerNoMessage className={"lobbyInvitePhone"}>

                </PhoneContainerNoMessage>
            </Container>
    );
    }
}

export default InviteLobbyPhone;