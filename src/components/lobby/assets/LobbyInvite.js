import React from 'react';
import { render } from 'react-dom';
import { Element, Events} from 'react-scroll';
import {api} from "../../../helpers/api";
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
            lobby: [],
            id: null,
            friends: [],
            sentInvites:[]
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        this.handleInputChange('lobby', this.props.lobby)
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        this.getFriendList();
    }

    async getFriendList(){
        const friendsResponse = await api.get(`/users/${localStorage.getItem('id')}/friends?token=${localStorage.getItem('token')}`)
        let friendsListOnlyID = friendsResponse.data
        let fullFriendList = []
        for (let friend in friendsListOnlyID){
            let friendId = friendsListOnlyID[friend].id
            let friendUserProfile = await api.get(`/users/${friendId}?token=${localStorage.getItem('token')}`)
            let friendUserDetails = friendUserProfile.data
            let isUserAlreadyInGame = false
            if(this.state.lobby != null){
                for (let player in this.state.lobby.playersInLobby){
                    if(this.state.lobby.playersInLobby[player].id === friendId){
                        isUserAlreadyInGame = true;
                        break;
                    }
                }        
                if (friendUserDetails.logged_in && !isUserAlreadyInGame){
                    fullFriendList.push(friendUserDetails);
                }
            }
        }

        fullFriendList.sort(function (a, b){
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        this.handleInputChange('friends', fullFriendList)
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

    static getDerivedStateFromProps(props, state) {
        if (props.lobby !== state.lobby) {
            return {
                lobby: props.lobby,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    shouldComponentUpdate(nextState){
        if(this.state.friends !== nextState.friends){
            this.getFriendList()
            return true;
        }
        else{
            return false;
        }
    }

    addSentRequest(userId){
        let sentInvites = this.state.sentInvites
        sentInvites.push(userId)
        this.setState({[sentInvites]: sentInvites})
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
                                No one to invite
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
}

render(<LobbyInvite />, document.getElementById('root'));

export default LobbyInvite;