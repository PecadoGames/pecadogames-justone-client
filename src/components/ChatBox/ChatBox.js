import React from 'react';
import { render } from 'react-dom';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../helpers/api";
import styled from "styled-components";
import {Button} from "../../views/design/Button";


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
            interval: null
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
        this.state.interval = setInterval(async()=>{const response = await api.get(`/lobbies/${localStorage.getItem('lobbyId')}/chat`);
        this.setState({['messages']: response.data.messages});
        }, 1000)
    }


    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
        clearInterval(this.state.interval)
    }


    render() {
        return (
            <div>
                <Element name="chatBox" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '300px',
                    overflow: 'scroll',
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
            </div>
        );
    }
};

render(<ChatBox />, document.getElementById('root'));

export default withRouter(ChatBox)

