import styled from "styled-components";

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  border: none;
  margin-left: ${props => props.marginleft || "-30px"};
  margin-bottom: 20px;
  margin-top: ${props => props.marginTop || null};
  box-shadow: none;
  border-radius: ${props => props.borderRadius || "0px"};
  padding-left: 5px;
  width: ${props => props.width || "100%"};
`;