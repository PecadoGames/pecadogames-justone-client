class Game {
    constructor(data = {}) {
        this.currentWord = null;
        this.enteredClues = null;
        this.specialGame = null;
        Object.assign(this, data);
    }
}

export default Game;