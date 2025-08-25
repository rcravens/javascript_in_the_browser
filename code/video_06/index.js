// TODO: JS goes here!
console.clear();
console.log('Module: Events and Interactions');
console.log('Video: Creating, Removing, and Cloning Elements');

/*
	•	Creating nodes (document.createElement, document.createTextNode)
	•	Appending to DOM (appendChild, append, prepend)
	•	Removing elements (remove)
	•	Cloning nodes with cloneNode(true/false)
 */


const tbody = document.querySelector('table tbody');
console.log('tbody', tbody);

// ---- Creating nodes

// NOT THE RECOMMENDED WAY....but it works
//  https://medium.com/@verity.carlos/why-you-shouldnt-use-innerhtml-and-what-to-use-instead-ed99d064a416
//
function create_row1(symbol, date1, price1, date2, price2) {
    const percent_change = 100 * (price1 - price2) / price2;
    const sign = percent_change >= 0 ? '+' : '';
    let css_class = '';
    if (percent_change > 0) {
        css_class = 'text-green-600';
    }
    if (percent_change < 0) {
        css_class = 'text-red-600';
    }
    return `
<tr class="border-b hover:bg-gray-50 transition" data-symbol="${symbol}">
    <td class="px-4 py-2">${symbol}</td>
    <td class="px-4 py-2">${date1}</td>
    <td class="px-4 py-2">$${price1}</td>
    <td class="px-4 py-2">${date2}</td>
    <td class="px-4 py-2">$${price2}</td>
    <td class="px-4 py-2 ${css_class}">${sign}${percent_change.toFixed(2)}%</td>
    <td class="px-4 py-2">
        <button class="text-red-500 hover:text-red-700 remove-row">Remove</button>
    </td>
    <td class="px-4 py-2">
        <button class="text-blue-500 hover:text-blue-700 clone-row">Clone</button>
    </td>
</tr>`
}

tbody.innerHTML += create_row1('ABC', '2025-08-21', 145.09, '2025-03-31', 130.09);

// RECOMMENDED WAY
function create_row2(symbol, date1, price1, date2, price2) {
    const row = document.createElement('tr')
    row.setAttribute('data-symbol', symbol);
    row.classList.add('border-b', 'hover:bg-gray-50', 'transition');

    const cell1 = document.createElement('td');
    cell1.textContent = symbol;
    cell1.classList.add('px-4', 'py-2');
    row.appendChild(cell1);

    const cell2 = document.createElement('td');
    cell2.textContent = date1;
    cell2.classList.add('px-4', 'py-2');
    row.appendChild(cell2);

    const cell3 = document.createElement('td');
    cell3.textContent = `$${price1.toLocaleString()}`;
    cell3.classList.add('px-4', 'py-2');
    row.appendChild(cell3);

    const cell4 = document.createElement('td');
    cell4.textContent = date2;
    cell4.classList.add('px-4', 'py-2');
    row.appendChild(cell4);

    const cell5 = document.createElement('td');
    cell5.textContent = `$${price2.toLocaleString()}`;
    cell5.classList.add('px-4', 'py-2');
    row.appendChild(cell5);

    const percent_change = 100 * (price1 - price2) / price2;
    const sign = percent_change >= 0 ? '+' : '';
    const cell6 = document.createElement('td');
    cell6.textContent = `${sign}${percent_change.toFixed(2)}%`;
    cell6.classList.add('px-4', 'py-2');
    if (percent_change > 0) {
        cell6.classList.add('text-green-600');
    }
    if (percent_change < 0) {
        cell6.classList.add('text-red-600');
    }
    row.appendChild(cell6);

    const cell7 = document.createElement('td');
    cell7.classList.add('px-4', 'py-2');
    const remove_btn = document.createElement('button');
    remove_btn.textContent = 'Remove';
    remove_btn.classList.add('text-red-500', 'hover:text-red-700', 'remove-row');
    cell7.appendChild(remove_btn);
    row.appendChild(cell7);

    const cell8 = document.createElement('td');
    cell8.classList.add('px-4', 'py-2');
    const clone_btn = document.createElement('button');
    clone_btn.textContent = 'Clone';
    clone_btn.classList.add('text-blue-500', 'hover:text-blue-700', 'clone-row');
    cell8.appendChild(clone_btn);
    row.appendChild(cell8);

    return row;
}

const new_tr = create_row2('ABC', '2025-08-21', 145.09, '2025-03-31', 130.09);
tbody.append(new_tr);

// Other examples
//
const first_div = document.querySelector('div');

const btn1 = document.createElement('button');
btn1.classList.add('bg-red-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-red-600', 'transition');
btn1.textContent = 'Append';
first_div.append(btn1, 'Foo Bar');

const btn2 = document.createElement('button');
btn2.classList.add('bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-green-600', 'transition');
btn2.textContent = 'Append Child';
first_div.appendChild(btn2);

const text_node = document.createTextNode('Foo Bar');
first_div.appendChild(text_node);

const btn3 = document.createElement('button');
btn3.classList.add('bg-orange-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-orange-600', 'transition');
btn3.textContent = 'Prepend';
first_div.prepend(btn3);

// ---- Removing nodes
const h1_el = document.querySelector('h1');
h1_el.remove();

document.addEventListener('click', (evt) => {
    // evt.target.remove();
})

// tbody.innerHTML = '';

// ---- Cloning nodes
const all_remove_btns = document.querySelectorAll('tbody tr button.remove-row');
document.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
        if (evt.target.classList.contains('remove-row')) {
            evt.target.closest('tr').remove();
        }
        if (evt.target.classList.contains('clone-row')) {
            const tr = evt.target.closest('tr');
            const cloned_tr = tr.cloneNode(true);
            tbody.append(cloned_tr);
        }
    }
});