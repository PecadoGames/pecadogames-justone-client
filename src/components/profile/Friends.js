import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import User from "../shared/models/User";
import {BackgroundContainer} from "../main/Main";
import {FriendRequestBanner, PhoneContainer, TextRight, TextLeft, TextContainer, PixelButton, One, Two, ProfilePicContainer, ProfileContainer, Banner} from "./Assets/profileAssets";
import FriendBox from "./Assets/FriendBox";


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




class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: null,
            username: null
        };
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async sendFriendRequest(){


        const requestBody = JSON.stringify({
            senderID: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
        })
        await api.put(`/users/usersid/friendRequests`, requestBody)

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
                    <Banner></Banner>
                    <ProfileContainer>
                        <One>
                            <PixelButton
                                onClick={() => {
                                    this.props.history.push(`/game/users/${this.state.id}`);
                                }}
                            >Back</PixelButton>
                            <PixelButton  onClick={() => {this.sendFriendRequest() }}>Add Friend</PixelButton>
                        </One>
                        <Two>
                           <FriendBox></FriendBox>
                            <InputField placeholder="FriendsName"
                                        username={this.state.username}
                                        onChange={e =>{
                                            this.handleInputChange('username', e.target.value)
                                        }}
                            >

                            </InputField>
                        </Two>

                    </ProfileContainer>
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Friends);
