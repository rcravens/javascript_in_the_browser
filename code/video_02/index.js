// TODO: JS goes here!
console.clear();
console.log('Module: The Browser and the DOM');
console.log('Video: The DOM Explained');

/*
	•	Select Element ---> Interact / Change Element
	•	getElementById, querySelector, querySelectorAll
	•	NodeLists vs HTMLCollections (https://www.freecodecamp.org/news/dom-manipulation-htmlcollection-vs-nodelist/)
	•	Reading/modifying text and HTML (innerText, textContent, innerHTML)
	•	Best practices (avoiding overuse of innerHTML)
	•	Setting attributes (setAttribute, getAttribute)
 */

// -------------------- Querying the DOM (a.k.a. Finding Elements)
// Query by ID
const form = document.getElementById('add-stock');
console.log('ID (getElementById)', form);
const table = document.querySelector('#stock-table');
console.log('ID (querySelector)', table);

// Query by element type
const first_tr = document.querySelector('tr');
console.log('Element Type (querySelector)', first_tr);
const all_trs = document.querySelectorAll('tr');
console.log('Element Type (querySelectorAll)', all_trs);

// Query by CSS class
const remove_btns = document.querySelectorAll('.remove-row');
console.log('CSS', remove_btns);

// Query by attribute
const google_tr = document.querySelector('[data-symbol="GOOGL"]');
console.log('Attribute', google_tr);

// Combining selectors to refine selection
const stock_trs = document.querySelectorAll('tbody tr');
console.log('Combination 1', stock_trs);
const up_stock_trs = document.querySelectorAll('tbody tr:has(td.text-green-600)');
console.log('Combination 2', up_stock_trs);
const submit_btn = document.querySelector('#add-stock button[type="submit"]')
console.log('Combination 3', submit_btn);

// Limiting query scope
const symbol_input = form.querySelector('input');
const add_symbol_btn = form.querySelector('button');
console.log('Limiting Scope', symbol_input, add_symbol_btn);

// Parent / child / closest
const form_parent = form.parentElement;
console.log('Parent', form_parent);

const children = form.children;
console.log('Children', children);

const price_td = google_tr.children[2];
console.log('Child: price_td', price_td);
const price = parseFloat(price_td.innerText.trim().replace(/\$/g, ''));
console.log('Child: price', price);

const tbody = google_tr.closest('tbody');
console.log('Closest: tbody', tbody);

// -------------------- Modifying the DOM
console.log('innerText', form.innerText);
console.log('innerHTML', form.innerHTML);
console.log('textContent', form.textContent);

form.textContent = `

<h1 class="text-3xl font-bold text-gray-800 mb-6">Title</h1>
<p class="text-red-600">Paragraph</p>

`;

const attrs = google_tr.attributes;
console.log('attributes', attrs);

google_tr.setAttribute('my_attribute', 'This is my attribute');
google_tr.removeAttribute('my_attribute');

google_tr.setAttribute('data-url', 'https://google.com');

// NOTE: We will learn better ways to manipulate CSS and styles....
google_tr.setAttribute('style', 'background-color:red');

