import {Observer, Reel, Symbol} from "./reel";
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
    private observers: Observer[][] = [];


    constructor(config: Config, rotatedReel = true) {
        //take height in fist element, because suggested that height constantly
        this.viewHeight = config.view[0];
        this.lines = config.lines;

        for (let ind = 0; ind < this.viewHeight; ind++) {
            this.observers[ind] = [];
        }
        config.reels.forEach((reel, indexOfReels) => {
            this.reels.push(new Reel(reel));
            this.initObservers(indexOfReels);
        });

        this.initView();
        this.setStopPosition();
    }

    private initObservers(indexOfReels: number) {
        let head = this.reels[indexOfReels].getLinkOfHead();
        for (let ind = 0; ind < this.viewHeight; ind++) {
            this.observers[ind][indexOfReels] = this.observable(head);
            this.reels[indexOfReels].addOserver(this.observers[ind][indexOfReels]);
            head = head.next;
        }
    }
    private initView() {
        this.state = {stopPositions: [], view: [], rewards: []};
    }

    start(dontRotate = false): State {
        if (!dontRotate) {
            this.reels.forEach(reel => {
                reel.rotate();
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
            const firstSymbol = this.observers[ind][0].get();
            if (this.observers[ind].every(symbol => firstSymbol === symbol.get())) {
                this.state.rewards.push({lineId, symbol: firstSymbol, payout: 0});
            }
        }

        return this.state;
    }

    private setStopPosition() {
        this.state.stopPositions = this.reels.map(symbol => symbol.getStopPositions());
    }

    setPositions(positions: number []) {
        positions.forEach((position, ind) => {
            this.reels[ind].setPosition(position);
        });
    }

    setView() {
        this.state.view = this.observers.map(line => line.map(observer => observer.get()));
    }

    observable(initSymbol: Symbol): Observer {
        let symbol = initSymbol;
        return {
            rotate: (pos: number) => {
                for (let ind = 0; ind < pos; ind++) {
                    symbol = symbol.next;
                }
            },
            get: () => symbol.symbol,
            init: () => symbol = initSymbol
        };
    }
}
