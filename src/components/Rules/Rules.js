import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import InviteLobbyPhone from "../lobby/InviteLobbyPhone";
import RuleBox from "./Assets/RuleBox";


const Background = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  height: 768px;
  border-radius: 20px;
  margin: auto
`;



class Scoreboard extends React.Component{
    constructor() {
        super();
        this.phone = null;
    }
    
    async componentDidMount() {   this.lobby()
    }

    lobby(){
        this.phone = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
    }

    componentWillUnmount() {
        this.props.changeArcadeToOff()
        clearInterval(this.phone)
    }


    render() {
        return(
            <div>
            <Background className={"Arcade"}>
                <RuleBox 
                    history={this.props.history}
                    changeArcadeToOn={this.props.changeArcadeToOn} 
                    changeArcadeToOff={this.props.changeArcadeToOff}/>
                <InviteLobbyPhone
                    marginTop="415px"
                    marginLeft="75px"
                    history={this.props.history}
                    showLogout={true}
                    changePhoneToOff={this.props.changePhoneToOff}
                    changePhoneToOn={this.props.changePhoneToOn}
                    changeTalkingToOff={this.props.changeTalkingToOff}
                    changeTalkingToOn={this.props.changeTalkingToOn}/>
            </Background>
            </div>
        );
    }
}

export default withRouter(Scoreboard);
