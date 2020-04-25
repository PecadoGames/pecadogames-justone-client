import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {BackgroundContainer} from "../main/Main";
import { PhoneContainer, PixelButton,  ProfileContainer} from "./Assets/profileAssets";
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
            const response = await api.get(`/users/${this.state.id}/friends?token=${localStorage.getItem('token')}`)
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
                                            Friends
                                            </PixelButton>
                                        ):(null)} 
                                
                            </ButtonRow>
                        </ProfileContainer>
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Friends);
