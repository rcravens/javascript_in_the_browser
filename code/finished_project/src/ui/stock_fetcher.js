import {Stock} from "../data/stock.js";

export class StockFetcher {
    constructor(button_id, input_id, callback) {
        this.btn = document.getElementById(button_id);
        this.input = document.getElementById(input_id);
        this.callback = callback;

        this.#wire_up_button();
    }


    #wire_up_button() {
        const obj = this;
        this.btn.addEventListener('click', async function (evt) {
            const symbol = obj.input.value.trim().toUpperCase();
            if (!symbol) return;

            obj.btn.disabled = true;
            obj.btn.textContent = 'Adding...';
            try {
                const stock = await Stock.fetch(symbol);
                obj.callback(stock);
                obj.input.value = '';
            } catch (e) {
                alert(e);
            } finally {
                obj.btn.disabled = false;
                obj.btn.textContent = 'Add Stock';
            }
        })
    }
}