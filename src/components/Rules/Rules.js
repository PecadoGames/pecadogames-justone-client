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



class Rules extends React.Component{
    constructor() {
        super();
        this.state = {
            interval: null
        };
    }
    
    async componentDidMount() {
        this.lobby()
        let interval = setInterval(async()=>{   
            this.lobby()
        },1000)
        this.setState({interval: interval})
    }

    lobby(){

        if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();
            this.props.history.push('/game');
        }

    }

    componentWillUnmount() {
        this.props.changeArcadeToOff()
        clearInterval(this.state.interval)
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

export default withRouter(Rules);
