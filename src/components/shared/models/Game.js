class Game {
    constructor(data = {}) {
        this.currentWord = null;
        this.cluesAsString = null;
        this.specialGame = null;
        Object.assign(this, data);
    }
}

export default Game;