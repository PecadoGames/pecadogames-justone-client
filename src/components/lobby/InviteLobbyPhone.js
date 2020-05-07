import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";

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
            </Container>
            :
            <div></div>
    );
}
}

export default InviteLobbyPhone;