import {Engine, State} from "./engine";
import {Config, SpinResult, SpinRewards} from "./game";

export class Slot extends Engine {
    result: SpinResult;
    config: Config;
    bet: number;

    constructor(config: Config, bet: number) {
        super(config);
        this.config = config;
        this.bet = bet;
        this.init();

    }

    init() {
        this.result = {
            stopPositions: [],
            view: [],
            rewards: [],
            bet: this.bet,
            win: 0
        }
    }

    start(): SpinResult {
        let views = super.start();

        this.result.stopPositions = views.stopPositions;
        this.result.view = views.view;
        this.result.rewards = views.rewards;
        this.calculateRewards();
        return this.result;
    }

    private calculateRewards() {
        this.result.rewards.forEach(reward => {
            reward.payout = this.bet * this.config.payouts[reward.symbol - 1];
            this.result.win += reward.payout;
        })
    }
}