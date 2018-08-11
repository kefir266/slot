import {Game, SpinRequest, SpinResult, Config} from "./game";
import {Engine} from "./engine";

export class TTGama extends Game {
    config: Config;

    constructor(config: Config) {
        super(config);
        this.config = config
    }

    play(request: SpinRequest): Promise<SpinResult> {
        const engine = new Engine(this.config.reels, this.config);
        const result: SpinResult = {
            stopPositions: [],
            view: [],
            rewards: [],
            bet: request.bet,
            win: 0
        };
        return engine.start()
            .then(views => {
                result.stopPositions = views.stopPositions;
                result.view = views.view;
                result.rewards = views.rewards;
                console.log(result);
                return this.play(request);
            });
    }
}