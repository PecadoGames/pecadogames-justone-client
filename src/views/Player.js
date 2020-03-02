import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  background: #424242;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  border: none;
  transition: all 0.15s ease;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    transform: translateY(-2px);
  }
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = ({ user }) => {
  return (
    <Container>
      <Name>{user.name}</Name> <UserName>{user.username}</UserName>
      <Id>ID: {user.id}</Id>
    </Container>
  );
};

export default Player;
