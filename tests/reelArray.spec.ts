import {expect} from "chai";
import {ColumnView, Reel} from "../models/reel";
import {ReelArray} from "../models/reelArrary";
let reelArray: ReelArray;
let view: ColumnView;
const height = 3;
const reelData = [5, 3, 1, 4, 5, 2, 5, 3, 4, 1, 4, 2, 3, 2, 2, 1, 3, 3, 3, 3, 4, 1, 2, 5, 2, 1, 4, 4, 5, 4];

describe('=================Test ReelArray=====================', () => {

    it('should create Reel', () => {
        reelArray = new ReelArray(reelData, height);
    });

    it('should get column with height 3', () => {
        view = reelArray.getViewColumn();
        expect(view.view.length).equal(height);
    });

    it('stop position should be 0', () => {
        expect(view.stopPosition).equal(0);
    });

    it('column should be contained the same symbols', () => {
        for (let ind = 0; ind < height; ind++) {
            expect(view.view[ind]).equal(reelData[ind]);
        }
    });

    it('should rotate reel', () => {
        for (let ind = 0; ind < 1000; ind++) {
            reelArray.rotate();
            view = reelArray.getViewColumn();
            expect(view.stopPosition).within(0, reelData.length);
        }
    });
});
