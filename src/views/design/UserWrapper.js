import styled from "styled-components";

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.background || "#424242"};
  border: none;
  margin-left: -4px;
  margin-bottom: 20px;
  box-shadow: none;
  border-radius: ${props => props.borderRadius || "0px"};
  padding-left: 5px;
  width: ${props => props.width || "100%"};
`;