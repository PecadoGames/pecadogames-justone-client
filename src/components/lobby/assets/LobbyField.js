import React from "react";
import styled from "styled-components";



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
                    <div>
                        <Block>LobbyName: <UserName>{lobby.lobbyName}</UserName></Block>
                        <Block>Players: <Name>{lobby.currentNumPlayersAndBots}/{lobby.maxPlayersAndBots}</Name></Block>
                        <Block>Status: {!lobby.gameIsStarted ? <Id>{lobby.private ? <text>private</text> : <text>public</text>}</Id>
                            : <text>Game already started</text>}</Block>
                    </div>
            </Container>

    );
};

export default LobbyField;