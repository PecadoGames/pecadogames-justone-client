import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {BackgroundContainer} from "../main/Main";
import { PhoneContainer, PixelButton,  ProfileContainer, Banner} from "./Assets/profileAssets";
import FriendBox from "./Assets/FriendBox";
import UsersBox from "./Assets/UsersBox";
import {WindowHeader, ButtonRow} from "./Assets/profileAssets";



class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: null,
            username: null,
            addUser: false
        };
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
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
            const response = await api.get('/users/'+this.state.id + '/friends');
            this.handleInputChange('friends', response.data)

        }        catch (error) {
            alert(`Something went wrong while fetching the friends: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <BackgroundContainer className={"backgroundMain"}>
                <PhoneContainer className={"phoneProfile"}>
                    <WindowHeader>
                        C:/PecadOS/Friendlist
                    </WindowHeader>
                        <ProfileContainer>
                        {!this.state.addUser ? (<FriendBox></FriendBox>) : (<UsersBox></UsersBox>)}
                            <ButtonRow>
                                <PixelButton
                                    onClick={() => {
                                        this.props.history.push(`/game/users/${this.state.id}`);
                                    }}
                                >
                                    Back
                                </PixelButton>
                                <PixelButton  
                                    onClick={() => {this.addFriend() }}>
                                        {this.state.addUser ? ('Friends'): ('Add Friends')}
                                </PixelButton>
                            </ButtonRow>
                        </ProfileContainer>
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Friends);
