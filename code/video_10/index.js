// TODO: JS goes here!
console.clear();
console.log('Module: Data and Networking');
console.log('Video: AJAX Requests (Historical Context)');

/*
	•	XMLHttpRequest basics (just enough to show legacy)
	•	Comparing XHR vs Fetch
	•	Why Fetch replaced XHR (cleaner, promise-based)
	•	Legacy codebases and why jQuery was popular for AJAX
 */

// URLs
const url_good = 'https://jsonplaceholder.typicode.com/todos/1';
const url_bad = 'https://jsonplaceholder.typicode.com/todos/999999';

// ---- fetch with `fetch` (ES6)
fetch(url_good)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('resource not found (404)');
            } else {
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
        }
        return response.json();
    })
    .then(json => console.log('fetch', json))
    .catch(error => console.log('fetch', error));

// ---- fetch with `XMLHttpRequest`
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log('XMLHttpRequest', data);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
        console.log('XMLHttpRequest Error', xhr.status, xhr.statusText);
    }
}
xhr.open('GET', url_good, true);
xhr.send();

// ---- fetch using `jQuery`
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
})