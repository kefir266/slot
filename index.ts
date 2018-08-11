import { Config } from "./game";
import { TTGama } from "./tt-game";

const config: Config = {
    symbols: [1, 2, 3, 4, 5],
    payouts: [5, 4, 3, 2, 1],
    view: [3, 3, 3, 3, 3],
    reels: [
        [5, 3, 1, 4, 5, 2, 5, 3, 4, 1, 4, 2, 3, 2, 2, 1, 3, 3, 3, 3, 4, 1, 2, 5, 2, 1, 4, 4, 5, 4],
        [2, 1, 2, 2, 1, 1, 1, 3, 1, 1, 5, 1, 1, 5, 5, 1, 2, 3, 2, 4, 5, 2, 3, 1, 4, 5, 4, 4, 5, 5, 4, 2, 2, 5, 2, 1, 1, 2, 5, 1],
        [2, 3, 5, 4, 2, 2, 1, 3, 3, 1, 5, 3, 2, 3, 4, 3, 2, 4, 4, 1, 2, 1, 2, 2, 1, 1, 2, 1, 4, 1, 1, 2, 1, 5, 2],
        [4, 2, 5, 2, 4, 1, 5, 4, 2, 2, 3, 3, 1, 3, 5, 3, 4, 3, 4, 5, 2, 1, 3, 1, 5],
        [5, 2, 3, 2, 1, 4, 1, 3, 5, 1, 2, 2, 4, 4, 1, 3, 1, 3, 3, 1, 4, 1, 5, 2, 5, 5, 1, 5, 2, 4, 1, 4, 5]
    ],
    lines: [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2]
    ]
};

const ttGame = new TTGama(config);

const result = ttGame.play({bet: 2});

console.log('Result: ', result);