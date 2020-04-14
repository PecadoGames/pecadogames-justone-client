import React from "react";
import styled from "styled-components";
import {Button} from "../../../views/design/Button";
import {api} from "../../../helpers/api";
import {withRouter} from "react-router-dom";



const Container = styled.span`
  height: auto;
  margin: 6px;
  width: 270px;
  text-align: left;
  border-radius: 6px;
  transition: all 0.3s ease;
  
 
`;



const UserName = styled.span`
  font-weight: bold;

 
`;

const Name = styled.span`
  font-weight: bold;



  
`;

const Id = styled.span`
  font-weight: bold;

`;

const Block = styled.li`
  font-weight: bold;
  display: flex;
  justify-content: space-between;

 
`;




const LobbyField = ({ lobby }) => {



    return (
            <Container
                width = '100%'>
                {lobby.isPrivate ? <div></div>: <div>
                    <Block>LobbyName: <UserName>{lobby.lobbyName}</UserName></Block>
                    <Block>PlayerAmount: <Name>{lobby.numberOfPlayers}</Name></Block>
                    <Block>Bots: <Id>{!lobby.numberOfBots ? 0: lobby.numberOfBots}</Id></Block>
                </div>
                }
            </Container>

    );
};

export default LobbyField;