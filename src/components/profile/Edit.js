import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Button} from '../../views/design/Button';
import {withRouter} from 'react-router-dom';
import { OfflineIcon, OnlineIcon} from "../../views/design/Icon";
import User from "../shared/models/User";
import {BackgroundContainer} from "../main/Main";
import {Redirect} from "react-router-dom";
import {Title} from "../../views/Header";
import {PhoneContainer, TextRight, TextLeft, TextContainer, PixelButton, One, Two, ProfilePicContainer, ProfileContainer} from "./profileAssets";
import Lobby from "../shared/models/Lobby";

const InputField = styled.input`
  background: transparent;
  margin: 0px;
  margin-left: 5px;
  text-align: right;
  font-size:25px;
  width: 200px;
  float:right;
  border: none;
  border-bottom: 1px solid black;
`;

const SaveButton = styled(PixelButton)`
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
    width: 350px;
    color: white;
    background: #118f33;
    &:hover {
        background: ${props => (props.disabled ? "#118f33" : "#25ba4d")};
    }
`;




class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            id: null,
            username: null,
            birthday: null,
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
                <ProfileContainer>
                    <One>
                        <ProfilePicContainer><p>Profile pic</p></ProfilePicContainer>
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
                            <InputField
                            placeholder={this.state.birthday}
                            onChange={e =>{
                                this.handleInputChange('birthday', e.target.value)
                            }}
                            />
                        </TextContainer>
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
