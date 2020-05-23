import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import Lobbies from "./assets/Lobbies";
import InviteLobbyPhone from "./InviteLobbyPhone";
import {ButtonRow} from "../profile/Assets/profileAssets";
import { PixelButton } from '../../views/design/PixelButton';


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 768px;
  width: 1200px;
  border-radius: 20px;
  align-items: flex-start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 930px;
  height: 610px;
  margin-left: 270px;
  margin-top: 152px;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 520px;
`;

const Text = styled.div`
  font-size: 30px;
  color: #565553
  text-decoration: underline
`;

const NoLobbiesText = styled.div`
    margin-top: 180px;
    color: #565553;
    font-size: 20px;
    height: 415px;
` 

const LobbiesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 415px;
`;

export const NavigationButton = styled(PixelButton)`
    margin-top: 0px
    height: 45px
    background: none
    outline: 2px solid #565553
    border: none
    color: #565553
    opacity: ${props => (props.disabled ? 0.4 : 1)}
    cursor: ${props => (props.disabled ? "default" : "pointer")}
    &:hover {
        outline: ${props => (!props.disabled ? "2px solid white" : "2px solid #565553")}
        background: ${props => (!props.disabled ? "#565553" : "transparent")}
        color: ${props => (!props.disabled ? "white" : "#565553")}
    }
`;

const PageNumber = styled.text`
  color: #565553;
`;

class JoinLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbies: [],
            interval: null,
            number: 5,
        };
        this.phone = null;
    }

    getLobbyLength(){
        //1 is the default value
        if (!this.state.lobbies.length){
            return 1
        }
        else{
            return this.state.lobbies.length/5
        }
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
            const list = response.data
            this.setState({lobbies: list})
        }, 100)

    }

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.getLobbies()
        this.props.flipOn()
        this.lobby()

    }

    lobby(){
        this.phone = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
    }

    componentWillUnmount() {
        this.props.flipOff()
        clearInterval(this.state.interval)
        clearInterval(this.phone)
    }

    render() {
        return (
            <FormContainer className={"backgroundMain"}>
                <Container className={"blankNewsPaper"}>
                    <PageContainer>
                        <Text>Lobbies</Text>
                        {this.state.lobbies.length === 0 ?
                            (<NoLobbiesText>There are no lobbies</NoLobbiesText>
                                ):(
                            <LobbiesContainer>
                                <Lobbies lobbies = {this.state.lobbies} number={this.state.number}/>
                            </LobbiesContainer>)}
                        <ButtonRow>
                            {this.state.number > 5 &&
                            <NavigationButton
                                width="85px"  
                                onClick={()=>{this.changeSiteLeft(); this.props.flipOn()}}>
                                    Last
                            </NavigationButton>
                            }
                            <NavigationButton
                                width="130px"
                                onClick={()=> this.back()}>
                                Main Menu
                            </NavigationButton>
                            {this.state.lobbies.length > this.state.number &&
                            <NavigationButton
                                width="85px"
                                onClick={()=>{this.changeSiteRight();this.props.flipOn()}}>
                                    Next
                            </NavigationButton>
                            }
                        </ButtonRow>
                        <PageNumber>{this.state.number/5}/{Math.ceil(this.getLobbyLength())}</PageNumber>
                    </PageContainer>
                    <InviteLobbyPhone 
                        marginTop="263px"
                        history={this.props.history}
                        showRules={true}
                        showLogout={true}
                        changePhoneToOff={this.props.changePhoneToOff}
                        changePhoneToOn={this.props.changePhoneToOn}
                        changeTalkingToOff={this.props.changeTalkingToOff}
                        changeTalkingToOn={this.props.changeTalkingToOn}/>
                </Container>
            </FormContainer>
        )
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(JoinLobby);