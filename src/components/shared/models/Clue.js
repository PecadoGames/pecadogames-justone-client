class Clue {
    constructor(data = {}) {
        this.actualClue = null;
        this.playerId = null;
        Object.assign(this, data);
    }
}

export default Clue;