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
        parsedResponse.sort(function (a, b){
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        this.setState({['users']: parsedResponse})
        // const parsedFriends = friends.data
        // for (let friend in parsedFriends){ api.get(users/parsedFriends[friend].id)

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
                <Element name="UserBox" className="element" id="containerElement" style={{
                    margin:"auto",
                    width:"85%",
                    height: '250px',
                    overflow: 'auto',
                }}>
                    {/* start of messages */}
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
                                        onClick={()=>this.props.history.push(`/game/users/${users.id}`)}>View Profile
                                    </PixelButton>
                                </RowContainer>
                                <RowContainer>
                                <PixelButton
                                    marginTop="null"
                                    width="250px"
                                    onClick={()=>this.addUser(users.id)}>
                                        Send friend request
                                </PixelButton>
                                </RowContainer>
                            </Row>
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