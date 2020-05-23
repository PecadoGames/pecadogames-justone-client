import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";
import styled from "styled-components";
import { PixelButton } from "../../../views/design/PixelButton";
import { Row, RowContainer } from "./profileAssets";

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

export const AcceptButton = styled(PixelButton)`
    margin-top : ${props => props.marginTop};
    outline: 2px solid #1D6F42
    color: #1D6F42
    &:hover{
        background: #1D6F42
    }
`;

export const DeclineButton = styled(PixelButton)`
    margin-top : ${props => props.marginTop};
    outline: 2px solid #F03A17
    color: #F03A17
    &:hover{
        background: #F03A17
    }
`

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
        this.updateFriendRequests()
    }

    async accept(userId){
        const requestBody = JSON.stringify({
            requesterID: userId,
            accepterToken: localStorage.getItem("token"),
            accepted: true
        })
        await api.put(`/users/${localStorage.getItem("id")}/friends`, requestBody)
        this.updateFriendRequests()
    }

    async decline(userId){
        const requestBody = JSON.stringify({
            requesterID: userId,
            accepterToken: localStorage.getItem("token"),
            accepted: false
        })
        await api.put(`/users/${localStorage.getItem("id")}/friends`, requestBody)
        this.updateFriendRequests()
    }

    async updateFriendRequests(){
        const response = await api.get(`/users/${localStorage.getItem('id')}/friendRequests?token=${localStorage.getItem('token')}`)
        this.setState({requests: response.data})
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
                    margin:"auto",
                    width:"85%",
                    height: '250px',
                    overflow: 'auto',
                }}>
                    {this.state.requests.map(user => {return(
                        <Element key = {user.id} name={user.user}>
                            <Row>
                                <RowContainer>
                                    {user.username}
                                </RowContainer>
                                <RowContainer
                                    width="400px">
                                    <PixelButton 
                                        marginTop="null"
                                        onClick={()=>this.props.history.push(`/game/users/${user.id}`)}>View Profile
                                    </PixelButton>
                                </RowContainer>
                                <RowContainer>
                                <AcceptButton
                                    marginTop="null" 
                                    onClick={()=>this.accept(user.id)}>
                                        Accept
                                </AcceptButton>
                                </RowContainer>
                                <RowContainer>
                                    <DeclineButton
                                    marginTop="null" 
                                    onClick={()=>this.decline(user.id)}>
                                        Decline
                                    </DeclineButton>
                                </RowContainer>
                            </Row>
                        </Element>);
                    })}
                </Element>

            </div>
        );
    }
}

render(<RequestBox />, document.getElementById('root'));

export default withRouter(RequestBox)

