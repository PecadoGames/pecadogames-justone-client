
import React from "react";
import {withRouter} from "react-router-dom";
import Picture from "./GameInfos/Picture";
import GameGetter from "./GameGetter";
import styled from "styled-components";



const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 768px;
  width: 1200px;
  align-items: flex-start; 
  color: white;
  margin: auto;
`;




class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }





  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }



  componentDidMount() {

  }



  render(){
    return(

        <FormContainer>
          <Picture
          >
          </Picture>
          <GameGetter>
          </GameGetter>
        </FormContainer>
    )
  }
}
export default withRouter(Game);