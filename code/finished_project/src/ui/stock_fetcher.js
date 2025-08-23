import {Stock} from "../data/stock.js";

export class StockFetcher {
    #form;
    #input;
    #btn
    #callback;

    constructor(form_id, callback) {
        this.#form = document.getElementById(form_id);
        this.#input = this.#form.querySelector('input');
        this.#btn = this.#form.querySelector('button');
        this.#callback = callback;

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
                this.#callback(stock);
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