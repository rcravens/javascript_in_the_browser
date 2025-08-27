import {Stock} from './data/stock.js';
import {StockTable} from './ui/stock_table.js';
import {StockFetcher} from "./ui/stock_fetcher.js";
import {RemoveSymbolEvent} from "./events/remove_symbol.js";
import {NewStockDataEvent} from "./events/new_stock_data.js";

export class App {
    #my_stocks = [];
    #stock_data = [];

    #table = null;
    #fetcher = null;

    constructor() {
        this.use_cache = true;
        console.log(this.use_cache ? 'App is using the CACHE' : 'App is using the API');

        this.#fetcher = new StockFetcher('add-stock');
        document.addEventListener(NewStockDataEvent.event_name, evt => this.#on_new_stock(evt));

        this.#table = new StockTable('stock-table');
        document.addEventListener(RemoveSymbolEvent.event_name, (evt) => this.#on_remove_callback(evt));
    }

    init() {
        this.#load_ticker_symbols();
        console.log('my_stocks', this.#my_stocks);

        this.#refresh_data_and_display();
    }

    #on_remove_callback(evt) {
        this.#remove_symbol(evt.symbol);
    }

    #on_new_stock(evt) {
        if (!evt.stock) return;

        this.#process_stock_data(evt.stock);
    }

    #remove_symbol(symbol) {
        if (this.#my_stocks.includes(symbol)) {
            const index = this.#my_stocks.indexOf(symbol);
            this.#my_stocks.splice(index, 1);

            this.#store_ticker_symbols();
        }

        if (this.#stock_data.hasOwnProperty(symbol)) {
            delete this.#stock_data[symbol];
        }

        console.log('removed symbol from data', symbol);
    }

    #store_ticker_symbols() {
        this.#my_stocks.sort();
        const val = JSON.stringify(this.#my_stocks);
        localStorage.setItem('my_stocks', val);
    }

    #load_ticker_symbols() {
        const val = localStorage.getItem('my_stocks');
        this.#my_stocks = JSON.parse(val) ?? [];
    }

    #process_stock_data(stock) {
        if (!this.#my_stocks.includes(stock.symbol)) {
            this.#my_stocks.push(stock.symbol);

            this.#store_ticker_symbols();
        }

        this.#stock_data[stock.symbol] = stock;

        this.#table.update_row(stock);
    }

    async #refresh_data_and_display() {
        this.#table.clear();

        const symbols_with_errors = [];
        for (const symbol of this.#my_stocks) {
            try {
                const stock = await Stock.fetch(symbol);

                this.#process_stock_data(stock);
            } catch (err) {
                symbols_with_errors.push(symbol);
                console.log(`ERROR: ${symbol} - ${err.toString()}`);
            }
        }

        symbols_with_errors.forEach((symbol) => this.#remove_symbol(symbol));
    }
}
