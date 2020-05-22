import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import { PixelButton } from "../../views/design/PixelButton";
import { AcceptButton, DeclineButton} from "../profile/Assets/RequestBox";
import {Row} from "../lobby/CreateLobby";

const PhoneContainerWithMessage = styled.div`
    display: flex;
    float: right;
    height: 346px;
    width: 200px;
    padding-left: 10px;
    padding-top: 30px;
    margin-top: ${props => props.marginTop};
    margin-left: ${props => props.marginLeft};
`;

const PhoneScreenContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 16px;
    width: 148px;
    height: 290px;
`

export const InvitationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 105px;
    width: 100%;
    margin-top: 10px;
`

export const InvitationText = styled.div`
    text-align: center;
    font-size: ${props => props.fontSize || "15px"}
    color: #ffff00;
    width: ${props => props.width || "140px"};
`

class InviteLobbyPhone extends React.Component {
    constructor() {
        super();
        this.state = {
            phone: null,
            lobbies: [],
            inviteToDisplay: [],
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
            this.setInviteToDisplay()
            this.checkPhone()
            if(this.state.accepted){
                clearInterval(this.state.phone)
            }
            }
            , 500)
    }

    setInviteToDisplay(){
        if(this.state.lobbies.length > 0){
            let newInvite = []
            newInvite.push(this.state.lobbies[0])
            this.handleInputChange('inviteToDisplay', newInvite)
        }
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

    componentWillUnmount() {
        clearInterval(this.state.phone)
        this.props.changePhoneToOff()

    }

    render(){
    return (        
                // <PhoneContainerWithMessage className={"lobbyInvitePhone"}>
                //   <Wrapper>
                //     <Text style={{fontSize: "28px"}}>Invitations</Text>
                //         {this.state.lobbies.map(lobby => {return(
                //             <MessageWrapper>
                //                     <Text>Lobby: {lobby.lobbyName}</Text>
                //                     <Text>HostName: {lobby.hostName}</Text>
                //                     <ButtonContainer>
                //                         <AcceptButton
                //                             onClick={() => {this.accept(lobby.lobbyId);}}
                //                         >✓
                //                         </AcceptButton>
                //                         <DeclineButton
                //                             onClick={() => {this.decline(lobby.lobbyId);}}
                //                         >X
                //                         </DeclineButton>
                //                     </ButtonContainer>
                //             </MessageWrapper>
                //         )}
                //         )}
                //     </Wrapper>
                // </PhoneContainerWithMessage>
                <PhoneContainerWithMessage className={"lobbyInvitePhone"}
                    marginTop={this.props.marginTop}>
                    <PhoneScreenContainer>
                        {this.props.showRules &&
                        <Row
                            marginTop="0px"
                            justifyContent="center">
                        <PixelButton
                            marginTop="0px"
                            width="100px"
                            onClick={() => {this.props.history.push(`rules`)}}>
                            Rules
                        </PixelButton>
                        </Row>}
                        {this.props.showLogout &&
                        <Row
                            marginTop="0px"
                            justifyContent="center">
                        <DeclineButton
                            marginTop="0px"
                            width="100px"
                            onClick={()=>{
                                this.logout();
                            }}
                            >
                            Logout
                        </DeclineButton>
                        </Row>
                        }
                        {this.state.inviteToDisplay.map(lobby => {return(
                            <InvitationWrapper>
                                <InvitationText>
                                    Invitation to lobby "{lobby.lobbyName}"
                                </InvitationText>
                                <Row
                                    marginTop="5px">
                                    <AcceptButton
                                        marginTop = "0px"
                                        height = "50px"
                                        onClick={() => {this.accept(lobby.lobbyId);}}>
                                        ✓
                                    </AcceptButton>
                                    <DeclineButton
                                        marginTop = "0px"
                                        onClick={() => {this.decline(lobby.lobbyId);}}>
                                        X
                                    </DeclineButton>
                                </Row>
                            </InvitationWrapper>
                                                )}
                                                )}
                    </PhoneScreenContainer>
                </PhoneContainerWithMessage>
    );
    }
}

export default InviteLobbyPhone;