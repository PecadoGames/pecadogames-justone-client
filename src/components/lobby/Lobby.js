import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 1200px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;


class Lobby extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null
        };
    }

    //needs to be adjusted since you have to logout of the lobby
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

    componentDidMount() {
        //getLobby
    }

    render(){
        return(
            <FormContainer className = 'lobbyBackground'>
                <LogoutButton
                onClick={()=>this.logout()}>Logout</LogoutButton>
            </FormContainer>
        )
    }
}
export default withRouter(Lobby);