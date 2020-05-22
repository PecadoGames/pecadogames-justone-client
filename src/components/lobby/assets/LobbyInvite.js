import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll as scroll } from 'react-scroll';
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";
import { Row, RowContainer } from "../../profile/Assets/profileAssets";
import { PixelButton } from "../../../views/design/PixelButton";

export const PhoneScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 480px;
`;

const NotOnlineMessage = styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #c0c0c0;
`;

export const ScreenHeader = styled.text`
margin-top: 10px;
text-align: center;
color: #c0c0c0;
font-size: 30px;
text-decoration: underline;
`;

class LobbyInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            friends: [],
            sentInvites:[]
        }
    }

    async componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        const friendsResponse = await api.get(`/users/${localStorage.getItem('id')}/friends?token=${localStorage.getItem('token')}`)
        let friendsListOnlyID = friendsResponse.data
        let fullFriendList = []
        for (let friend in friendsListOnlyID){
            let friendUserProfile = await api.get(`/users/${friendsListOnlyID[friend].id}?token=${localStorage.getItem('token')}`)
            let friendUserDetails = friendUserProfile.data
            if (friendUserDetails.logged_in){
                fullFriendList.push(friendUserDetails);
            }
        }
        fullFriendList.sort(function (a, b){
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        this.setState({['friends']: fullFriendList})
    }

    async sendInvite(userId){
        const idOfLobby = localStorage.getItem("lobbyId");
        const requestBody = JSON.stringify({
            lobbyId: idOfLobby,
            userId: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userToInviteId: userId
        })
        await api.put(`/lobbies/${idOfLobby}/invitations`, requestBody)
    }

    displaySentOrRequestButton(userId){
        for (let index in this.state.sentInvites){
            if (this.state.sentInvites[index] === userId){
                return(
                <RowContainer
                    height="50px"
                    width="90px">
                    Sent
                </RowContainer>
                )
                }
            }            
        return(
            <RowContainer>
                <PixelButton
                    marginTop="null"
                    width="90px"
                    onClick={() =>{
                        this.sendInvite(userId);
                        this.addSentRequest(userId)}}>
                        Invite
                </PixelButton>
        </RowContainer>
        )
    }

    addSentRequest(userId){
        let sentInvites = this.state.sentInvites
        sentInvites.push(userId)
        this.setState({['sentInvites']: sentInvites})
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
                <PhoneScreen>
                    <ScreenHeader>../InviteFriends.js</ScreenHeader>
                    <Element name="inviteFriends" className="inviteFriends" id="containerElement" style={{
                        marginRight:"5px",
                        marginTop:"20px",
                        width:"100%",
                        height:"380px",
                        overflow: 'auto',
                    }}>
                        {this.state.friends.length === 0 && 
                            <NotOnlineMessage>
                                There is no friend online
                            </NotOnlineMessage>}
                        {this.state.friends.map(friends => {
                            return(
                                <Element key = {friends.id} name={friends.user} style={{}}>
                                    <Row>
                                        <RowContainer
                                            height="55px"
                                            width="120px">
                                            {friends.username}
                                        </RowContainer>
                                        {this.displaySentOrRequestButton(friends.id)}
                                    </Row>
                                </Element>);
                        })}
                        </Element>
                        <PixelButton
                            marginTop="5px"                                                
                            onClick={() =>
                            this.props.toggleInviteFriends()}>
                            Back
                        </PixelButton>
                </PhoneScreen>
        );
    }
};



render(<LobbyInvite />, document.getElementById('root'));

export default LobbyInvite;