import {config} from "../config/config";
import {Slot} from "./slot";
const argsParser = require("args-parser");

const args = argsParser(process.argv);

const NUMBER_OF_GAMES = +args.numbersOfGames || 1;
const rolling = args.rolling || false;
const games = {wins: 0, loses: 0};

const slot = new Slot(config, +args.bet || 1, rolling);

for (let ind = 0; ind < NUMBER_OF_GAMES; ind++) {
    slot.init();
    const result = slot.start(false);
    if (result.win) games.wins++;
    else games.loses++;
}

process.send(games);


