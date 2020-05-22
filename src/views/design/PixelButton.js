import styled from "styled-components";

export const PixelButton = styled.button`
    border: ${props => props.border || "2px solid black"};
    margin-top: ${props => props.marginTop || "15px"};
    margin-left: ${props => props.marginLeft || "5px"};
    margin-right: ${props => props.marginRight || "5px"};
    outline: ${props => props.outline || "2px solid #32CD32"};
    outline-offset: -7px;
    width: ${props => props.width || "150px"};
    height: ${props => props.height || "50px"};
    color: ${props => props.color || "#32CD32"};
    background: ${props => props.background || "#000000"};
    cursor: ${props => props.disabled ? "default" : "pointer"};
    font-size: ${props => props.fontSize};
    &:hover {
      outline: ${props => props.hoverOutline || "2px solid #000000"};
      background: ${props => props.hoverBackground || "#32CD32"};
      color: ${props => props.hoverColor || "#000000"};
    }
`;
