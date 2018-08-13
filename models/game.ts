export interface SpinRequest {
    bet: number;
}

type Symbol = number;

export interface SpinRewards {
    lineId: number;
    symbol: Symbol;
    payout: number;
}

export interface SpinResult {
    stopPositions: number[];
    view: number[][];
    rewards: SpinRewards[];
    bet: number;
    win: number;
}

export interface Config {
    symbols: number[];
    payouts: number[];
    view: number[];
    reels: number[][];
    lines: number[][];
}

export abstract class Game {

    constructor(protected config: Config) {
    }

    abstract play(request: SpinRequest): void;
}