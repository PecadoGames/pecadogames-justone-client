import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {InputField} from "../../views/design/InputField";
import Sound from 'react-sound';
import open_creaky_door from '../login/assets/open_creaky_door.mp3'
import { BlinkingPixelButton } from '../profile/Assets/profileAssets';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 885px;
  width: 800px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const PhoneContainer = styled.div`
  margin-top: -10px;
  display: flex;
  justify-content: center;
  margin-left 600px;
  width: 200px;
  height: 365px;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  height: 300px;
  width: 145px;
  color: #c0c0c0;    
  text-align: center;
  align-items: center;
  font-size: 35px;
`

const AdvertismentText = styled.div`
  color: ${props => props.color};    
  text-align: center;
  font-size: 35px;
`


const DoorEnterText = styled.span`
  cursor: pointer;
  margin-left: 330px;
  height: 200px;
  width: 100px;
  color: black;
  font-size: 30px;
  text-align: center;
`

 export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 315px;
`

  const LoginFields = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => props.marginLeft || "-30px"};
  margin-bottom: ${props => props.marginBottom || "20px"};
  margin-top: ${props => props.marginTop};
  box-shadow: none;
  border-radius: ${props => props.borderRadius || "0px"};
  padding-left: 5px;
  height: ${props => props.height};
  width: ${props => props.width || "100%"};
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
`;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      passwordVisibility: false,
      showError: false,
      picture: "backgroundLogin",
      playStatus: Sound.status.STOPPED,
      logIn: false,
      register: true
    };
  }

  _handleKeyDown = (e) => {
      if (e.key === 'Enter'){
          this.logging();
          this.login();
      }
  }

  toggleError = () => {
    this.setState(() => {return{showError: true}
    })
  };

  toggleErrorFalse = () => {
    this.setState(() => {return{showError: false}
    })
  };

  toggleSound(){
    this.handleInputChange('playStatus', Sound.status.PLAYING)
  }

  unToggleSound(){
      this.handleInputChange('playStatus', Sound.status.STOPPED)
  }

  async login() {
    try {
        const requestBody = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            token: null
        });
        const url = await api.put('/login', requestBody);
        if(url.status === 200){
          this.handleDoor();
          this.toggleErrorFalse();
          await new Promise(resolve => setTimeout(resolve, 1500));
          const user = new User(url.data);

          if (user.token != null){
              localStorage.setItem('token', user.token);
              localStorage.setItem('id', user.id);
              this.props.history.push(`/game`);
          }
        }
        if(url.status === 204){
            this.toggleError();
        }
     }catch (error) {
         alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

  }

  handleDoor(){
      this.toggleSound();
      this.backgroundChangeToGif();
      this.handleInputChange('musicStatus', Sound.status.STOPPED)
      setTimeout(() => {this.unToggleSound()}, 2500);
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  backgroundChangeToGif(){
      this.handleInputChange('picture', "backgroundLoginGif2");
  }

  backgroundChangeToPng(){
      this.handleInputChange('picture', "backgroundLogin");
  }

  logging(){
      this.handleInputChange('logIn', true)
  }

  componentDidMount() {
      this.props.changeMusicToDim()
  }

    shouldComponentUpdate(nextState) {
      if(
        this.state.logIn !== nextState.logIn || 
        this.state.playStatus !== nextState.playStatus || 
        this.state.picture !== nextState.picture ||
        this.state.showError !== nextState.showError){
          return true;}
      return false;
  }

    render() {
    return (
        <FormContainer className={this.state.picture}>
          <Container>
              <Sound url={open_creaky_door}
                     playStatus={this.state.playStatus}
                     playFromPosition={100}
                     volume={20}
              />
          </Container>
          <LogoContainer>          
            <img src={require('./assets/logo_j1.gif')} width="150" alt="J1 blinking neon-sign"/>
          </LogoContainer>
              <LoginFields>
                <InputField
                    placeholder="Enter username"
                    width="30%"
                    username={this.state.username}
                    onChange={e =>{
                      this.handleInputChange('username', e.target.value)
                    }}
                    onKeyDown={this._handleKeyDown}
                />
                <Button
                    width="1.6rem"
                    background="black"
                    boxShadow="null"
                    height="1rem"
                    disabled="true"
                />
              </LoginFields>
              <LoginFields>
                <InputField
                    placeholder="Enter password"
                    width="30%"
                    type = 'password'
                    onChange={e => {
                      this.handleInputChange('password', e.target.value);

                    }}
                    onKeyDown={this._handleKeyDown}
                />
              </LoginFields>
                <LoginFields
                  marginLeft = "-25px"
                  marginBottom="none"
                  color="red"
                  height="25px"
                  fontSize="25px"
                  >
                    {this.state.showError && "User already logged in"}
                </LoginFields>
              
                <DoorEnterText
                  onClick={() => {
                    this.logging();
                    this.login();
                    }}
                >
                  {this.state.picture === "backgroundLogin" &&
                  "Enter"}
                </DoorEnterText>
              <PhoneContainer 
                className = "buttonImage">
                <RegisterContainer>
                  PecadOS
                  <AdvertismentText
                    color="#ff00ff">
                    1000000
                  </AdvertismentText>
                  <AdvertismentText
                    color="#00ccff">
                    User
                  </AdvertismentText>
                  <img src={require('./assets/membercard_small.png')} width="100" alt="Membercard"/>
                    <BlinkingPixelButton                    
                      width = "135px"
                      marginTop = "15px"
                      height = "auto"
                      blinkingAnimation = "blinkingAnimation 0.7s infinite"
                      onClick={() => {
                      this.props.history.push(`/register`);
                    }}>
                      REGISTER NOW
                    </BlinkingPixelButton>
                </RegisterContainer>
              </PhoneContainer>
        </FormContainer>

    )
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
