import {expect} from "chai";
import {config} from "./config";
import {Slot} from "./slot";
import {SpinResult} from "./game";

const bet = 2;
let slot: Slot;
let result: SpinResult;
const NUMBER_OF_GAMES = 1000;
const EXPECTED_TIME = 100;

describe('=================Test Slot=====================', () => {
   it('should create Slot', () => {
       slot = new Slot(config, 2);
       expect(typeof slot).equal('object');
   });

   it('should start game', () => {
       result = slot.start();
       expect(result).include.all.keys('win','stopPositions', 'view', 'rewards', 'bet');
   });

   it('should be valid result', () => {
       expect(result.bet).equal(bet);
       expect(result.stopPositions.length).equal(config.view.length);
       result.view.forEach((line, ind) => {
           expect(line.length).equal(config.lines[ind].length)
       })
   });

    it(`${NUMBER_OF_GAMES} games should take less then ${EXPECTED_TIME} millisecond`, () => {
        const startTime = new Date();
        for(let ind = 0; ind < NUMBER_OF_GAMES; ind++) {
            slot.start();
        }
        const endTime = new Date();
        expect(endTime.getMilliseconds() - startTime.getMilliseconds()).lessThan(EXPECTED_TIME);
    });
});