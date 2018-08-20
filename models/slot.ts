import {Engine} from "./engine";
import {Config, SpinResult} from "./game";

export class Slot extends Engine {
    result: SpinResult;
    config: Config;
    bet: number;

    constructor(config: Config, bet: number, rolling = false) {
        super(config, rolling);
        this.config = config;
        this.bet = bet;
        this.result = {
            stopPositions: [],
            view: [],
            rewards: [],
            bet: this.bet,
            win: 0
        };
        this.init();
    }

    init(positions: number[] | null = null) {
        this.result.rewards.length = 0;
        this.result.win = 0;
        if (positions) {
            super.setPositions(positions);
        }
    }

    start( dontRotate: boolean, newBet = NaN): SpinResult {
        if (!!newBet)  {
            this.bet = newBet;
        }
        const views = super.start(dontRotate);
        this.result.stopPositions = views.stopPositions;
        this.result.view = views.view;
        this.result.rewards = views.rewards;
        this.result.bet = this.bet;
        this.calculateRewards();
        return this.result;
    }

    private calculateRewards() {
        this.result.rewards.forEach(reward => {
            reward.payout = this.bet * this.config.payouts[reward.symbol - 1];
            this.result.win += reward.payout;
        });
    }
}
