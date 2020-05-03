import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../helpers/api";
import styled from "styled-components";
import {Button} from "../../views/design/Button";
import {InputField} from "../../views/design/InputField";


const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextContainer = styled.div`
  display: flex;
  width: 150px;
  flex-direction: row;
`;

const UsernameContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90px;
`;

const CreationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;





class ChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            interval: null,
            chatMessage: ''
        }
    }

    async componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        //ask ever second for chat
        this.state.interval = setInterval(async()=>{this.getMessages()}, 2000)

    }

    async getMessages(){
        const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/chat?token=${localStorage.getItem('token')}`)
        this.setState({['messages']: response.data.messages});
        this.scrollDown()
    }



    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
        clearInterval(this.state.interval)
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async sendMessage(){
        const requestBody = JSON.stringify({
            playerId: localStorage.getItem('id'),
            playerToken: localStorage.getItem('token'),
            message: this.state.chatMessage,
        })
        await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/chat`, requestBody)
        this.handleInputChange('chatMessage', '')
    }

    _handleKeyDown= (e) => {
        if (e.key === 'Enter'){
            this.sendMessage()
        }
    }

    scrollDown(){
        //gets chatbox
        const element = document.getElementById("containerElement")
        //gets height
        if (element){
            const clientHeight = element.clientHeight;
            const currentPosition = element.scrollTop;
            const scrollHeight = element.scrollHeight;

            let tolerance = scrollHeight - (scrollHeight/20);
            //if this is true the user is at the bottom with 5 percent error margin
            console.log("scrolling down to chatbox: " + (clientHeight + currentPosition >= tolerance))
            if (clientHeight + currentPosition >= tolerance){
                setTimeout(()=>{
                    element.scrollBy(0, 50)
                    }, 200
                )
        }}
    }

    render() {
        return (
            <div>
                <Element name="chatBox" className="element" id="containerElement" style={{
                    display: 'block',
                    position: 'relative',
                    height: '300px',
                    overflow: 'auto',
                }}>
                    {/* start of messages */}
                    {this.state.messages.map(message => {return(
                        <Element key = {message.messageId} name={message.user} style={{marginTop: '5px'}}>
                            <Container>
                            <UsernameContainer>{message.authorUsername}:</UsernameContainer>
                            <TextContainer>{message.text}</TextContainer>
                            <CreationContainer>  {message.creationDate}</CreationContainer>
                            </Container>
                        </Element>
                    );
                    })}
                    {/* end of messages */}
                </Element>
                <InputField
                    placeholder="chat"
                    width="30%"
                    value={this.state.chatMessage}
                    onChange={e => {
                        this.handleInputChange('chatMessage', e.target.value);
                    }}
                    onKeyDown={this._handleKeyDown}
                >
                </InputField>
                <Button
                    onClick={()=>this.sendMessage()}>Send</Button>
            </div>
        );
    }
};

render(<ChatBox />, document.getElementById('root'));

export default withRouter(ChatBox)

