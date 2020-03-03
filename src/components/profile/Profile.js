import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Button} from '../../views/design/Button';
import {withRouter} from 'react-router-dom';
import {UserWrapper} from "../../views/design/UserWrapper";
import {CakeIcon, CreationIcon, OfflineIcon, OnlineIcon, UserIcon} from "../../views/design/Icon";
import {InputField} from "../../views/design/InputField";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
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
        if(this.state.status){
            return <OnlineIcon/>
        }
        return <OfflineIcon/>
    }

    parseDate(){
        const milliseconds = Date.parse(this.state.creationDate);
        const date = new Date(milliseconds);
        const day = date.getDay()+1;
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        return day + "." + month + "."+year
    }

    async componentDidMount() {
        this.state.id = this.props.match.params.id;
        try {
            await api.get('/users/'+this.state.id)
                .then(response => {return new User(response.data)})
                .then(data => this.setState(
                    {username: data.username,
                        birthday: data.birthday,
                        status: data.logged_in,
                        creationDate: data.creation_date})
                );
        }        catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
            // See here to get more data.


    }

    render() {
        return (
            <Container>
                <h2>{this.state.username}</h2>
                <div>
                    <UserWrapper>
                        <UserIcon/>
                        <InputField
                            disabled={!this.state.editable}
                            placeholder={this.state.username}
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                    </UserWrapper>
                    <UserWrapper>
                        {this.checkStatus()}
                        <InputField
                            disabled={true}
                            placeholder={(this.state.status) ? "Online" : "Offline"}
                        />
                    </UserWrapper>
                    <UserWrapper>
                        <CreationIcon/>
                        <InputField
                            disabled={true}
                            placeholder={this.parseDate()}
                        />
                    </UserWrapper>
                    <UserWrapper>
                        <CakeIcon/>
                        <InputField
                            disabled={!this.state.editable}
                            placeholder={(!this.state.birthday) ? "Birthday" : this.state.birthday}
                        />
                    </UserWrapper>
                    <Button
                        disabled={this.state.editable}
                        width="100%"
                        onClick={() => {
                            this.setState(prevState => ({editable: !prevState.editable}));
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        width="100%"
                        onClick={() => {
                            this.backToOverview();
                        }}
                    >
                        Done
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(Profile);
