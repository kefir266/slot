
export interface Symbol {
    symbol: number;
    next?: Symbol;
    position: number;
  }

export interface ColumnView {
    stopPosition: number;
    view: Symbol[];
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
        this.setColumnView();
    }

    rotate(position: number | null = null): ColumnView {
        const pos = position !== null ? position : this.accelerate();
        for(let ind = 0; ind < pos; ind++) {
            this.current = this.current.next;
        }
        this.setColumnView();
        return this.getViewColumn();
    }

    private accelerate(): number {
        return Math.random() * this.length;
    }

    private setColumnView() {
        this.currentView = this.current;
        for (let ind = 0; ind < this.heightView; ind++) {
            this.columnView.view[ind] = this.currentView;
            this.currentView = this.currentView.next;
        }
        this.columnView.stopPosition = this.current.position;
    }

    getViewColumn():ColumnView {

        return this.columnView;
    }

    setPosition(position: number) {
        this.current = this.head;
        this.rotate(position);
    }

    getLink(ind: number) {
        return this.columnView.view[ind];
    }
}
