import {expect} from "chai";
import {Engine, State} from "../models/engine";
import {config} from "../config/config";

let engine: Engine;

let result: State;

describe('=================Test Engine===================', () => {

    it('should create Engine', () => {
        engine = new Engine(config);
    });

    it('should start Engine', () => {
        result = engine.start();
        expect(result).include.all.keys('stopPositions', 'view', 'rewards');
    });

    it('Stop positions should be valid for all reels', () => {
        result.stopPositions.forEach( (pos, ind) => {
           expect(pos).within(0, config.reels[ind].length);
        });
    });

    it('should have valid view', () => {
        expect(result.view.length).equal(config.view[0]);
        result.view.forEach((line, ind) => {
            expect(line.length).equal(config.lines[ind].length);
        });
    });

});
