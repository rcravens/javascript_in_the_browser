// TODO: JS goes here!
console.clear();
console.log('Module: The Browser and the DOM');
console.log('Video: Browser Runtime Environment');

/*
	•	JS Foundations: https://tekcasts.com/series/javascript-for-beginners
	•	JS Code, JS Engine, and JS Runtime
	•	JS Engines for Major Browsers (John Dakshak): https://hackmd.io/@JohnD/HyLe9j_hyg
	•	What the DOM is (tree structure of nodes)
	•	Relationship between HTML, CSS, JS, and the DOM
	•	Document object (document) as entry point
	•	DOM (document) vs BOM (Browser Object Model) (window) distinction
	•	Inspecting the DOM with browser dev tools
 */

// --------------- DOM - Document Object Model (Data + API)

console.log('DOM', document);

// Selecting Document Elements
const imgs = document.querySelectorAll('img');
console.log(imgs);

// View element properties / attributes
console.log(imgs[0].style);

// Modify element properties / attributes
imgs[0].style.border = '10px solid red';

// Modify elements based on events
imgs[1].addEventListener('mouseenter', () => {
    console.log('Mouse Enter');
    imgs[1].style.border = '10px solid red';
});
imgs[1].addEventListener('mouseleave', () => {
    console.log('Mouse Leave');
    imgs[1].style.border = 'none';
});

// --------------- BOM - Browser Object Model (Data + API)
// https://www.w3schools.com/js/js_window.asp

console.log('BOM', window);

// Examples
window.console.log('Our familiar friend belongs here.'); // Generally don't need to use 'window.' to resolve these functions

window.alert('This is a message');
alert('This is another message');

function alert(msg) {
    window.alert('PREFIX: ' + msg);
}

console.log(localStorage);

console.log(navigator.geolocation);

console.log(fetch);

