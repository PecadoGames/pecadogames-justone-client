import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import Sound from "react-sound";
import clubMusic from "./components/login/assets/CheckieBrown.mp3";
import nightNoise
  from "./components/login/assets/ftus_city_ambience_night_rooftop_city_hum_distant_traffic_insects_sirens_doha_qatar_687.mp3";
import clubMusicNormal from "./components/login/assets/Checkie Brown Normal.mp3";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      musicUrl: clubMusic,
      position: 0,
      nightNoise: Sound.status.PLAYING
    }
  }

  startNoise=()=>{
      this.setState({nightNoise: Sound.status.PLAYING})
  }

  stopNoise=()=>{
      this.setState({nightNoise: Sound.status.STOPPED})
  }

  changeMusicToNormal=()=>{
    this.setState({ musicUrl: clubMusicNormal });
  }

  changeMusicToDim=()=>{
      this.setState({musicUrl: clubMusic})
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
      if(this.state.position !== nextState.position){
          return false;}
      return true;
  }

    render() {
    return (
      <div>
        <AppRouter changeMusicToNormal={this.changeMusicToNormal} changeMusicToDim={this.changeMusicToDim} stopNoise={this.stopNoise} startNoise={this.startNoise}/>
        <Sound url={this.state.musicUrl}
               playStatus={Sound.status.PLAYING}
               volume={40}
               loop={true}
               position={this.state.position}
               onPlaying={({position}) => this.setState({position})}

        />
        <Sound url={nightNoise}
               playStatus={this.state.nightNoise}
               playFromPosition={this.state.position}
               volume={15}
               loop={true}
        />
      </div>
    );
  }
}

export default App;
