import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {BackgroundContainer} from "../main/Main";
import { PhoneContainer, ProfileContainer} from "./Assets/profileAssets";
import { PixelButton } from "../../views/design/PixelButton";
import FriendBox from "./Assets/FriendBox";
import UsersBox from "./Assets/UsersBox";
import {WindowHeader, ButtonRow} from "./Assets/profileAssets";
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

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: null,
            username: null,
            addUser: false,

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


    async addFriend(){
        if(this.state.addUser){
        this.handleInputChange('addUser', false)}
        if(!this.state.addUser){
            this.handleInputChange('addUser', true)}
    }

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.state.id = this.props.match.params.id;
        try {
            //get friends
            const response = await api.get(`/users/${this.state.id}/friends?token=${localStorage.getItem('token')}`)
            this.handleInputChange('friends', response.data)

        }        
        catch (error) {
            alert(`Something went wrong while fetching the friends: \n${handleError(error)}`);
        }
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
                    {!this.state.addUser ? ("..\\Profile\\Friends.js") : ("..\\Profile\\Users.js")}
                    </WindowHeader>
                        <ProfileContainer>
                        {!this.state.addUser ? (<FriendBox></FriendBox>) : (<UsersBox></UsersBox>)}
                            <ButtonRow>
                                <PixelButton
                                    marginTop = "30px"
                                    onClick={() => {
                                        !this.state.addUser ? 
                                        (this.props.history.push(`/game/users/${this.state.id}`)
                                        ) : (
                                            this.addFriend());
                                    }}
                                >
                                    Back
                                </PixelButton>
                                    {!this.state.addUser ?
                                        (<PixelButton
                                            marginTop = "30px"
                                            onClick={() => {this.addFriend() }}>
                                            Add Friends
                                            </PixelButton>
                                        ):
                                        null
                                            } 
                                
                            </ButtonRow>
                        </ProfileContainer>
                </PhoneContainer>

            </BackgroundContainer>
        );
    }
}

export default withRouter(Friends);
