import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import User from "../shared/models/User";
import {BackgroundContainer} from "../main/Main";
import RedShyguy from "./Assets/ProfilePictures/red.png";
import GreenShyguy from "./Assets/ProfilePictures/green.png";
import BlueShyguy from "./Assets/ProfilePictures/blue.png";
import YellowShyguy from "./Assets/ProfilePictures/yellow.png";
import PurpleShyguy from "./Assets/ProfilePictures/purple.png";
import PinkShyguy from "./Assets/ProfilePictures/pink.png";

import {WindowHeader, PhoneContainer, TextLeft, TextContainer, PixelButton, One, Two, ProfilePicContainer, ProfileContainer} from "./Assets/profileAssets";

const InputField = styled.input`
  background: transparent;
  margin: 0px;
  margin-left: 5px;
  text-align: left;
  font-size:25px;
  width: 237px;
  border: none;
  color: #c0c0c0;
  border-bottom: 1px solid black;
`;

const ColorContainer = styled(TextContainer)`
    column-count: 1;
    row-count: 2;
    height: 78px;
`;

const ColorButtonContainer = styled.div`
    background: transparent;
    margin-left: 5px;
    margin: 0px;
    width: 500px;
    float:left;
    padding: 4px;
`;

const InputFieldDate = styled(InputField)`
    defaultValue-color: grey;
`;

const SaveButton = styled(PixelButton)`
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
    width: 500px;
    color: white;
    background: #118f33;
    &:hover {
        background: ${props => (props.disabled ? "#118f33" : "#25ba4d")};
    }
`;

const ColorButton = styled.button`
    background: ${props => props.background|| "white"};
    height: 25px;
    width: 25px;
    margin: 5px;
    margin-left: 28px;
    margin-right: 28px;
    border-color: black;
    border-width: ${props => props.borderWidth|| "1px"};
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            id: null,
            username: null,
            birthday: null,
            avatarColor: null,
        };
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async updateProfile(){
        try {
            const requestBody = JSON.stringify({
                userId: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                username: this.state.username,
                birthday: this.state.birthday,
                avatarColor: this.state.avatarColor,
            })
            const response= await api.put(`users/${this.state.id}`, requestBody);
            this.props.history.push(`/game/users/${this.state.id}`);
        }
        catch(error){
            alert(`Could not create a lobby. \n${handleError(error)}`)
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

    //method checks if state's color matches color of button
    colorMatcher(colorToMatch) {
        return colorToMatch === this.state.avatarColor;
    }

    //checks if logged in user has permission to be on this page
    userHasPermission(){
        let pathArray = window.location.pathname.split('/');
        let userId = pathArray[pathArray.length-2];
        if (userId !== localStorage.getItem("id")){
            alert("You don't have permissions to edit this profile.")
            this.props.history.push(`/game/users/${this.state.id}`);
        }
    }

    //returns profile pic based on current state
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
        //default
        else {
            return RedShyguy;
        }

    }

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.state.id = this.props.match.params.id;
        this.userHasPermission()
        try {
            await api.get('/users/'+this.state.id)
                .then(response => {return new User(response.data)})
                .then(data => this.setState(
                    {user: data,
                        username: data.username,
                        birthday: this.parseDate(data.birthday),
                        avatarColor : data.avatarColor,
                       })
                );
        }        catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }



    }

    render() {
        return (
            <BackgroundContainer className={"backgroundMain"}>
            <PhoneContainer className={"phoneProfile"}>
                <WindowHeader>..\Profile\Edit.js</WindowHeader>
                <ProfileContainer className={"profileContainer"}>
                    <One>
                        <ProfilePicContainer className={"profilePicContainer"}><img src={this.getProfilePic()} alt={"Profile picture"} className={"profilePicture"}/></ProfilePicContainer>
                        <PixelButton
                            onClick={() => {
                                this.props.history.push(`/game/users/${this.state.id}`);
                            }}
                        >Back</PixelButton>
                    </One>
                    <Two>
                        <TextContainer>
                            <TextLeft>Username:</TextLeft>
                            <InputField
                            placeholder={this.state.username}
                            onChange={e =>{
                                this.handleInputChange('username', e.target.value)
                            }}
                            />
                        </TextContainer>
                        <TextContainer>
                            <TextLeft>Birthday:</TextLeft>
                            <InputFieldDate
                                type="date"
                                defaultValue={this.state.birthday}
                            onChange={e =>{
                                this.handleInputChange('birthday', e.target.value)
                            }}
                            />
                        </TextContainer>
                        <ColorContainer>
                            <TextLeft>Pick a color for your profile picture:</TextLeft>
                            <ColorButtonContainer>
                                <ColorButton id="RED"
                                             background={"#b31a1a"}
                                             borderWidth={(this.colorMatcher("RED")) ? "2.5px" : "1px"}
                                             onClick={()=>{
                                                 this.setState({avatarColor: "RED"})
                                             }}
                                />
                                <ColorButton id="GREEN"
                                             background={"#008a0e"}
                                             borderWidth={(this.colorMatcher("GREEN")) ? "2.5px" : "1px"}
                                             onClick={()=>{
                                                 this.setState({avatarColor: "GREEN"})
                                             }}
                                />
                                <ColorButton id="YELLOW"
                                             background={"#dece38"}
                                             borderWidth={(this.colorMatcher("YELLOW")) ? "2.5px" : "1px"}
                                             onClick={()=>{
                                                 this.setState({avatarColor: "YELLOW"})
                                             }}
                                />
                                <ColorButton id="BLUE"
                                             background={"#2b37a8"}
                                             borderWidth={(this.colorMatcher("BLUE")) ? "2.5px" : "1px"}
                                             onClick={()=>{
                                                 this.setState({avatarColor: "BLUE"})
                                             }}
                                />
                                <ColorButton id="PURPLE"
                                             background={"#562ba8"}
                                             borderWidth={(this.colorMatcher("PURPLE")) ? "2.5px" : "1px"}
                                             onClick={()=>{
                                                 this.setState({avatarColor: "PURPLE"})
                                             }}
                                />
                                <ColorButton id="PINK"
                                             background={"#cf71dc"}
                                             borderWidth={(this.colorMatcher("PINK")) ? "2.5px" : "1px"}
                                             onClick={()=>{
                                                 this.setState({avatarColor: "PINK"})
                                             }}
                                />
                            </ColorButtonContainer>
                        </ColorContainer>
                        <SaveButton
                            disabled={!this.state.username}
                            onClick={()=>{
                                this.updateProfile();
                            }}
                        >Save Profile</SaveButton>
                    </Two>
                </ProfileContainer>
            </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Profile);
