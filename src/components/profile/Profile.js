import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import { OfflineIcon, OnlineIcon} from "../../views/design/Icon";
import User from "../shared/models/User";
import Requests from "./Requests";
import {BackgroundContainer} from "../main/Main";
import {FriendRequestBanner, PhoneContainer, TextRight, TextLeft, TextContainer, EditProfileButton, PixelButton, One, Two, ProfilePicContainer, ProfileContainer, Banner} from "./Assets/profileAssets";



const FriendsButton = styled(PixelButton)`
    color: white;
    background: #118f33;
    &:hover {
        background: #25ba4d;
    }
`;



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
            friendsRequest: [],
            count: null
        };
    }

    async updateUser() {
        if(this.state.user.username !== this.state.username){
            this.state.user.username = this.state.username
        }
        else{
            this.state.user.username = null

        }
        if(this.state.user.birthday !== this.state.birthday){
            this.state.user.birthday = this.state.birthday
        }
        else{
            this.state.user.birthday = null
        }
        try{
            const requestBody = JSON.stringify({
                username: this.state.user.username,
                birthday: this.state.user.birthday,
                token: localStorage.getItem('token')
            });
            await api.put('/users/'+this.state.id, requestBody);

        }
        catch(error){
            alert(`Something went wrong during the user update: \n${handleError(error)}`);
        }
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    checkStatus(){
        if(this.state.status){
            return <OnlineIcon
                marginLeft="1px"
                marginBottom="none"
            />
        }
        return <OfflineIcon
            marginLeft="1px"
            marginBottom="none"
        />
    }

    disableEdit(){
        this.handleInputChange('editable', false)

    }

    back(){
        if(this.state.editable){
            this.props.history.push(`/game`);
        }
        if(!this.state.editable){
            this.props.history.push(`/game/users/${localStorage.getItem("id")}/friends`)
        }
    }

    canEdit(){
        if(this.state.editable){
            return <div>
                <EditProfileButton
                    disabled={this.state.editable}
                    onClick={() => {
                        this.props.history.push(`${this.state.id}/edit`)
                    }}
            >
                Edit Profile
            </EditProfileButton>
            </div>
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

    parseStatus(toParse){
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
                        birthday: this.parseDate(data.birthday),
                        status: data.logged_in,
                        creation_date: this.parseDate(data.creation_date)})

                );

            //get requests to diplay how many are there
            const response = await api.get('/users/'+this.state.id+'/friendRequests')
            this.handleInputChange('friendsRequest', response.data)

        }        catch (error) {
            alert(`Something went wrong while fetching the users or friends: \n${handleError(error)}`);
        }
            // See here to get more data.
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
                {this.counter()}
                {!this.state.friendsRequest.length ? (<Banner> </Banner>):(<FriendRequestBanner
                onClick={() => {this.props.history.push(window.location.pathname+ `/requests`)}}>
                    View Friend Requests ({this.state.count})
                </FriendRequestBanner>)}
                <ProfileContainer>
                    <One>
                        <ProfilePicContainer><p>Profile pic</p></ProfilePicContainer>
                        {this.state.editable ? (<FriendsButton
                            onClick={()=> {this.props.history.push(window.location.pathname + `/friends`)}}
                        >Friends</FriendsButton>):(<div></div>)}
                        <PixelButton
                            onClick={() => {
                                this.back();
                            }}
                        >Back</PixelButton>
                    </One>
                    <Two>
                        <TextContainer>
                            <TextLeft>Username:</TextLeft>
                            <TextRight>{this.state.username}</TextRight>
                        </TextContainer>
                        <TextContainer>
                            <TextLeft>Score:</TextLeft>
                            <TextRight>420</TextRight>
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
                        {this.canEdit()}
                    </Two>
                </ProfileContainer>
            </PhoneContainer>
            </BackgroundContainer>
            /**
            <ProfileContainer>
                <Title>User Page</Title>
                <h2>{(this.state.editable) ? "Editing User" : this.state.username}</h2>
                <div>
                    <UserWrapper
                        marginTop="5px"
                        borderRadius="3px">
                        <UserIcon
                            marginLeft="1px"
                            marginBottom="none"
                        />
                        <InputField
                            marginBottom="1px"
                            borderBottom={(!this.state.editable) ? "1px solid #424242" : "1px solid white"}
                            disabled={!this.state.editable}
                            placeholder={this.state.username}
                            color={(this.state.editable) ? "white" : "#9e9e9e"}
                            value={(this.state.editable) ? this.state.username : null}
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                    </UserWrapper>
                    <UserWrapper
                        borderRadius="3px">
                        {this.checkStatus()}
                        <InputField
                            marginBottom="1px"
                            borderBottom={"1px solid #424242"}
                            disabled={true}
                            placeholder={(this.state.status) ? "Online" : "Offline"}
                        />
                    </UserWrapper>
                    <UserWrapper
                        borderRadius="3px">
                        <CreationIcon
                            marginLeft="1px"
                            marginBottom="none"
                        />
                        <InputField
                            marginBottom="1px"
                            borderBottom={"1px solid #424242"}
                            disabled={true}
                            placeholder={this.state.creationDate}
                        />
                    </UserWrapper>
                    <UserWrapper
                        >
                        <CakeIcon
                        marginLeft="1px"
                        marginBottom="none"
                        />
                        <InputField
                            marginBottom="1px"
                            borderBottom={(!this.state.editable) ? "1px solid #424242" : "1px solid white"}
                            disabled={!this.state.editable}
                            placeholder={(!this.state.birthday) ? "Birthday" : this.state.birthday}
                            color={(this.state.editable) ? "white" : "#9e9e9e"}
                            value={(this.state.editable) ? this.state.birthday : null}
                            onChange={e => {
                                this.handleInputChange('birthday', e.target.value);
                            }}
                        />
                    </UserWrapper>
                    {this.canEdit()}
                    <Button
                        width="45%"
                        borderRadius="3px"
                        onClick={() => {
                            (localStorage.getItem('id') === this.state.id)
                                ? this.updateUser() : this.backToOverview();
                            this.backToOverview();
                        }}
                    >
                        {(this.state.editable) ? "Done" : "Back"}
                    </Button>
                </div>
            </ProfileContainer>

             */
        );
    }
}

export default withRouter(Profile);
