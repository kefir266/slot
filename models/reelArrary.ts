
interface Symbol {
    symbol: number;
    next?: Symbol;
    position: number;
  }

export interface ColumnView {
    stopPosition: number;
    view: Symbol[];
}

export class ReelArray {
    private current = 0;
    private length: number;
    private heightView: number;
    private columnView:ColumnView = { stopPosition: 0, view: [] };
    private reel: Symbol[];

    constructor(reel: number[], heightView: number) {
        this.heightView = heightView;
        this.reel = reel.map((symbol, position) => Object({symbol, position}));
        this.length = this.reel.length;
        // add tail for last symbols in reel
        this.reel = this.reel.concat(this.reel, this.reel.slice(0, this.heightView));
        this.setColumnView();
    }

    rotate(position: number | null = null): ColumnView {
        this.current = position !== null ? position : this.accelerate();
        this.setColumnView();
        return this.getViewColumn();
    }

    private accelerate(): number {
        return Math.random() * this.length;
    }

    private setColumnView() {
        this.columnView.view = this.reel.slice(this.current, this.current + this.heightView);
        this.columnView.stopPosition = this.current;
    }

    getViewColumn():ColumnView {

        return this.columnView;
    }

    setPosition(position: number) {
        this.current = position;
    }

    getLink(ind: number) {
        return this.columnView.view[ind];
    }
}
