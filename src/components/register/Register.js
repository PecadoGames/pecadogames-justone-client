import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {InputField} from "../../views/design/InputField";
import {Title} from "../../views/Header";
import {UserWrapper} from "../../views/design/UserWrapper";
import {LockIcon} from "../../views/design/Icon";
import {UserIcon} from "../../views/design/Icon";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 450px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 2px;
  background: rgb(66 ,66 ,66);
  transition: opacity 0.5s ease, transform 0.5s ease;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            name: null,
            username: null,
            password: null,
            confirmation: null
        };
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                name: this.state.name,
                password: this.state.password
            });
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <Title>Registration</Title>
                <FormContainer>
                    <Form>
                        <UserWrapper>
                        <UserIcon/>
                        <InputField
                            placeholder="Enter username"
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        </UserWrapper>
                        <UserWrapper>
                            <UserIcon/>
                        <InputField
                            padding-left="100px"
                            placeholder="Enter name"
                            onChange={e => {
                                this.handleInputChange('name', e.target.value);
                            }}
                        />
                        </UserWrapper>
                        <UserWrapper>
                        <LockIcon/>
                        <InputField
                            placeholder="Enter password"
                            type = "password"
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        </UserWrapper>
                        <UserWrapper>
                            <LockIcon/>
                        <InputField
                            placeholder="Confirm password"
                            type = "password"
                            onChange={e => {
                                this.handleInputChange('confirmation', e.target.value);
                            }}
                        />
                        </UserWrapper>
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.name || !this.state.password ||!this.state.confirmation || !(this.state.password === this.state.confirmation)}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Sign up
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
