import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import User from "../shared/models/User";
import {BackgroundContainer} from "../main/Main";
import {PhoneContainer, TextRight, TextLeft, TextContainer, EditProfileButton, PixelButton, One, Two, ProfilePicContainer, ProfileContainer, Row, ButtonRow,RowContainer,
    WindowHeader, FriendsButton, NewFriendRequestButton} from "./Assets/profileAssets";
import GreenShyguy from "./Assets/ProfilePictures/green.png";
import BlueShyguy from "./Assets/ProfilePictures/blue.png";
import PinkShyguy from "./Assets/ProfilePictures/pink.png";
import PurpleShyguy from "./Assets/ProfilePictures/purple.png";
import YellowShyguy from "./Assets/ProfilePictures/yellow.png";
import RedShyguy from "./Assets/ProfilePictures/red.png";


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
        if(!this.state.editable){
            window.history.back()
        }
    }

    //returns profile pic based on current state TODO: remove duplicated code
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
                        creation_date: this.parseDate(data.creation_date),
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
                                (<NewFriendRequestButton
                                    onClick={() => {this.props.history.push(window.location.pathname+ `/requests`)}}>
                                    New Requests ({this.state.count})
                                </NewFriendRequestButton>)
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
