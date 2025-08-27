export function fetch_stock_data(symbol) {
    return new Promise(function (resolve, reject) {
        // Normally here, we would call `fetch` to get stock data
        //  from an API end-point.

        // Fake some data based upon existing data
        const tr = document.querySelector(`tr[data-symbol="${symbol}"]`);
        if (!tr) {
            reject(`No row found for symbol: ${symbol}!`);
            return;
        }

        // Throw in a random network / api error
        if (Math.random() > 0.5) {
            reject('Oops...something unexpected happened!');
            return;
        }

        const td = tr.children[2];
        const current_price = parseFloat(td.innerText.replace('$', ''));

        const max_percent_change = 2.0;
        const percent_change = (Math.random() * 2 - 1) * max_percent_change;
        const new_price = current_price + current_price * percent_change / 100;

        // Fake some data based upon existing data
        resolve({symbol: symbol, price: new_price});
    });
}
