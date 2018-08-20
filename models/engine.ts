import {Reel, Symbol} from "./reel";
import {Config, SpinRewards} from "./game";

export interface State {
    stopPositions: number[];
    view: number [][];
    rewards: SpinRewards[];
}


export class Engine {
    private reels: Reel [] = [];
    // I don't image how to handle views with different heights,
    // so I admit that number of symbols in the column is constant
    private viewHeight: number;
    private state: State;
    private lines: number[][];
    private observers: Symbol[][] = [];


    constructor(config: Config, rotatedReel = true) {
        //take height in fist element, because suggested that height constantly
        this.viewHeight = config.view[0];
        this.lines = config.lines;

        for (let ind = 0; ind < this.viewHeight; ind++) {
            this.observers[ind] = [];
        }
        config.reels.forEach((reel, indexOfReels) => {
            this.reels.push(new Reel(reel));
            let head = this.reels[indexOfReels].getLinkOfHead();
            for (let ind = 0; ind < this.viewHeight; ind++) {
                this.observers[ind][indexOfReels] = this.reels[indexOfReels].addOserver(head);
                head = head.next;
            }
        });

        this.initView();
        this.setStopPosition();
    }

    private initView() {
        this.state = {stopPositions: [], view: [], rewards: []};
        for (let ind = 0; ind < this.viewHeight; ind++) {
            this.state.view[ind] = [];
        }
    }

    start(dontRotate = false): State {
        if (!dontRotate) {
            this.reels.forEach(reel => {
                const obs = reel.rotate();
            });
        }
        this.setStopPosition();
        this.setView();
        this.determineRewards();

        return this.state;

    }


    private determineRewards(): State {
        this.state.rewards = [];
        for (let ind = 0; ind < this.viewHeight; ind++) {

            //simplify task - suggest it can't be zigzag
            const lineId = this.lines[ind][0];
            const firstSymbol = this.state.view[ind][0];
            if (this.observers[ind].every(symbol => firstSymbol === symbol.symbol)) {
                this.state.rewards.push({ lineId, symbol: firstSymbol, payout: 0 });
            }
        }

        return this.state;
    }

    private setStopPosition() {
        this.state.stopPositions = this.reels.map( symbol => symbol.getStopPositions());
    }

    setPositions(positions: number []) {
        positions.forEach((position, ind) => {
            this.reels[ind].setPosition(position);
        });
    }

    setView() {
        this.state.view = this.observers.map( line => line.map( symbol => symbol.symbol));
    }
}
