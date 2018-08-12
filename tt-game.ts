import {Game, SpinRequest, SpinResult, Config, SpinRewards} from "./game";
import {Slot} from "./slot";

export class TTGama extends Game {
    config: Config;

    NUMBER_OF_GAMES = 1000000000;

    constructor(config: Config) {
        super(config);
        this.config = config
    }

    play(request: SpinRequest) {

        let wins = 0;
        let loses = 0;
        const slot = new Slot(this.config, request.bet);

        console.log(`Started ${this.NUMBER_OF_GAMES} games at ${new Date()}`);
        for (let ind = 0; ind < this.NUMBER_OF_GAMES; ind++) {
            slot.init();
            let result = slot.start();

            if (result.win) wins++;
            else loses++;
        }
        console.log(`Games have been finished at ${new Date()}`);
        console.log('wins/loses:', wins/loses);
    }
}