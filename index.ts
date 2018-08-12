import { TTGama } from "./tt-game";
import {config} from "./config";


const ttGame = new TTGama(config);

const result = ttGame.play({bet: 2});
