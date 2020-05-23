import React from 'react';
import {withRouter} from 'react-router-dom';
import {BackgroundContainer} from "../main/Main";
import {WindowHeader, PhoneContainer, ButtonRow, ProfileContainer, PhoneScreenContainer, InvitationContainer} from "./Assets/profileAssets";
import { PixelButton } from "../../views/design/PixelButton";
import {AcceptButton, DeclineButton} from "../profile/Assets/RequestBox";
import {InvitationText} from "../lobby/InviteLobbyPhone"
import RequestBox from "./Assets/RequestBox";
import {api} from "../../helpers/api";

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
                <PhoneContainer className={"phoneProfile"}>
                    {this.state.phoneCheck && !this.state.accepted ?  
                        <PhoneScreenContainer>
                            <WindowHeader>
                                ..\LobbyInvitation.js
                            </WindowHeader>
                            {this.state.lobbies.map(lobby => {return(
                                <InvitationContainer>
                                    <InvitationText
                                        width="300px"
                                        fontSize="30px">
                                        Invitation to lobby "{lobby.lobbyName}"
                                    </InvitationText>
                                    <ButtonRow
                                    marginTop="20px">
                                        <AcceptButton
                                            marginTop = "0px"
                                            height = "50px"
                                            onClick={() => {this.accept(lobby.lobbyId);}}>
                                            Accept
                                        </AcceptButton>
                                        <DeclineButton
                                            marginTop = "0px"
                                            onClick={() => {this.decline(lobby.lobbyId);}}>
                                            Reject
                                        </DeclineButton>
                                    </ButtonRow>
                                </InvitationContainer>
                                                    )}
                                                    )}
                        </PhoneScreenContainer> 
                        :
                        <PhoneScreenContainer>
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
                        </PhoneScreenContainer>
                        }
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Requests);
