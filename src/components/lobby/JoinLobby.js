import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Sound from 'react-sound';
import FlipNewspaper from "../lobby/assets/FlipNewspaper.mp3"
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import {Button} from "../../views/design/Button";
import Lobbies from "./assets/Lobbies";



const Text = styled.div`
  font-size: 30px;
  color: #000000
  margin-left: 120px;
`;



const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 1200px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 848px
  width: 807px;
  border-radius: 20px;
  align-items: flex-start;  
  margin-left: 270px;
  margin-top: 150px;
  padding-right: 730px;
  padding-bottom: 800px;
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 10px;
  align-items: flex-start;  
  `

const SiteButtonLeft = styled.button`
  position: absolute
  margin-top: 650px;
  margin-left: 290px
`

const SiteButtonRight = styled.button`
  position: absolute
  margin-top: 650px;
  margin-left: 550px
`

const PageNumber = styled.text`
  position: absolute
  margin-top: 660px;
  margin-left: 430px;
  color: black;
`

class JoinLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbies: [],
            interval: null,
            number: 5
        }
        ;
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async logout() {
        try{
            const requestBody = JSON.stringify({
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token")
            });
            await api.put('/logout', requestBody);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            this.props.history.push('/login');
        }
        catch(error){
            alert(`Something went wrong during the logout \n${handleError(error)}`)
        }
    }

    back(){
        this.props.flipOff()
        this.props.history.push(`/game`);
    }

    changeSiteRight=()=>{
        this.setState({ number: this.state.number+5 });
    }
    changeSiteLeft=()=>{
        if(this.state.number > 5){
        this.setState({ number: this.state.number-5 });}
    }



    async getLobbies(){
        this.state.interval = setInterval(async ()=> {
            const response = await api.get(`/lobbies?token=${localStorage.getItem('token')}`)
            this.setState({lobbies: response.data})
        }, 100)

    }
    async componentDidMount() {
            this.props.changeMusicToNormal()
            this.getLobbies()
            this.props.flipOn()
    }

    componentWillUnmount() {
        this.props.flipOff()
        clearInterval(this.state.interval)
    }


    render() {
        return (
            <FormContainer className={"backgroundMain"}>
                <LogoutButton
                    onClick={()=>{
                        this.logout();
                    }}
                >Logout</LogoutButton>
                <Container className={"blankNewsPaper"}>
                    <SmallContainer className={"backArrow"}>
                        <Button
                        height = "18px"
                        width="40px"
                        background= "none"
                        opacity= "0"
                        boxShadow = "null"
                        onClick={()=>{
                        this.back();
                    }}
                        >

                        </Button>
                        <Text>Lobbies</Text>
                    </SmallContainer>
                    <Lobbies lobbies = {this.state.lobbies} number={this.state.number}/>
                </Container>
                {this.state.number > 5 ?
                    <SiteButtonLeft  onClick={()=>{this.changeSiteLeft(); this.props.flipOn()}}>left</SiteButtonLeft>
                    :
                    null
                }
                {this.state.lobbies.length > this.state.number ?
                    <SiteButtonRight onClick={()=>{this.changeSiteRight();this.props.flipOn()}}>right</SiteButtonRight>
                    :
                    null
                }
                <PageNumber>{this.state.number/5}/{Math.ceil(this.state.lobbies.length/5)}</PageNumber>
            </FormContainer>

        )
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(JoinLobby);