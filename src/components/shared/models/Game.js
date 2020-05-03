class Game {
    constructor(data = {}) {
        this.currentWord = null;
        this.cluesAsString = null;
        this.specialGame = null;
        this.guessCorrect = null;
        this.overallScore = null;
        this.roundsPlayed = null;
        Object.assign(this, data);
    }
}

export default Game;