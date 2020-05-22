import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../helpers/api";
import styled from "styled-components";
import {PixelButton} from "../../views/design/PixelButton";
import {InputField} from "../../views/design/InputField";


const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextContainer = styled.div`
  display: flex;
  width: 210px;
  flex-direction: row;
  overflow: hidden;
  white-space:initial;
`;

const UsernameContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90px;
  overflow: hidden;
`;

const CreationContainer = styled.div`
      display: flex;
      flex-direction: row;
      margin-left: 10px;
      
`;

const Words = styled.div`
    margin-top: 12px;
    width: 80px;
    height: 40px;
    float: right;
    font-size: 24px;
    text-align: center;
    color: #c0c0c0
`;

const ChatRow = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    height: 45px;
    width 100%;
`

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
        this.state.interval = setInterval(async()=>{this.getMessages()}, 500)

        //scrolls down if page renders
        console.log("Reloaded page: scrolling down")

        setTimeout(()=>{
            const element = document.getElementById("containerElement")
            if(element){
                element.scrollBy(0, element.clientHeight)
            }}, 1000
            )
    }

    async getMessages(){
        const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/chat?token=${localStorage.getItem('token')}`)
        this.setState({['messages']: response.data.messages});
        this.scrollDown()
    }

    displayCharacters(){
        if (this.state.chatMessage.length <= 50){
            return <div>{this.state.chatMessage.length}/50</div>
        }
        else{
            return <div style={{color:'red'}}>
                {this.state.chatMessage.length}/50
                </div>
        }
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
        clearInterval(this.state.interval)
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    formatString(message){
        if (message.length <= 50){
            //splits string into array at " "
            let splitMessage = message.split(" ");
            let i;
            for (i=0; i < splitMessage.length; i++){
                if (splitMessage[i].length > 25){
                    splitMessage[i] = this.sliceMessage(splitMessage[i])
                }
            }
            console.log("sending message:" + splitMessage.join(" "))
                return splitMessage.join(" ");
        }
        else{
            alert("Message too long!")
            return "";
        }
    }

    sliceMessage(messageToBeSpliced){
        let part1 = messageToBeSpliced.slice(0, 25)
        let part2 = messageToBeSpliced.slice(25, messageToBeSpliced.length)
        if (part2.length > 26){
            alert("Spamming a long message won't help anybody. You're probably hangry, just eat a snickers™")
        }
        else{
            let words = [part1, part2]
            return words.join(" ");
        }
    }

    async sendMessage(){
        if (this.formatString(this.state.chatMessage)){
            try{
                const requestBody = JSON.stringify({
                    playerId: localStorage.getItem('id'),
                    playerToken: localStorage.getItem('token'),
                    message: this.formatString(this.state.chatMessage),
                })
                await api.put(`/lobbies/${localStorage.getItem('lobbyId')}/chat`, requestBody)
                this.handleInputChange('chatMessage', '')
            }
            catch(error){
                alert("could not send chat message" + error)
            }
        }
    }

    displayUsername(username){
        if (username.length > 8){
            let adjustedName = username.slice(0, 8)
            return adjustedName + "..:"
        }
        else{
            return username + ":"
        }
    }

    _handleKeyDown= (e) => {
        if (e.key === 'Enter' && this.state.chatMessage){
            this.sendMessage()
        }
    }


    scrollDown(){
        //gets chatBox
        const element = document.getElementById("containerElement")
        //gets height
        if (element){
            const clientHeight = element.clientHeight;
            const currentPosition = element.scrollTop;
            const scrollHeight = element.scrollHeight;
            let tolerance = scrollHeight - 50;

            //if this is true the user is at the bottom with 5 percent error margin
            console.log(clientHeight + "+" + currentPosition + ">=" + tolerance )
            console.log("scrolling down to chatBox: " + (clientHeight + currentPosition >= tolerance))
            if (clientHeight + currentPosition >= tolerance){
                setTimeout(()=>{
                    element.scrollBy(0, element.clientHeight)
                    }, 200
                )
        }}
    }

    render() {
        return (
            <div>
                <Element name="chatBox" className="chatBox" id="containerElement" style={{
                    marginTop: '15px',
                    marginRight: '5px',
                    display: 'block',
                    position: 'relative',
                    height: '395px',
                    overflow: 'auto',
                    padding: '2px',
                    boxShadow: '0 0  5px #5ccc2f',
                    color: 'rgba(192, 192, 192, 1)'

                }}>
                    {this.state.messages.map(message => {return(
                        <Element key = {message.messageId} name={message.user} style={{marginTop: '5px'}}>
                            <Container>
                            <UsernameContainer>{this.displayUsername(message.authorUsername)}</UsernameContainer>
                            <TextContainer>{message.text}</TextContainer>
                            <CreationContainer>  {message.creationDate}</CreationContainer>
                            </Container>
                        </Element>
                    );
                    })}
                </Element>
                <ChatRow>
                    <InputField
                        color= '#c0c0c0'
                        placeholderColor='rgba(192, 192, 192, 0.5)'
                        borderBottom= "1px solid #5ccc2f"
                        marginLeft="2px"
                        marginTop="10px"
                        placeholder="Chat with others"
                        width="240px"
                        value={this.state.chatMessage}
                        onChange={e => {
                            this.handleInputChange('chatMessage', e.target.value);
                        }}
                        onKeyDown={this._handleKeyDown}
                    >
                    </InputField>
                    <Words>
                        {this.displayCharacters()}
                    </Words>
                    <PixelButton
                        color= 'rgba(92, 204, 47, 1)'
                        marginTop="2px"
                        marginLeft="1px"
                        width="75px"
                        disabled={!this.state.chatMessage.length}
                        onClick={()=>this.sendMessage()}>
                            Send
                    </PixelButton>
                </ChatRow>
            </div>
        );
    }
};

render(<ChatBox />, document.getElementById('root'));

export default withRouter(ChatBox)

