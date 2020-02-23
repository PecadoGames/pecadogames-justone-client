import styled from "styled-components";

export const InputField = styled.input`
  &::placeholder {
    color: #424242;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  :focus{
  background: #303030};
  `;