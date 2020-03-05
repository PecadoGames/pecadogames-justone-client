import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  margin-bottom: 20px;
  margin-top: ${props => props.marginTop || null}
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  width: ${props => props.width || null};
  height: ${props => props.height || "35px"};
  border: none;
  border-radius: ${props => props.borderRadius || "3px"};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: ${props => (props.background || "#4CAF50")};
  transition: all 0.15s ease;
  box-shadow: ${props => (props.boxShadow 
    || "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" || null)};
  :focus{
  background: ${props => props.background || "#388E3C"};}
`;
