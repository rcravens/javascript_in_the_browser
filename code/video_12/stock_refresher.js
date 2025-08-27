import {fetch_stock_data} from "./stock_api.js";

export async function refresh_all_stocks() {

    const symbols_with_errors = [];

    const all_trs = document.querySelectorAll('tbody#stock-table-body tr');
    for (const tr of all_trs) {
        const symbol = tr.dataset.symbol;
        try {
            const data = await fetch_stock_data(symbol);
            console.log('ui & errors', 'then', symbol, data);
            tr.children[2].innerText = `$${data.price.toFixed(2)}`;
            tr.children[2].classList.remove('text-gray-300');
            tr.children[2].classList.add('text-black');
        } catch (e) {
            symbols_with_errors.push(symbol);
            console.log('ui & errors', 'catch', symbol, e);
            tr.children[2].classList.remove('text-black');
            tr.children[2].classList.add('text-gray-300');
        }
    }

    const footer = document.querySelector('#footer');
    const now = new Date();
    let result = 'Last Update: ' + now.toLocaleString();
    if (symbols_with_errors.length > 0) {
        result += '<br>ERROR Fetching: ' + symbols_with_errors.join(', ');
    }
    footer.innerHTML = result;
}