import React, { Component } from 'react';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import Sound from 'react-sound';

import clubMusic from '../login/assets/CheckieBrown.mp3'
import nightNoise from '../login/assets/ftus_city_ambience_night_rooftop_city_hum_distant_traffic_insects_sirens_doha_qatar_687.mp3'
import Login from '../login/Login'
import { Button } from '../../views/design/Button';




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
  align-items: flex-start;  
  padding-left: 20px;
  margin-left: calc(50% - 400px);

`;



class LoginBase extends Component {


    render(){
        return(
            <div>
            {!localStorage.getItem("confirmed")? (
                <FormContainer>
                <Text>The game you are about to play may contain flashing images and quick images.
                    If you are pregnant or have heart problems, please do not play this game.
                    The developers of this game are not responsible of any kind of damage.
                    This game is a fangame of the game called "Just One".
                    This game was only made for fun. If you find any glitch, error or bug,
                    please report it via email, link in the description.
                    <br></br>
                    <br></br>
                    <Button onClick={() => {
                     localStorage.setItem("confirmed", "true");
                     this.forceUpdate();
                }}> I'm not pregnant and I have no heart problems...  yet
                </Button>
                </Text>
                    </FormContainer>
        ) : (
            <div>
            <Login></Login>
                <Sound url={clubMusic}
                           playStatus={Sound.status.PLAYING}
                           playFromPosition={10}
                           volume={60}
                           loop={true}

            />
                <Sound url={nightNoise}
                       playStatus={Sound.status.PLAYING}
                       playFromPosition={0}
                       volume={15}
                       loop={true}
                />
            </div>
        )}
            </div>

        );

    }
}
export default withRouter(LoginBase);