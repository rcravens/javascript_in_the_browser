import * as api from '../api/stock.js';

export class Stock {
    constructor(symbol) {
        this.symbol = symbol;
        this.closing_prices = {};
    }

    static async fetch(symbol) {
        const series = await api.data(symbol);

        const stock = new Stock(symbol);
        for (const date in series) {
            if (series.hasOwnProperty(date)) {
                const price = series[date]['4. close'];
                stock.add_closing_price(date, price)
            }
        }
        return stock;
    }

    add_closing_price(date, price) {
        this.closing_prices[date] = price;
    }

    closing_price(date) {
        return this.closing_prices[date];
    }

    dates() {
        return Object.keys(this.closing_prices).sort((a, b) => new Date(b) - new Date(a));
    }

    latest_date() {
        return this.dates()[0];
    }

    earliest_date() {
        return this.dates().at(-1);
    }
}