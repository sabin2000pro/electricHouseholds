class Bot {

    constructor(name, botCredits, type, numberOfBots) {
        this.name = name;
        this.botCredits = botCredits;
        this.type = type;
        this.numberOfBots = numberOfBots;
    }

    getBotname() {
        return this.name;
    }

    getBotCredits() {
        return this.botCredits;
    }

    getBotType() {
        return this.type;
    }

    getNumberOfBots() {
        return this.numberOfBots;
    }
}

module.exports = Bot;