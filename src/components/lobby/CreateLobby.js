import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Sound from 'react-sound';
import {BackgroundContainer} from "../main/Main";

const MenuWrapper = styled.div`
    margin-left: 160px;
    margin-top: 150px;
    width: 400px;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 860px;
  width: 1290px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const Paper = styled.div`
    height: 900px;
    width: 900px;
    margin-left: 0px;
    flex-direction: column;
    align-items: flex-start;  
`;

const Title = styled.div`
    font-size:48px;
    font-weight:bold;
    margin-bottom: 15px;
    margin-left: 0px;
`;

const Line = styled.hr`
  border: 2px solid black;
  width: 80%;
  margin-left: 0px;
  margin-bottom: 10px;
`;

class CreateLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobbies: null}
        ;
    }

    render() {
        return (
            <Background className={"lobbyCreation"}>
                <Paper className={"paperLobby"}>
                    <MenuWrapper>
                        <Title>Create lobby</Title>
                        <Line/>
                    </MenuWrapper>
                </Paper>
            </Background>

        );
    }}

export default withRouter(CreateLobby);