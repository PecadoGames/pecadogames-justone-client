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
            user: null,
            id: null,
            username: null,
            status: null,
            creationDate: null,
            birthday: null,
            editable : false
        };
    }

    async updateUser() {
        if(this.state.user.username !== this.state.username){
            this.state.user.username = this.state.username
        }
        else{
            this.state.user.username = null
        }
        if(this.state.user.birthday !== this.state.birthday){
            this.state.user.birthday = this.state.birthday
        }
        else{
            this.state.user.birthday = null
        }
        try{
            const requestBody = JSON.stringify({
                username: this.state.user.username,
                birthday: this.state.user.birthday,
                token: localStorage.getItem('token')
            });
            await api.put('/users/'+this.state.id, requestBody)
        }
        catch(error){
            alert(`Something went wrong during the user update: \n${handleError(error)}`);
        }
    }

    backToOverview(){
        this.props.history.push('/game/dashboard');
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    checkStatus(){
        if(this.state.status){
            return <OnlineIcon
                marginLeft="1px"
                marginBottom="none"
            />
        }
        return <OfflineIcon
            marginLeft="1px"
            marginBottom="none"
        />
    }

    canEdit(){
        if(localStorage.getItem('id') === this.state.id){
            return <Button
                disabled={this.state.editable}
                width="75%"
                onClick={() => {
                    this.setState(prevState => ({editable: !prevState.editable}));
                }}
            >
                Edit
            </Button>
        }
    }

    parseDate(toParse){
        const milliseconds = Date.parse(toParse);
        const date = new Date(milliseconds);
        const day = date.getDate();
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
                    {user: data,
                        username: data.username,
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
                <h2>{(this.state.editable) ? "Editing User" : this.state.username}</h2>
                <div>
                    <UserWrapper
                    borderRadius="3px">
                        <UserIcon
                            marginLeft="1px"
                            marginBottom="none"
                        />
                        <InputField
                            marginBottom="1px"
                            borderBottom={(!this.state.editable) ? "1px solid #424242" : "1px solid white"}
                            disabled={!this.state.editable}
                            placeholder={this.state.username}
                            color={(this.state.editable) ? "white" : "#9e9e9e"}
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                    </UserWrapper>
                    <UserWrapper
                        borderRadius="3px">
                        {this.checkStatus()}
                        <InputField
                            marginBottom="1px"
                            borderBottom={"1px solid #424242"}
                            disabled={true}
                            placeholder={(this.state.status) ? "Online" : "Offline"}
                        />
                    </UserWrapper>
                    <UserWrapper
                        borderRadius="3px">
                        <CreationIcon
                            marginLeft="1px"
                            marginBottom="none"
                        />
                        <InputField
                            marginBottom="1px"
                            borderBottom={"1px solid #424242"}
                            disabled={true}
                            placeholder={this.parseDate(this.state.creationDate)}
                        />
                    </UserWrapper>
                    <UserWrapper
                        borderRadius="3px">
                        <CakeIcon
                        marginLeft="1px"
                        marginBottom="none"
                        />
                        <InputField
                            marginBottom="1px"
                            borderBottom={(!this.state.editable) ? "1px solid #424242" : "1px solid white"}
                            disabled={!this.state.editable}
                            placeholder={(!this.state.birthday) ? "Birthday" : this.parseDate(this.state.birthday)}
                            color={(this.state.editable) ? "white" : "#9e9e9e"}
                            onChange={e => {
                                this.handleInputChange('birthday', e.target.value);
                            }}
                        />
                    </UserWrapper>
                    {this.canEdit()}
                    <Button
                        width="75%"
                        onClick={() => {
                            (localStorage.getItem('id') === this.state.id)
                                ? this.updateUser() : this.backToOverview();
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
