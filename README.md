# SoPra FS20 - Peca Games - Just One Client

## Introduction

We developed this game for SoPra FS20 at the University of Zurich. The aim of our project was to implement a fully functional online version of the game Just One. Once registered on the website, a user can log into their profile, where their player statistics and friends are publicly displayed.Users can join public lobbies with their friends. After a game has started, the players take turns guessing words and writing clues. Players get points for correctly guessing a word, giving an unique clue and the time they take to answer. For communication between the players we want to added a chat function. Furthermore there is natural language processing, which automatically checks whether the given clues are valid, players can vote on the NLP’s decision. The game can be played both with bots and with your friends. After 13 cards have been played, the game is over, the players stay in the same lobby and may start a new game. Their score is then added to a public leader board.

## Technologies used

We used the frame work [React](https://reactjs.org/) for our client, with [styled components](https://styled-components.com/). Communication with the backend happens through representational state transfer. We used npm as a packet manager.

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

## Illustration of the main user flow

First a user has to regist in the log in screen:
![loginscreen](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/picturesReadMe/LogInScreen.PNG?raw=true)
Users are then redircted to the application. In the main menu they can create or join a lobby, edit their profile or access the public score board.
![mainmenu](https://github.com/PecadoGames/pecadogames-justone-client/blob/master/picturesReadMe/MainMenu.PNG?raw=true)


## Roadmap
Further ideas we haven't had time to implement
*Voice chat: We were unable to find a free provider, we would most likely have to implement this with a web socket
*Mini game in lobby: A small mini game to pass the time: We thought something like google's dino runner

