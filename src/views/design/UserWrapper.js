import styled from "styled-components";

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => props.marginLeft || "-30px"};
  margin-bottom: ${props => props.marginBottom || "20px"};
  margin-top: ${props => props.marginTop};
  box-shadow: none;
  border-radius: ${props => props.borderRadius || "0px"};
  padding-left: 5px;
  height: ${props => props.height};
  width: ${props => props.width || "100%"};
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
`;