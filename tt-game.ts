import {Game, SpinRequest, SpinResult, Config, SpinRewards} from "./game";
import {Slot} from "./slot";

export class TTGama extends Game {
    config: Config;

    constructor(config: Config) {
        super(config);
        this.config = config
    }

    play(request: SpinRequest): Promise<SpinResult| any> {

        const slots: Slot[] = [];

        for (let ind = 0; ind < 100000; ind++) {
            if (!(ind % 1000)) console.log(`Game ${ind} created`);
            slots.push(new Slot(this.config, 2));
        }
        console.log('Games created');

        const games = slots.map( slot => slot.start() );

            return Promise.all(games);
        }


    }