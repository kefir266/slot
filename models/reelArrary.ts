
interface Symbol {
    symbol: number;
    next?: Symbol;
    position: number;
  }

export interface ColumnView {
    stopPosition: number;
    view: number[];
}

export class ReelArray {
    private current = 0;
    private length: number;
    private heightView: number;
    private columnView:ColumnView = { stopPosition: 0, view: [] };
    private reel: number[];

    constructor(reel: number[], heightView: number) {
        this.heightView = heightView;
        this.reel = reel;
        this.length = this.reel.length;
        // add tail for last symbols in reel
        this.reel = this.reel.concat(this.reel, reel.slice(0, this.heightView));
    }

    rotate(position: number | null = null): ColumnView {
        this.current = position !== null ? position : this.accelerate();
        return this.getViewColumn();
    }

    private accelerate(): number {
        return Math.random() * this.length;
    }

    getViewColumn():ColumnView {

        this.columnView.view = this.reel.slice(this.current, this.current + this.heightView);
        this.columnView.stopPosition = this.current;
        return this.columnView;
    }

    setPosition(position: number) {
        this.current = position;
    }
}
