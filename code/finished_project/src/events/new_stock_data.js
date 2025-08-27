export class NewStockDataEvent extends Event {
    static event_name = 'new_stock_data';

    constructor(stock) {
        super(NewStockDataEvent.event_name, {bubbles: true});

        this.stock = stock;
    }
}