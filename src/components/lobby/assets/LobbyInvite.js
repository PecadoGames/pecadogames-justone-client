import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";
import { Row, RowContainer } from "../../profile/Assets/profileAssets";
import { PixelButton } from "../../../views/design/PixelButton";

const HandyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 730px;
  width: 400px;
`;

const PhoneScreen = styled.div`
    display: flex;
    flex-direction: column;
    width: 294px;
    height: 590px;
    margin-top: 54px;
    margin-left: 53px;
` 

const LargePhoneTitle = styled.div`
    margin-left: 0px;
    width: 100%;
    font-size: 50px;
    height: auto;
    background: #000000;
    border-bottom: 2px solid #c0c0c0;
    color: #c0c0c0;
    text-align: center;
`

class LobbyInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            friends: []
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

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
            <div>
                <HandyContainer className={'handyImageSmall'}>
                    <PhoneScreen>
                        <LargePhoneTitle>
                            ../Friends.js
                        </LargePhoneTitle>
                        <Element name="FriendsBox" className="element" id="containerElement" style={{
                            width:"100%",
                            height:"500px",
                            overflow: 'auto',
                        }}>
                            {this.state.friends.map(friends => {
                                return(
                                    <Element key = {friends.id} name={friends.user} style={{}}>
                                        <Row>
                                            <RowContainer
                                                width="200px">
                                                {friends.username}
                                            </RowContainer>
                                            <RowContainer>
                                                <PixelButton
                                                    marginTop="null"
                                                    width="90px"
                                                    onClick={() =>
                                                        this.sendInvite(friends.id)}>
                                                        Invite
                                                </PixelButton>
                                            </RowContainer>
                                        </Row>
                                    </Element>);
                            })}
                            </Element>
                    </PhoneScreen>
                </HandyContainer>
            </div>
        );
    }
};



render(<LobbyInvite />, document.getElementById('root'));

export default LobbyInvite;