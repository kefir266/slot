import { TTGama } from "./tt-game";
import {config} from "./config";

const ttGame = new TTGama(config);

ttGame.play({bet: 2});
