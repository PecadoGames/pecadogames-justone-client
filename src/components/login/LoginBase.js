import React, { Component } from 'react';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import Login from '../login/Login'
import { PixelButton } from "../../views/design/PixelButton";

const Text = styled.div`
      font-size: 30px;
      color: #ffffff
        margin-top: 200px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 800px;
  border-radius: 20px;
  align-items: center;  
  margin-left: calc(50% - 400px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 30px;
  color: #ffffff
  width: 800px;
  align-items: center;
  margin-left: calc(50% - 400px);
  margin-top: 30px

`;

class LoginBase extends Component {

    componentDidMount() {
        this.props.changeMusicToDim()
    }

    render(){
        return(
            <div>
            {!localStorage.getItem("confirmed")? (
                <FormContainer>
                    <Text>
                        The game you are about to play may contain flashing images and quick images.
                        If you are pregnant or have heart problems, please do not play this game.
                        The developers of this game are not responsible of any kind of damage.
                        This game is a fangame of the game called "Just One".
                        This game was only made for fun. If you find any glitch, error or bug,
                        please report it via email, link in the description. And please play it on Google Chrome
                        for all the features ;).
                    </Text>
                    <Container>
                        Confirm to continue
                        <PixelButton
                            height= "120px;"
                            width="400px;"
                            onClick={() => {
                        localStorage.setItem("confirmed", "true");
                        this.forceUpdate();
                        }}> 
                            I'm not pregnant and I have no heart problems...<br></br>  yet
                        </PixelButton>
                    </Container>
                </FormContainer>

        ) : (
                <Login changeMusicToDim={this.props.changeMusicToDim} > </Login>
        )}
            </div>

        );

    }
}
export default withRouter(LoginBase);