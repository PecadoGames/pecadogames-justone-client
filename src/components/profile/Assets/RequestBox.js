import React from 'react';
import { render } from 'react-dom';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";
import {Button} from "../../../views/design/Button";
import styled from "styled-components";


export const FriendButton = styled.button`
    border: 2px solid black;
    margin-left: 0px;
    width: 150px;
    height: 50px;
    color: black;
    background: #b3b3b3;
    text-overflow: clip;
    margin-top: 15px;
    &:hover {
    background: #c9c9c9;
    }
`;

export const TextFriend = styled.body`
  background: transparent;
  margin-left: 5px;
  font-size:25px;
`;

class RequestBox extends React.Component {

    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.state = {
            requests: []
        }
    }

    async componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        const response = await api.get('/users/'+localStorage.getItem('id')+'/friendRequests')
        this.setState({['requests']: response.data})

    }

    async accept(userId){
        const requestBody = JSON.stringify({
            senderID: userId,
            token: localStorage.getItem("token"),
            accepted: true
        })
        await api.put(`/users/${localStorage.getItem("id")}/friends`, requestBody)
        const response = await api.get('/users/'+localStorage.getItem('id')+'/friendRequests')
        this.setState({['requests']: response.data})
    }

    async decline(userId){
        const requestBody = JSON.stringify({
            senderID: userId,
            token: localStorage.getItem("token"),
            accepted: false
        })
        await api.put(`/users/${localStorage.getItem("id")}/friends`, requestBody)
        const response = await api.get('/users/'+localStorage.getItem('id')+'/friendRequests')
        this.setState({['requests']: response.data})

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
                <Element name="RequestBox" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '300px',
                    overflow: 'scroll',
                }}>
                    {/* start of messages */}
                    {this.state.requests.map(user => {return(
                        <Element key = {user.id} name={user.user} style={{
                            marginTop: '10px'
                        }}>
                            <TextFriend>UserId: {user.id}</TextFriend>
                            <TextFriend>Username: {user.username}</TextFriend>
                            <FriendButton onClick={()=>this.accept(user.id)}>Accept</FriendButton>
                            <FriendButton onClick={()=>this.decline(user.id)}>Decline</FriendButton>
                        </Element>);
                    })}
                    {/* end of messages */}

                </Element>

            </div>
        );
    }
};

render(<RequestBox />, document.getElementById('root'));

export default withRouter(RequestBox)

