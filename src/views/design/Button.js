import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    transform: ${props => props.hover || "translateY(-2px)"}
  }
  margin-bottom: 20px;
  margin-top: ${props => props.marginTop || null}
  margin-left: ${props => props.marginLeft || null}
  padding: 6px;
  font-size: 24px;
  text-align: ${props => props.text || "center"};
  color: ${props => props.color || "#ffffff"};
 
  width: ${props => props.width || null};
  height: ${props => props.height || "40px"};
  border: none;
  border-radius: ${props => props.borderRadius || "3px"};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.opacity ? 0.4 : 1)};
  background: ${props => (props.background || "#4CAF50")};
  transition: ${props => (props.transition || "all 0.15s ease")};
  box-shadow: ${props => (props.boxShadow 
    || "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" || null)};
  :focus{
  background: ${props => props.background || "#388E3C"};}
`;
