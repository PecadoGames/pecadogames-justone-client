
# SoPra FS20 - Peca Games - Just One Client

## Introduction

We developed this game for SoPra FS20 at the University of Zurich. The aim of our project was to implement a fully functional online version of the game Just One. Once registered on the website, a user can log into their profile, where their player statistics and friends are publicly displayed.Users can join public lobbies with their friends. After a game has started, the players take turns guessing words and writing clues. Players get points for correctly guessing a word, giving an unique clue and the time they take to answer. For communication between the players we want to added a chat function. Furthermore there is natural language processing, which automatically checks whether the given clues are valid, players can vote on the NLP’s decision. The game can be played both with bots and with your friends. After 13 cards have been played, the game is over, the players stay in the same lobby and may start a new game. Their score is then added to a public leader board.

## Technologies used

We used the frame work [React](https://reactjs.org/) for our client, with [styled components](https://styled-components.com/). Communication with the backend happens through representational state transfer. We used npm as a packet manager.

## High level components

 - [Game getter](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/src/components/game/GameGetter.js): This file retrieves information about the game and redirects all necessary information to subcomponents (e.g Timer, Score, GameInfo). This assures synchronization between clients through logging. The game flow is handled through a state pattern, this way the client only renders the appropriate elements for each player.
 - [App Router](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/src/components/shared/routers/AppRouter.js): This file handles app related routing, assuring only authorized users can access this application. Furthermore music is handled through this file, as it is the highest level component.
 - [Lobby](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/src/components/lobby/Lobby.js): This is the main lobby component. Multiple subcomponents allow for low coupling inside the lobby. In this file handles the setup of the game. Friends can be invited and bots can be added to a lobby. A sole lobby leader can changed parameters of the lobby. A chatbox in the lobby allows players to communicate with each other.
 - [Profile](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/src/components/profile/Profile.js): This component allows users to send and receive friend requests. Users can also edit their user credentials and look at other players' profiles.
## Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

We deploy this app on heroku: [PecadoGames/pecadogames-justone-client](https://github.com/PecadoGames/pecadogames-justone-client "View on GitHub")[master](https://github.com/PecadoGames/pecadogames-justone-client/tree/master "Auto deploys master")

## Illustration of the main user flow

First a user has to register in the log in screen:
![loginscreen](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/picturesReadMe/LogInScreen.PNG?raw=true)
Users are then redircted to the application. In the main menu they can create or join a lobby, edit their profile or access a public score board.
![mainmenu](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/picturesReadMe/MainMenu.PNG?raw=true)

Once a lobby is created a user can invite friends, add bots or start a game. 


## Roadmap
Further ideas we haven't had time to implement

 - Voice chat: We were unable to find a free provider, we would most likely have to implement this with a web socket
 - Mini game in lobby: A small mini game to pass the time: We thought something like google's dino runner

## Authors and aknockledgement
### Front end developers
Alain Küng, BSc Computer Science, University of Zurich
Raffael Mogicato, BSc Computer Science, University of Zurich
Raphael Imfeld, BSc Computer Science, University of Zurich

### Supervision & Guidance
Alina Marti, MSc Computer Science, University of Zurich

### Music
Usage of music under Creative Commons:
 - [Last Energy For The Day by Loyalty Freak Music](https://freemusicarchive.org/music/Loyalty_Freak_Music/ROLLER_DISCO_DANCE_DANCE/Loyalty_Freak_Music_-_ROLLER_DISCO_DANCE_DANCE_-_08_Last_Energy_For_The_Day)
 - [Sweet N Juicy-Irresistable-LIVE by Sweet N Juicy](https://freemusicarchive.org/music/Sweet_N_Juicy/Live_at_KBOO_for_Lighthouse_Lessons_3212018/Sweet_N_Juicy-Irresistable-Mar_2018-LIVE
)
 - [Seniorita (K ID 28) by KieLoBot](https://freemusicarchive.org/music/KieLoBot/Hounds_of_Darkmoor/Seniorita)
 - [Susie the Cat - Boss (CB 25) by Checkie Brown](https://freemusicarchive.org/music/Checkie_Brown_1005/hey/Susie_the_Cat_-_Boss_CB_25)
 - [Two Pianos by Tagirijus](https://freemusicarchive.org/music/Tagirijus/Easy_2018/manuel_senfft_-_two_pianos)
 - [Monarch of the street by Loyalty Freak Music](https://freemusicarchive.org/music/Loyalty_Freak_Music/TO_CHILL_AND_STAY_AWAKE/Loyalty_Freak_Music_-_TO_CHILL_AND_STAY_AWAKE_-_07_Monarch_of_the_street)
 - [Traveling in your mind by Loyalty Freak Music](
https://freemusicarchive.org/music/Loyalty_Freak_Music/TO_CHILL_AND_STAY_AWAKE/Loyalty_Freak_Music_-_TO_CHILL_AND_STAY_AWAKE_-_05_Traveling_in_your_mind)

https://creativecommons.org/licenses/by-nc-nd/4.0/

Sound effects: https://www.zapsplat.com/license-type/standard-license/

## MIT Licence
Copyright (c) [2020] [Alain Küng, Raffael Mogicato, Raphael Imfeld]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
