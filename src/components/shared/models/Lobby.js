/**
 * LobbyField model
 */
class Lobby {
    constructor(data = {}) {
        this.lobbyId = null;
        this.lobbyName = null;
        this.numberOfPlayers = null;
        this.numberOfBots = null;
        this.isPrivate = null;
        this.voicechat = null;
        this.playersInLobby = null;
        this.currentGuesser= null;
        Object.assign(this, data);
    }
}

export default Lobby;