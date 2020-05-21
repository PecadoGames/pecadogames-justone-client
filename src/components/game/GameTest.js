
import React from "react";
import {withRouter} from "react-router-dom";
import Picture from "./GameInfos/Picture";
import GameGetter from "./GameGetter";
import styled from "styled-components";
import GameTestGetter from "./GameTestGetter";



const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 800px;
  width: 1200px;
  align-items: flex-start; 
  color: white;
  margin: auto;
`;




class GameTest extends React.Component{
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
                <GameTestGetter>
                </GameTestGetter>
            </FormContainer>
        )
    }
}
export default withRouter(GameTest);