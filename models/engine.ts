import {Reel, ColumnView, Symbol} from "./reel";
import {Config, SpinRewards} from "./game";
import {ReelArray} from "./reelArrary";

export interface State {
    stopPositions: number[];
    view: number [][];
    rewards: SpinRewards[];
}

export interface Linkedline {
    symbol?: Symbol;
    next?: Linkedline;
}

export class Engine {
    reels: Array<Reel | ReelArray> = [];
    // I don't image how to handle views with different heights,
    // so I admit that number of symbols in the column is constant
    viewHeight: number;
    state: State;
    lines: number[][];
    linkedLineHead: Linkedline[] = [];
    linkedLineCurrent: Linkedline[] = [];


    constructor(config: Config, rotatedReel = true) {
        //take height in fist element, because suggested that height constantly
        this.viewHeight = config.view[0];
        this.lines = config.lines;
        const reelModel = rotatedReel ? Reel : ReelArray;

        for (let ind = 0; ind < this.viewHeight; ind++) {
            this.linkedLineHead[ind] = {};
            this.linkedLineCurrent[ind] = this.linkedLineHead[ind];
        }

        config.reels.forEach((reel, index) => {
            this.reels.push(new reelModel(reel, config.view[index]));
            this.setLinks(this.reels[index], index);
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
                return reel.rotate();
            });
        }
        this.setStopPosition();
        this.determineRewards();
        return this.state;

    }

    private setLinks(reel: Reel | ReelArray, numberOfReel: number) {
        this.linkedLineCurrent.forEach( (line, ind) => {
            line.symbol = reel.getLink(this.lines[ind][numberOfReel]);
            line.next = { };
            this.linkedLineCurrent[ind] = line.next;
        });
    }

    private determineRewards(): State {
        this.state.rewards = this.linkedLineHead.map((line, lineId) => {
            const firstSymbol = line.next.symbol.symbol;
            let current = line.next;
            let every = true;
            do {
                every = every && (firstSymbol === current.symbol.symbol);
                current = current.next;
            } while (current.next && every);
            if (every) {
                return {lineId, symbol: firstSymbol, payout: 0};
            }
        })
            .filter(reward => reward);
        return this.state;
    }

    private setStopPosition() {
        this.linkedLineCurrent[0] = this.linkedLineHead[0];
        for (let ind = 0; ind < this.reels.length; ind++) {
            this.state.stopPositions[ind] = this.linkedLineCurrent[0].symbol.position;
            this.linkedLineCurrent[0] = this.linkedLineCurrent[0].next;
        }
    }

    setPositions(positions: number []) {
        positions.forEach((position, ind) => {
            this.reels[ind].setPosition(position);
        });
    }
}
