import styled from "styled-components";

export const InputField = styled.input`
  &::placeholder {
    color: ${props => props.placeholderColor || "#9e9e9e"};
    text-align: justify;
  }
  height:  ${props => props.height || "35px"};
  padding-left: 15px;
  border: ${props => props.border || "none"};
  border-bottom: ${props => props.borderBottom || "1px solid white"};
  border-radius: 0px;
  margin-top: ${props => props.marginTop || "0px"};
  margin-bottom: ${props => props.marginBottom || "12px"};
  margin-left: ${props => props.marginLeft || "12px"};
  background: none;
  color: ${props => props.color || "white"};
  width: ${props => props.width || "75%"};
  value ${props => props.value || null}
  `;