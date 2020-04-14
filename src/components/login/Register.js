import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {InputField} from "../../views/design/InputField";
import {Title} from "../../views/Header"
import Sound from "react-sound";
import commercial from "../login/assets/CommercialFunnyMusic.mp3"




const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 1000px;
  width: 800px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;


const HandyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 730px;
  width: 400px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
  padding-top: 220px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 70px;
  
`;

const Label = styled.label`
  color: black;
  font-size: 27px;
  margin-left: 70px;
`;


class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            confirmation: null,
        };
    }

    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            await api.post('/users', requestBody);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter'){
            this.register();
        }
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.props.changeMusicToDim();


    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.username !== nextState.username || this.state.password !== nextState.password || this.state.confirmation !== nextState.confirmation){
            return false;}
        return true;
    }

    render() {
        return (

            <FormContainer className={'backgroundLogin'}
            >
                <Title>Just One Club</Title>
                <HandyContainer className={'handyImage'}>
                    <Sound url={commercial}
                           playStatus={Sound.status.PLAYING}
                           playFromPosition={800}
                           volume={30}
                           loop={true}
                    />
                    <Label>Username</Label>
                            <InputField
                                placeholder="Enter username"
                                width="220px"
                                marginLeft="70px"
                                height="45px"
                                onChange={e => {
                                    this.handleInputChange('username', e.target.value);
                                }}
                                color="black"
                                borderBottom= "null"
                                border= "1px solid black"

                            />
                    <Label>Password</Label>
                            <InputField
                                placeholder="Enter password"
                                width="220px"
                                marginLeft="70px"
                                height="45px"
                                type = {'password'}
                                onChange={e => {
                                    this.handleInputChange('password', e.target.value);
                                }}
                                color="black"
                                borderBottom= "null"
                                border= "1px solid black"
                            />
                    <Label>Confirm</Label>
                            <InputField
                                onKeyDown={this._handleKeyDown}
                                placeholder="Confirm password"
                                width="220px"
                                marginLeft="70px"
                                height="45px"
                                type = {'password'}
                                onChange={e => {
                                    this.handleInputChange('confirmation', e.target.value);
                                }}
                                color="black"
                                borderBottom= "null"
                                border= "1px solid black"
                            />
                        <ButtonContainer>
                            <Button
                                width="220px"
                                onClick={() => {
                                    this.register();
                                }}
                                boxShadow="none"
                                hover="none"
                            >
                                Sign up
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="220px"
                                onClick={() => {
                                    this.props.history.push(`/login`);
                                }}
                                boxShadow="none"
                                hover="none"
                            >
                                Back
                            </Button>
                        </ButtonContainer>
                </HandyContainer>
            </FormContainer>

        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Register);
