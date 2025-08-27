import {Stock} from "../data/stock.js";
import {NewStockDataEvent} from "../events/new_stock_data.js";

export class StockFetcher {
    #form;
    #input;
    #btn

    constructor(form_id) {
        this.#form = document.getElementById(form_id);
        this.#input = this.#form.querySelector('input');
        this.#btn = this.#form.querySelector('button');

        this.#wire_up_button();
    }


    #wire_up_button() {
        this.#form.addEventListener('submit', async (evt) => {
            evt.preventDefault();

            const symbol = this.#input.value.trim().toUpperCase();
            if (!symbol) return;

            this.#btn.disabled = true;
            this.#btn.textContent = 'Adding...';
            try {
                const stock = await Stock.fetch(symbol);

                // raise event
                const event = new NewStockDataEvent(stock);
                document.dispatchEvent(event);

                this.#input.value = '';
            } catch (e) {
                alert(e);
            } finally {
                this.#btn.disabled = false;
                this.#btn.textContent = 'Add Stock';
            }
        })
    }
}