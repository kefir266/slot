export interface Symbol {
    symbol: number;
    next?: Symbol;
    position: number;
}

export interface Observer {
    init: Function;
    rotate: Function;
    get: Function;
}

export interface ColumnView {
    stopPosition: number;
    view: Symbol[];
}

export class Reel {
    private current: Symbol;
    private head: Symbol;
    private length: number;
    private columnView: ColumnView = {stopPosition: 0, view: []};
    private currentView = this.current;
    observers: Observer[] = [];

    constructor(reel: number[]) {
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
        // this.setColumnView();
    }

    rotate(position: number | null = null) {
        const pos = position !== null ? position : this.accelerate();
        for (let ind = 0; ind < pos; ind++) {
            this.current = this.current.next;
        }
        this.columnView.stopPosition = this.current.position;
        this.rotateOservers(pos);
    }

    private rotateOservers(pos: number) {
        this.observers.forEach( observer => {
            observer.rotate(pos);
        });
    }

    private accelerate(): number {
        return Math.random() * this.length;
    }

    setPosition(position: number) {
        this.current = this.head;
        this.rotate(position);
        this.observers.forEach( observer => {
            observer.init();
            observer.rotate(position);
        });
    }

    addOserver(observer: Observer) {
        this.observers.push(observer);
    }

    getLinkOfHead() {
        return this.head;
    }

    getStopPositions() {
        return this.current.position;
    }
}
