import {Reel, ColumnView} from "./reel";
import {Config, SpinRewards} from "./game";
import {ReelArray} from "./reelArrary";

export interface State {
    stopPositions: number[];
    view: number [][];
    rewards: SpinRewards[];
}

export class Engine {
    reels: Array<Reel | ReelArray> = [];
    // I don't image how to handle views with different heights,
    // so I admit that number of symbols in the column is constant
    viewHeight: number;
    state: State;
    lines: number[][];

    constructor(config: Config, rotatedReel = true) {
        //take height in fist element, because suggested that height constantly
        this.viewHeight = config.view[0];
        this.lines = config.lines;
        const reelModel = rotatedReel ? Reel: ReelArray;
        config.reels.forEach((reel, index) => {
            this.reels.push(new reelModel(reel, config.view[index]));
        });

        this.initView();
    }

    private initView() {
        this.state = {stopPositions: [], view: [], rewards: []};
        for (let ind = 0; ind < this.viewHeight; ind++) {
            this.state.view[ind] = [];
        }
    }

    start(dontRotate = false): State {

        this.mergeVIew(this.reels.map(reel => {
            if (dontRotate) {
                return reel.getViewColumn();
            } else {
                return reel.rotate();
            }
        }));
        this.determineRewards();
        return this.state;

    }

    private mergeVIew(columns: ColumnView[]) {
        for (let col = 0; col < columns.length; col++) {
            this.state.stopPositions[col] = columns[col].stopPosition;
            for (let line = 0; line < this.viewHeight; line++) {
                this.state.view[line][col] = columns[col].view[line];
            }
        }
    }

    private determineRewards(): State {

        this.state.rewards = this.lines.map((line, lineId) => {
            const spinReward: SpinRewards = {lineId: lineId, symbol: this.state.view[line[0]][0], payout: 0};
            const lineReward = line.map((lineId, ind) => {
                return this.state.view[lineId][ind];
            });
            if (lineReward.every(spin => {
                return spinReward.symbol === spin;
            })) {
                return spinReward;
            }
        })
            .filter(reward => reward);
        return this.state;
    }

    setPositions(positions: number []) {
        positions.forEach((position, ind) => {
            this.reels[ind].setPosition(position);
        });
    }
}
