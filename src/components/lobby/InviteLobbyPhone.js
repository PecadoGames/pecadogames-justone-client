import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {api, handleError} from "../../helpers/api";

const Container = styled.div`
    position: absolute;
    left: 0px;
    top: 700px;
    width: 100px;
    height: 100px;
    border: 2px solid red;
`;

const AcceptButton = styled.button`
    border: 2px solid black;
    height: 30%;
    width: 80%;
    font-size: 10px;
`;

const DeclineButton = styled(AcceptButton)`
    
`;

class InviteLobbyPhone extends React.Component {
    constructor() {
        super();
        this.state = {


        }
        ;
    }

    render(){
    return (
        <Container>
            <AcceptButton>accept</AcceptButton>
            <DeclineButton>decline</DeclineButton>
        </Container>
    );
}
}

export default InviteLobbyPhone;