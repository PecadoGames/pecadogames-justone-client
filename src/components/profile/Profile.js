import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import User from "../shared/models/User";
import {BackgroundContainer} from "../main/Main";
import {PhoneContainer, TextRight, TextLeft, TextContainer, EditProfileButton, One, Two, ProfilePicContainer, ProfileContainer, Row, ButtonRow,
    WindowHeader, FriendsButton, BlinkingPixelButton, PhoneScreenContainer, InvitationContainer} from "./Assets/profileAssets";
import { PixelButton } from "../../views/design/PixelButton";
import {AcceptButton, DeclineButton} from "../profile/Assets/RequestBox";
import {InvitationText} from "../lobby/InviteLobbyPhone"
import GreenShyguy from "./Assets/ProfilePictures/green.png";
import BlueShyguy from "./Assets/ProfilePictures/blue.png";
import PinkShyguy from "./Assets/ProfilePictures/pink.png";
import PurpleShyguy from "./Assets/ProfilePictures/purple.png";
import YellowShyguy from "./Assets/ProfilePictures/yellow.png";
import RedShyguy from "./Assets/ProfilePictures/red.png";
import styled from "styled-components";


class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            id: null,
            username: null,
            status: null,
            creationDate: null,
            birthday: null,
            editable : true,
            score: 0,
            friendsRequest: [],
            count: null,
            color: null,

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


    disableEdit(){
        this.handleInputChange('editable', false)
    }

    back(){
        if(this.state.editable){
            this.props.history.push(`/game`);
        }
        else{
            window.history.back()
        }
    }

    getProfilePic(){
        if (this.state.avatarColor === "GREEN"){
            return GreenShyguy;
        }
        else if (this.state.avatarColor === "BLUE"){
            return BlueShyguy;
        }
        else if (this.state.avatarColor === "PINK"){
            return PinkShyguy;
        }
        else if (this.state.avatarColor === "PURPLE"){
            return PurpleShyguy;
        }
        else if (this.state.avatarColor === "YELLOW"){
            return YellowShyguy;
        }
        else if (this.state.avatarColor === "RED"){
            return RedShyguy;
        }
    }

    async getInvitation(){
        this.state.phone = setInterval(async()=>{
                const response = await api.get(`/users/${localStorage.getItem('id')}/invitations?token=${localStorage.getItem('token')}`);
                this.handleInputChange('lobbies', response.data)
                this.checkPhone()
                const requests = await api.get(`/users/${localStorage.getItem('id')}/friendRequests?token=${localStorage.getItem('token')}`)
                this.handleInputChange('friendsRequest', requests.data)
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

    canEdit(){
        if(this.state.editable){
            return <EditProfileButton
                    disabled={!this.state.editable}
                    onClick={() => {
                        this.props.history.push(`${this.state.id}/edit`)
                    }}
            >
                Edit Profile
            </EditProfileButton>
        }
    }

    parseDate(toParse){
        if(toParse === null){
            return null
        }
        const milliseconds = Date.parse(toParse);
        const date = new Date(milliseconds);
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        return day + "." + month + "."+year
    }

    parseStatus(){
        if(this.state.status === true){
            return "Online"
        }
        else{
            return "Offline"
        }
    }

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.state.id = this.props.match.params.id;

        if(localStorage.getItem('id') !== this.state.id){
            this.disableEdit();
        }
        try {
            await api.get('/users/'+this.state.id)
                .then(response => {return new User(response.data)})
                .then(data => this.setState(
                    {user: data,
                        username: data.username,
                        birthday: (data.birthday),
                        status: data.logged_in,
                        creation_date: (data.creation_date),
                        score: data.score,
                        avatarColor: data.avatarColor,
                    })
                );

            //get requests to diplay how many are there
            const response = await api.get(`/users/${localStorage.getItem('id')}/friendRequests?token=${localStorage.getItem('token')}`)
            this.handleInputChange('friendsRequest', response.data)

        }        catch (error) {
            alert(`Something went wrong while fetching the users or friends: \n${handleError(error)}`);
        }
            // See here to get more data.

        this.getInvitation()
    }

    componentWillUnmount() {
        clearInterval(this.state.phone)
        this.props.changePhoneToOff()

    }

    counter(){
        let count = 0;
        for(let i = 0; i < this.state.friendsRequest.length; ++i){
            if(this.state.friendsRequest[i])
                count++;
        }
        this.state.count = count;
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
                            ..\Profile.js
                        </WindowHeader>
                        <ProfileContainer className={"profileContainer"}>
                            <One>
                                <ProfilePicContainer className={"profilePicContainer"}>
                                    <img src={this.getProfilePic()} alt={"Profile picture"} className={"profilePicture"}/>
                                </ProfilePicContainer>
                                {this.state.editable ? (
                                <FriendsButton
                                    onClick={()=> {this.props.history.push(window.location.pathname + `/friends`)}}
                                >
                                    Friends
                                </FriendsButton>
                                ):(null)}
                                {this.counter()}
                                {!this.state.friendsRequest.length || (localStorage.getItem('id') !== this.state.id) ? (null):
                                    (<BlinkingPixelButton
                                        onClick={() => {this.props.history.push(window.location.pathname+ `/requests`)}}>
                                        New Requests ({this.state.count})
                                    </BlinkingPixelButton>)
                                }
                            </One>
                            <Two>
                                <TextContainer>
                                    <TextLeft>Username:</TextLeft>
                                    <TextRight>{this.state.username}</TextRight>
                                </TextContainer>
                                <TextContainer>
                                    <TextLeft>Score:</TextLeft>
                                    <TextRight>{this.state.score}</TextRight>
                                </TextContainer>
                                <TextContainer>
                                    <TextLeft>Joined on:</TextLeft>
                                    <TextRight>{this.state.creation_date}</TextRight>
                                </TextContainer>
                                <TextContainer>
                                    <TextLeft>Birthday:</TextLeft>
                                    <TextRight>{this.state.birthday}</TextRight>
                                </TextContainer>
                                <TextContainer>
                                    <TextLeft>Status:</TextLeft>
                                    <TextRight>{this.parseStatus(this.state.status)}</TextRight>
                                </TextContainer>
                                <Row>
                                    <ButtonRow>
                                        <PixelButton
                                            marginLeft = "0px"
                                            onClick={() => {
                                                this.back();
                                            }}
                                        >
                                            Back
                                        </PixelButton>
                                    </ButtonRow>
                                    <ButtonRow>
                                    {this.canEdit()}
                                    </ButtonRow>
                                </Row>
                            </Two>
                        </ProfileContainer>
                    </PhoneScreenContainer>
                    }
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Profile);
