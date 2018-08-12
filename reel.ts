
interface Symbol {
    symbol: number;
    next?: Symbol;
    position: number;
  }

export interface ColumnView {
    stopPosition: number;
    view: number[];
}

export class Reel {
    private current: Symbol;
    private head: Symbol;
    private length: number;
    private heightView: number;
    private columnView:ColumnView = { stopPosition: 0, view: [] };
    private currentView = this.current;

    constructor(reel: number[], heightView: number) {
        this.heightView = heightView;
        reel.forEach((symbol, index) => {
            if (this.current) {
                this.current.next = {symbol, position: index};
                this.current = this.current.next;
            } else {
                this.head = {symbol, position: index};
                this.current = this.head;
            }
        });
        this.current.next = this.head;
        this.length = this.current.position + 1;
        //rotate to 0 position
        this.current = this.current.next;
    }

    rotate(): ColumnView {
        for(let pos = 0; pos < this.accelerate(); pos++) {
            this.current = this.current.next;
        }

        return this.getViewColumn();
    }

    private accelerate(): number {
        return Math.random() * this.length;
    }

    getViewColumn():ColumnView {

        this.currentView = this.current;
        for (let ind = 0; ind < this.heightView; ind++) {
            this.columnView.view[ind] = this.currentView.symbol;
            this.currentView = this.currentView.next;
        }
        this.columnView.stopPosition = this.current.position;
        return this.columnView;
    }
}