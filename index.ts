import { TTGama } from "./models/tt-game";
import {config} from "./config/config";
import * as fs from "fs";
const ttGame = new TTGama(config);

fs.writeFile('./output/result.log', ttGame.play({bet: 2}),err => {
    if (err) {
        console.log(err);
    }
});
