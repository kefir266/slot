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
    }

    public rotate(): Promise<ColumnView> {
        for(let pos = 0; pos < this.accelerate(); pos++) {
            this.current = this.current.next;
        }
        //TODO set timeout


        return Promise.resolve(this.getViewColumn());
    }

    private accelerate(): number {
        return Math.random() * 10 * this.length + this.length;
    }

    public getViewColumn():ColumnView {
        const column = [];
        let view = this.current;
        for (let ind = 0; ind < this.heightView; ind++) {
            column.push(view.symbol);
            view = view.next;
        }
        return {stopPosition: this.current.position, view: column}
    }
}