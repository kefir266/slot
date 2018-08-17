import {config} from "../config/config";
import {Slot} from "./slot";
const argsParser = require("args-parser");

const args = argsParser(process.argv);

const NUMBER_OF_GAMES = +args.numbersOfGames;
const games = {wins: 0, loses: 0};

const slot = new Slot(config, +args.bet);

for (let ind = 0; ind < NUMBER_OF_GAMES; ind++) {
    slot.init();
    const result = slot.start(false);
    if (result.win) games.wins++;
    else games.loses++;
}

process.send(games);

//         console.log('wins/loses:', wins/loses);
//         return `Started ${this.NUMBER_OF_GAMES} games at ${startTime}
// Games have been finished at ${new Date()}
// wins/loses: ${wins/loses}`;

