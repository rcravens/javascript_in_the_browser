// TODO: JS goes here!
console.clear();
console.log('Module: Frameworks and Libraries');
console.log('Video: jQuery – Historical Context and Syntax Sugar');

/*
	•	Why jQuery mattered (cross-browser, easier DOM manipulation)
	•	Where it’s still used today (legacy projects, WordPress plugins)
	•	Modern replacement: native JS + frameworks
	•	DOM selection with $() vs querySelector
	•	Chaining syntax (.addClass().text().on())
 */

// dom selection
const add_btn1 = document.querySelector('#add-stock button');
const add_btn2 = $('#add-stock button');
console.log(add_btn1, add_btn2);

add_btn2.text('New Text');

// events
$('tbody').on('click', 'button.remove-row', evt => {
    console.log('click', evt);
});

// ajax requests
const url_good = 'https://jsonplaceholder.typicode.com/todos/1';
const url_bad = 'https://jsonplaceholder.typicode.com/todos/999999';
$.ajax({
    url: url_good,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log('jQuery', data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log('jQuery Error', textStatus, errorThrown);
    }
});

// chaining
add_btn2.text('Newer Text')
    .addClass('bg-orange-600')
    .on('click', evt => {
        evt.preventDefault();
        console.log('clicked', evt)
    });