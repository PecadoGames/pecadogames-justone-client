import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import Sound from "react-sound";
import nightNoise from "./Music/ftus_city_ambience_night_rooftop_city_hum_distant_traffic_insects_sirens_doha_qatar_687.mp3";
import Songs from "./Music/AllSongs.mp3"
import DimmedSongs from "./Music/AllSongsDimmed.mp3"

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  constructor() {
      const min=0;
      const max=1800000;
      const random = Math.floor(Math.random() * (+max - +min)) + +min;
      super();
      this.state = {
          musicUrl: Songs,
          position: random,
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
    this.setState({ musicUrl: Songs });
  }

  changeMusicToDim=()=>{
      this.setState({musicUrl: DimmedSongs})
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
               volume={24}
               loop={true}
               position={this.state.position}
               onPlaying={({position}) => this.setState({position})}

        />
        <Sound url={nightNoise}
               playStatus={this.state.nightNoise}
               playFromPosition={this.state.position}
               volume={10}
               loop={true}
        />
      </div>
    );
  }
}

export default App;
