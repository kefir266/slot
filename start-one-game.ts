import {Slot} from "./models/slot";
import {config} from "./config/config";

const slot = new Slot(config, 1, true);

const result = slot.start(false);

console.log(result);