import React from "react";
import styled from "styled-components";



const Container = styled.button`
  height: auto;
  margin: 6px;
  width: 300px;
  text-align: left;
  border-radius: 6px;
  border: 3px solid #ffffff26;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  border: 3px solid #000000;
  background: linear-gradient(rgb(252, 223, 3), rgb(252, 173, 3));
  transition: all 0.3s ease;
  
 
`;



const UserName = styled.span`
  font-weight: bold;
   font-family: 'Open Sans'
 
`;

const Name = styled.span`
  font-weight: bold;
   font-family: 'Open Sans'


  
`;

const Id = styled.span`
  font-weight: bold;
   font-family: 'Open Sans'
`;

const Block = styled.li`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
   font-family: 'Open Sans'
 
`;


const Lobby = ({ lobby }) => {
    return (
            <Container
                width = '100%'>
                <Block>LobbyID: <UserName>{lobby.username}</UserName></Block>
                <Block>Name: <Name>{lobby.name}</Name></Block>
                <Block>ID: <Id>{lobby.id}</Id></Block>
            </Container>

    );
};

export default Lobby;