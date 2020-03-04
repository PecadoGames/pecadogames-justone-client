import styled from "styled-components";

export const InputField = styled.input`
  &::placeholder {
    color: ${props => props.color || "#9e9e9e"};
    text-align: justify;
  }
  height: 35px;
  padding-left: 15px;
  border: none;
  border-bottom: ${props => props.borderBottom || "1px solid white"};
  border-radius: 0px;
  margin-bottom: ${props => props.marginBottom || "12px"};
  background: none;
  color: white;
  width: ${props => props.width || "75%"};
  `;