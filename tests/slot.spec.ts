import {expect} from "chai";
import {config} from "../config/config";
import {Slot} from "../models/slot";
import {SpinResult} from "../models/game";

const bet = 2;
let slot: Slot;
let result: SpinResult;
const NUMBER_OF_GAMES = 1000;
const EXPECTED_TIME = 100;
const positions = [
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5],
    [1, 2, 3, 4, 5],
    [2, 1, 6, 5, 4]
];

describe('=================Test Slot=====================', () => {
    it('should create Slot', () => {
        slot = new Slot(config, 2);
        expect(typeof slot).equal('object');
    });

    it('should start game', () => {
        result = slot.start(false);
        expect(result).include.all.keys('win', 'stopPositions', 'view', 'rewards', 'bet');
    });

    it('should be valid result', () => {
        expect(result.bet).equal(bet);
        expect(result.stopPositions.length).equal(config.view.length);
        result.view.forEach((line, ind) => {
            expect(line.length).equal(config.lines[ind].length);
        });
    });

    it(`${NUMBER_OF_GAMES} games should take less then ${EXPECTED_TIME} millisecond`, () => {
        const startTime = new Date();
        for (let ind = 0; ind < NUMBER_OF_GAMES; ind++) {
            slot.start(false);
        }
        const endTime = new Date();
        expect(endTime.getMilliseconds() - startTime.getMilliseconds()).lessThan(EXPECTED_TIME);
    });

    it('should have correct wins/loses', () => {
        let wins = 0;
        let loses = 0;
        positions.forEach(position => {
            slot.init(position);
            const result = slot.start(true);
            if (result.win) wins++;
            else loses++;
        });
        expect(wins / loses).within(0.01, 0.2);
    });
});
