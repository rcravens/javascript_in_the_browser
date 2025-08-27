import {RemoveSymbolEvent} from "../events/remove_symbol.js";

export class StockTable {
    constructor(table_id) {
        this.table = document.getElementById(table_id);

        this.#wire_up_remove_buttons();
    }

    clear() {
        while (this.table.rows.length > 1) {
            this.table.deleteRow(1);
        }
    }

    update_row(stock) {
        const date1 = stock.latest_date();
        const date2 = stock.earliest_date();
        const price1 = stock.closing_price(date1);
        const price2 = stock.closing_price(date2);
        const percent_change = 100 * (price1 - price2) / price2;

        const existing_row = this.table.querySelector(`tr[data-symbol="${stock.symbol}"]`);
        if (existing_row) existing_row.remove();

        let row = this.table.insertRow();
        row.setAttribute('data-symbol', stock.symbol);
        row.classList.add('border-b', 'hover:bg-gray-50', 'transition');

        let cell1 = document.createElement('td');
        cell1.textContent = stock.symbol;
        cell1.classList.add('px-4', 'py-2');
        row.appendChild(cell1);

        let cell2 = document.createElement('td');
        cell2.textContent = date1;
        cell2.classList.add('px-4', 'py-2');
        row.appendChild(cell2);

        let cell3 = document.createElement('td');
        cell3.textContent = `$${price1.toLocaleString()}`;
        cell3.classList.add('px-4', 'py-2');
        row.appendChild(cell3);

        let cell4 = document.createElement('td');
        cell4.textContent = date2;
        cell4.classList.add('px-4', 'py-2');
        row.appendChild(cell4);

        let cell5 = document.createElement('td');
        cell5.textContent = `$${price2.toLocaleString()}`;
        cell5.classList.add('px-4', 'py-2');
        row.appendChild(cell5);

        let cell6 = document.createElement('td');
        let sign = percent_change >= 0 ? '+' : '';
        cell6.textContent = `${sign}${percent_change.toFixed(2)}%`;
        cell6.classList.add('px-4', 'py-2');
        if (percent_change > 0) {
            cell6.classList.add('text-green-600');
        }
        if (percent_change < 0) {
            cell6.classList.add('text-red-600');
        }
        row.appendChild(cell6);

        let cell7 = document.createElement('td');
        cell7.classList.add('px-4', 'py-2');
        let btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.classList.add('text-red-500', 'hover:text-red-700', 'remove-row');
        cell7.appendChild(btn);
        row.appendChild(cell7);
    }

    #wire_up_remove_buttons() {
        this.table.addEventListener('click', (evt) => {
            if (evt.target.tagName === 'BUTTON' && evt.target.classList.contains('remove-row')) {
                const row = evt.target.closest('tr');
                const symbol = row.dataset.symbol;

                const remove_event = new RemoveSymbolEvent(symbol);
                evt.target.dispatchEvent(remove_event);

                row.remove();   // Do not remove row before dispatching event, or it WILL NOT bubble
            }
        })
    }
}