import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import Sound from "react-sound";
import nightNoise from "./Music/NightNoise.mp3";
import Songs from "./Music/AllSongs.mp3"
import DimmedSongs from "./Music/AllSongsDimmedPlusNightNoise.mp3"

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
    }
  }


  changeMusicToNormal=()=>{
    this.setState({ musicUrl: Songs });
  }

  changeMusicToDim=()=>{
      this.setState({musicUrl: DimmedSongs})
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
      if((this.state.position !== nextState.position)){
          return false;}
      return true;
  }

    render() {
    return (
      <div>
        <AppRouter changeMusicToNormal={this.changeMusicToNormal} changeMusicToDim={this.changeMusicToDim}/>
        <Sound url={this.state.musicUrl}
               playStatus={Sound.status.PLAYING}
               volume={24}
               loop={true}
               position={this.state.position}
               onPlaying={({position}) => this.setState({position})}
        />
      </div>
    );
  }
}

export default App;
