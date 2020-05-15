/**
 * LobbyField model
 */
class Lobby {
    constructor(data = {}) {
        this.lobbyId = null;
        this.lobbyName = null;
        this.numberOfPlayers = null;
        this.numberOfBots = null;
        this.private = null;
        this.voicechat = null;
        this.gameStarted = null;
        this.playersInLobby = null;
        this.currentGuesser= null;
        this.currentNumPlayersAndBots = null;
        this.gameIsStarted = null;
        Object.assign(this, data);
    }
}

export default Lobby;