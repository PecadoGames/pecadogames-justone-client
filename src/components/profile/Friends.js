import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import User from "../shared/models/User";
import {BackgroundContainer} from "../main/Main";
import {FriendRequestBanner, PhoneContainer, TextRight, TextLeft, TextContainer, PixelButton, One, Two, ProfilePicContainer, ProfileContainer, Banner} from "./Assets/profileAssets";
import FriendBox from "./Assets/FriendBox";
import UsersBox from "./Assets/UsersBox";


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
                    <Banner></Banner>
                    <ProfileContainer>
                        <One>
                            <PixelButton
                                onClick={() => {
                                    this.props.history.push(`/game/users/${this.state.id}`);
                                }}
                            >Back</PixelButton>
                            <PixelButton  onClick={() => {this.addFriend() }}>{this.state.addUser ? ('Friends'): ('Add Friends')}</PixelButton>
                        </One>
                        <Two>
                            {!this.state.addUser ? (<FriendBox></FriendBox>) : (<UsersBox></UsersBox>)}

                        </Two>

                    </ProfileContainer>
                </PhoneContainer>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Friends);
