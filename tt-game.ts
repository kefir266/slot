import {Game, SpinRequest, Config} from "./game";
import {Slot} from "./slot";
const clui = require('clui');
const Line: any = clui.Line;
const clear = clui.Clear;
const Progress = clui.Progress;
const thisProgressBar: any = new Progress(30);

clear();

export class TTGama extends Game {
    config: Config;

    NUMBER_OF_GAMES = 1000000000;

    constructor(config: Config) {
        super(config);
        this.config = config;
    }

    play(request: SpinRequest) {

        let wins = 0;
        let loses = 0;
        const slot = new Slot(this.config, request.bet);
        const startTime = new Date();
        console.log(`Started ${this.NUMBER_OF_GAMES} games at ${startTime}`);
        for (let ind = 0; ind < this.NUMBER_OF_GAMES; ind++) {
            slot.init();
            const result = slot.start();

            if (result.win) wins++;
            else loses++;
            if (!(ind % 100000)) {
                clear();
                console.log(`Started ${this.NUMBER_OF_GAMES} games at ${startTime}`);
                new Line().padding(2)
                    .column(`Games: ${ind}`, 20)
                    .column(thisProgressBar.update(ind, this.NUMBER_OF_GAMES), 40)
                    .fill()
                    .output();
            }
        }
        console.log(`Games have been finished at ${new Date()}`);
        console.log('wins/loses:', wins/loses);
    }
}