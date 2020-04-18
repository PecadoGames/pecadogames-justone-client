import React from 'react';
import { render } from 'react-dom';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";
import styled from "styled-components";
import {Button} from "../../../views/design/Button";

export const TextFriend = styled.body`
  background: transparent;
  margin-left: 5px;
  font-size:25px;
`;


class UsersBox extends React.Component {

    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.state = {
            users: [{}]
        }
    }

    async componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        const response = await api.get(`/users`)
        const friends = await api.get(`/users/${localStorage.getItem('id')}/friends`)
        const parsedFriends = friends.data
        const parsedResponse = response.data
        const index = parsedResponse.findIndex(x => x.id.toString() === localStorage.getItem('id'));
        if (index !== undefined) parsedResponse.splice(index, 1);
        for (let friend in parsedFriends){
            let indexResponse = parsedResponse.findIndex(x => x.id === parsedFriends[friend].id)
            if (indexResponse !== undefined || indexResponse !== -1) parsedResponse.splice(indexResponse, 1);
        }
        this.setState({['users']: parsedResponse})

    }

    async addUser(userId){
        const requestBody = JSON.stringify({
            senderID: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
        })
        await api.put(`/users/${userId}/friendRequests`, requestBody)
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
                <Element name="FriendBox" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'scroll',
                }}>
                    {/* start of messages */}
                    {this.state.users.map(users => {return(
                        <Element key = {users.id} name={users.user} style={{
                            marginTop: '30px'
                        }}>
                            <TextFriend> Username: {users.username} </TextFriend>
                            <TextFriend> UserID: {users.id}</TextFriend>
                            <Button onClick={()=>this.addUser(users.id)}>Add as friend</Button>


                        </Element>);
                    })}
                    {/* end of messages */}


                </Element>

            </div>
        );
    }
};

render(<UsersBox />, document.getElementById('root'));

export default withRouter(UsersBox)