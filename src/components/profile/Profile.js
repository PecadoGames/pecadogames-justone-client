import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Button} from '../../views/design/Button';
import {withRouter} from 'react-router-dom';
import { OfflineIcon, OnlineIcon} from "../../views/design/Icon";
import User from "../shared/models/User";
import {Title} from "../../views/Header";

const TextContainer = styled.div`
  background: #6e6e6e;
  column-count: 2;
  margin-top: 12px;
  padding-top:8px;
`;

const TextLeft = styled.body`
  background: #6e6e6e;
  margin: 0px;
  margin-left: 5px;
  text-align: left;
  font-size:20px;
`;

const TextRight = styled(TextLeft)`
  margin: 5px;
  margin-right: 5px;
  text-align: right;

`;

const ProfileContainer = styled(BaseContainer)`
  padding: 2em;
  padding-top: 5px;
  background: #828282;
  width: 700px;
`;

const One = styled.div`
    width: 30%;
    float: left;
`;

const Two = styled.div`
    margin-left: 35%;
    width: 60%
`;

const ProfilePicContainer = styled(BaseContainer)`
    border: 2px solid black;
    width: 200px;
    height: 200px;
    margin-left: 5px;
`;

const PixelButton = styled.button`
    border: 2px solid black;
    margin-left: 5px;
    width: 200px;
    color: black;
    background: #b3b3b3;
    text-overflow: clip;
    margin-top: 20px;
    &:hover {
    background: #c9c9c9;
    }
    
`;

const EditProfileButton = styled(PixelButton)`
    background: #AE3C3C;
    width: 100%;
    margin-left:0px;
    margin-top:38px;
    &:hover {
    background: #cf4e4e;
    }
`;

const FriendsButton = styled(PixelButton)`
    color: white;
    background: #118f33;
    &:hover {
        background: #25ba4d;
    }
`;

const Line = styled.hr`
  border: 2px solid black;
  margin-top: 0px;
  margin-bottom: 10px;
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
            editable : false
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

    async backToOverview(){
        if(!this.state.editable){
            this.props.history.push(`/game`);
        }
        await api.get('/users/'+this.state.id)
            .then(response => {return new User(response.data)})
            .then(data => this.setState(
                {user: data,
                    username: data.username,
                    birthday: this.parseDate(data.birthday),
                    status: data.logged_in,
                    creationDate: this.parseDate(data.creation_date)})
            );
        this.disableEdit();
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

        this.setState(prevState => ({editable: !prevState.editable}));

    }

    canEdit(){
        if(localStorage.getItem('id') === this.state.id){
            return <div>
                <Button
                    marginTop="20px"
                    disabled={this.state.editable}
                    width="35%"
                    borderRadius="3px"
                    onClick={() => {
                        this.setState(prevState => ({editable: !prevState.editable}));
                    }}
            >
                Edit
            </Button>
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

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.props.stopNoise()
        this.state.id = this.props.match.params.id;
        try {
            await api.get('/users/'+this.state.id)
                .then(response => {return new User(response.data)})
                .then(data => this.setState(
                    {user: data,
                        username: data.username,
                        birthday: this.parseDate(data.birthday),
                        status: data.logged_in,
                        creationDate: this.parseDate(data.creation_date)})
                );
        }        catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
            // See here to get more data.


    }

    render() {
        return (
            <ProfileContainer>
                <Title>Profile Page</Title>
                <Line/>
                <One>
                    <ProfilePicContainer>
                        <p> profile pic </p>
                    </ProfilePicContainer>
                    <PixelButton>Change Picture</PixelButton>
                    <FriendsButton>Friends</FriendsButton>
                    <PixelButton>Back</PixelButton>
                </One>
                <Two>
                    <TextContainer>
                        <TextLeft>Username:</TextLeft>
                        <TextRight>{this.state.username}</TextRight>
                    </TextContainer>
                    <TextContainer>
                        <TextLeft>Name:</TextLeft>
                        <TextRight>Name</TextRight>
                    </TextContainer>
                    <TextContainer>
                        <TextLeft>Birthday:</TextLeft>
                        <TextRight>01.02.1998</TextRight>
                    </TextContainer>
                    <TextContainer>
                        <TextLeft>Joined on:</TextLeft>
                        <TextRight>03.04.2020</TextRight>
                    </TextContainer>
                    <TextContainer>
                        <TextLeft>Score:</TextLeft>
                        <TextRight>420</TextRight>
                    </TextContainer>
                    <TextContainer>
                        <TextLeft>Bitches fucked:</TextLeft>
                        <TextRight>69</TextRight>
                    </TextContainer>
                    <EditProfileButton>Edit Profile</EditProfileButton>
                </Two>


            </ProfileContainer>
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
