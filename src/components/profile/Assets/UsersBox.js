import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";
import { PixelButton, Row, RowContainer } from "./profileAssets";


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
            senderID: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
        })
        await api.put(`/users/${userId}/friendRequests`, requestBody)
    }

    displaySentOrRequestButton(userId){
        for (let index in this.state.sentFriendRequests){
            if (this.state.sentFriendRequests[index] === userId){
                return(
                <RowContainer>
                    Sent
                </RowContainer>
                )
                }
            }            
        return(
        <RowContainer>
            <PixelButton
                marginTop="null"
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
                <Element name="UserBox" className="element" id="containerElement" style={{
                    margin:"auto",
                    width:"85%",
                    height: '250px',
                    overflow: 'auto',
                }}>
                    {this.state.users.map(users => {return(
                        <Element key = {users.id} name={users.user} style={{
                            marginTop: '30px'
                        }}>
                            <Row>
                                <RowContainer>
                                    {users.username}
                                </RowContainer>
                                <RowContainer
                                    width="400px">
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
            </div>
        );
    }
};

render(<UsersBox />, document.getElementById('root'));

export default withRouter(UsersBox)