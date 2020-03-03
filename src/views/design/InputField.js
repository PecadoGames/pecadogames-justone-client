import styled from "styled-components";

export const InputField = styled.input`
  &::placeholder {
    color: #9e9e9e;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-bottom: ${props => props.borderBottom || "1px solid white"};
  border-radius: 0px;
  margin-bottom: 12px;
  background: none;
  color: white;
  width: 85%
  `;