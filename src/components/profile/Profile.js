import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import {UserWrapper} from "../../views/design/UserWrapper";
import {OfflineIcon, OnlineIcon, UserIcon, CreationIcon, CakeIcon} from "../../views/design/Icon";
import {InputField} from "../../views/design/InputField";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            id: this.props.match.params.id,
            username: null,
            status: null,
            creationDate: null,
            birthday: null,
            editable : false
        };
    }

    backToOverview() {
        this.props.history.push('/login');
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    checkStatus(){
        if(this.state.status === "ONLINE"){
            return <OnlineIcon/>
        }
        return <OfflineIcon/>
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users/:id');

            // Get the returned users and update the state.
            this.setState("username", response.username);
            this.setState("status", response.status);
            this.setState("creationDate", response.creationDate);
            this.setState("birthday", response.birthday);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <h2>{this.username}</h2>
                <div>
                    <UserWrapper>
                        <UserIcon/>
                        <InputField
                            disabled={!this.state.editable}
                            placeholder={this.username}
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                    </UserWrapper>
                    <UserWrapper>
                        {this.checkStatus()}
                        <InputField
                            disabled={true}
                            placeholder={this.status}
                        />
                    </UserWrapper>
                    <UserWrapper>
                        <CreationIcon/>
                        <InputField
                            disabled={true}
                            placeholder={this.creationDate}
                        />
                    </UserWrapper>
                    <UserWrapper>
                        <CakeIcon/>
                        <InputField
                            disabled={!this.state.editable}
                            placeholder={(!this.state.birthday) ? "Enter birthday" : this.state.birthday}
                        />
                    </UserWrapper>
                    <Button
                        disabled={!this.state.editable}
                        width="100%"
                        onClick={() => {
                            this.setState(prevState => ({editable: !prevState.editable}));
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        margin
                        width="100%"
                        onClick={() => {
                            this.backToOverview();
                        }}
                    >
                        Done
                    </Button>
                </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Profile);
