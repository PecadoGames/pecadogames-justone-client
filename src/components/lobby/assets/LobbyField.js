import React from "react";
import styled from "styled-components";

const Container = styled.span`
  height: auto;
  margin: 6px;
  width: 270px;
  text-align: left;
  border-radius: 6px;
`;

const Data = styled.span`
  color: #565553;
`;

const Block = styled.li`
  font-weight: bold;
  color: #565553;
  display: flex;
  justify-content: space-between;
`;

const LobbyField = ({ lobby }) => {
    return (
            <Container
                width = '100%'>
                    <div>
                        <Block>Name: <Data>{lobby.lobbyName}</Data></Block>
                        <Block>Players: <Data>{lobby.currentNumPlayersAndBots}/{lobby.maxPlayersAndBots}</Data></Block>
                        <Block>Status: {!lobby.gameIsStarted ? <Data>{lobby.private ? <text>private</text> : <text>public</text>}</Data>
                            : <text>Game already started</text>}</Block>
                    </div>
            </Container>

    );
};

export default LobbyField;