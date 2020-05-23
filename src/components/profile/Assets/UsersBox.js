import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";
import { Row, RowContainer } from "./profileAssets";
import { PixelButton } from "../../../views/design/PixelButton";
import styled from "styled-components";

const Text = styled.div`
  color: white
  font-size:25px;
`;

class UsersBox extends React.Component {

    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.state = {
            users: [],
            sentFriendRequests: []
        }
    }

    async componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        const response = await api.get(`/users?token=${localStorage.getItem('token')}`)
        const friends = await api.get(`/users/${localStorage.getItem('id')}/friends?token=${localStorage.getItem('token')}`)
        const parsedFriends = friends.data
        const parsedResponse = response.data
        const index = parsedResponse.findIndex(x => x.id.toString() === localStorage.getItem('id'));
        if (index !== undefined) parsedResponse.splice(index, 1);
        for (let friend in parsedFriends){
            let indexResponse = parsedResponse.findIndex(x => x.id === parsedFriends[friend].id)
            if (indexResponse !== undefined || indexResponse !== -1) parsedResponse.splice(indexResponse, 1);
        }
        parsedResponse.sort(function (a, b){
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        this.setState({['users']: parsedResponse})
    }

    async addUser(userId){
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
            senderID: localStorage.getItem("id")
        })
        await api.put(`/users/${userId}/friendRequests`, requestBody)
    }

    displaySentOrRequestButton(userId){
        for (let index in this.state.sentFriendRequests){
            if (this.state.sentFriendRequests[index] === userId){
                return(
                <RowContainer
                    width="266px">
                    Sent
                </RowContainer>
                )
                }
            }            
        return(
        <RowContainer
            width="266px">
            <PixelButton
                marginTop="null"
                marginLeft="null"
                marginRight="null"
                width="250px"
                onClick={() => {
                    this.addUser(userId);
                    this.addSentRequest(userId)
                }}>
                    Send friend request
            </PixelButton>
        </RowContainer>)
    }

    addSentRequest(userId){
        let sentFriendRequests = this.state.sentFriendRequests
        sentFriendRequests.push(userId)
        this.setState({['setFriendRequests']: sentFriendRequests})
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
            <div>
                    <Element name="userBox" className="userBox" id="containerElement" style={{
                        margin: "auto",
                        height: '250px',
                        overflow: 'auto',
                    }}>
                        {!this.state.users.length ?
                        <Row>
                            <RowContainer
                                width="auto">
                                You're lonely on this server :(
                            </RowContainer>
                        </Row>
                            :
                            null
                        }
                        {this.state.users.map(users => {
                            return (
                                <Element key={users.id} name={users.user} style={{
                                    marginTop: '30px'
                                }}>
                                    <Row>
                                        <RowContainer
                                            width="266px">
                                            {users.username}
                                        </RowContainer>
                                        <RowContainer
                                            width="266px">
                                            <PixelButton
                                                marginTop="null"
                                                onClick={() =>
                                                    this.props.history.push(`/game/users/${users.id}`)
                                                }>
                                                View Profile
                                            </PixelButton>
                                        </RowContainer>
                                        {this.displaySentOrRequestButton(users.id)}
                                    </Row>
                                </Element>);
                        })}
                    </Element>

                }
            </div>
        );
    }
};

render(<UsersBox />, document.getElementById('root'));

export default withRouter(UsersBox)