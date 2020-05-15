import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import InviteLobbyPhone from "../lobby/InviteLobbyPhone";
import RuleBox from "./Assets/RuleBox";
import {LogoutButton} from "../../views/design/LogoutButton";
import {BackgroundContainer} from "../main/Main";


const Background = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 800px;
  border-radius: 20px;
  align-items: flex-start;  
  margin: auto
`;



const Container = styled.div`
    position: absolute
    margin-button: 1000px;
    margin-right: 100px
    margin-top: 10px
`;
const BoxContainer = styled.div`
    position: absolute
    margin-right: 100px
    margin-top: 10px
`;




class Scoreboard extends React.Component{
    constructor() {
        super();
        this.state = {
            phone: null
        };
    }

    async componentDidMount() {   this.lobby()

    }

    lobby(){
        this.state.phone = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.phone)
    }

    render() {
        return(

            <div>
                <Container>
                    <InviteLobbyPhone changePhoneToOff={this.props.changePhoneToOff}
                                      changePhoneToOn={this.props.changePhoneToOn}
                                      changeTalkingToOff={this.props.changeTalkingToOff}
                                      changeTalkingToOn={this.props.changeTalkingToOn}
                    >
                    </InviteLobbyPhone>
                </Container>

            <Background className={"Arcade"}>
                <LogoutButton onClick={() => {this.props.history.push(`main`)}}>
                    Back
                </LogoutButton>
                <RuleBox></RuleBox>
            </Background>
            </div>

        );
    }
}

export default withRouter(Scoreboard);
