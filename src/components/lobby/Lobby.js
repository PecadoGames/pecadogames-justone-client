import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 800px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;


class Lobby extends React.Component{
    constructor() {
        super();
        this.state = {};
    }

    render(){
        return(
            <FormContainer> This works</FormContainer>
        )
    }
}
export default withRouter(Lobby);