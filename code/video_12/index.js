// TODO: JS goes here!
import {refresh_all_stocks} from "./stock_refresher.js";

console.clear();
console.log('Module: Error Handling and UI Resilience');
console.log('Video: Error Handling in the UI');

/*
	•	try...catch...finally
	•	Handling async errors (try/catch with async/await and then/catch)
	•	Graceful degradation (fallback messages/UI)
	•	Displaying errors to users in a non-technical way
 */

// ---- try/catch/finally review
console.log('-------- sync');

function sync_code() {
    console.log('starting sync_code');
    if (Math.random() < 0.5) {
        throw new Error('sync_code failed');
    }
    console.log('finishing sync_code');
}

console.log('before try');
try {
    console.log('before sync_code');
    sync_code();
    console.log('after sync_code');
} catch (e) {
    console.log('catch')
    console.log(e);
} finally {
    console.log('finally');
}
console.log('after try')

// ---- fetch async/await

function async_code(version) {
    return new Promise(function (resolve, reject) {
        console.log(version, 'starting async_code');
        if (Math.random() < 0.5) {
            // DO NOT THROW
            // console.log('async_code failed - throw new Error');
            // throw new Error('async_code failed - throw new Error');

            console.log(version, 'async_code failed - reject');
            reject('async_code failed - reject');
        } else {
            resolve({name: 'Bob', color: 'blue'});
        }
        console.log(version, 'finishing async_code');
    });
}

console.log('-------- async: VERSION 1 async/await');
console.log('version 1', 'before try');
try {
    console.log('version 1', 'before async_code');
    const result = await async_code('version 1');
    console.log('version 1', 'result', result);
    console.log('version 1', 'after async_code');
} catch (e) {
    console.log('version 1', 'catch', e)
} finally {
    console.log('version 1', 'finally');
}
console.log('version 1', 'after try')


console.log('-------- async: VERSION 2 then/catch');
console.log('version 2', 'before try');
try {
    console.log('version 2', 'before async_code');
    async_code('version 2')
        .then(result => console.log('version 2', result))
        .catch(reason => console.log('version 2', reason));
    console.log('version 2', 'after async_code');
} catch (e) {
    console.log('version 2', 'catch', e)
} finally {
    console.log('version 2', 'finally');
}
console.log('version 2', 'after try')


// ---- error integration with UI
console.log('-------- UI Error Integration');

//
// fetch_stock_data('AAPL')
//     .then(result => console.log('ui & errors', result))
//     .catch(error => console.log('ui & errors', error));

// refresh_all_stocks();
setInterval(refresh_all_stocks, 5000);
