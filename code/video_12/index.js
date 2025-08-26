// TODO: JS goes here!
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

function async_code() {
    return new Promise(function (resolve, reject) {
        console.log('starting async_code');
        if (Math.random() < 0.5) {
            // DO NOT THROW
            // console.log('async_code failed - throw new Error');
            // throw new Error('async_code failed - throw new Error');

            console.log('async_code failed - reject');
            reject('async_code failed - reject');
        } else {
            resolve({name: 'Bob', color: 'blue'});
        }
        console.log('finishing async_code');
    });
}

console.log('-------- async: VERSION 1 async/await');
console.log('before try');
try {
    console.log('before async_code');
    const result = await async_code();
    console.log('result', result);
    console.log('after async_code');
} catch (e) {
    console.log('catch')
    console.log(e);
} finally {
    console.log('finally');
}
console.log('after try')


console.log('-------- async: VERSION 2 then/catch');
console.log('before try');
try {
    console.log('before async_code');
    async_code()
        .then(result => console.log(result))
        .catch(reason => console.log(reason));
    console.log('after async_code');
} catch (e) {
    console.log('catch')
    console.log(e);
} finally {
    console.log('finally');
}
console.log('after try')


function get_user_preferences(email) {
    return new Promise(function (resolve, reject) {
        console.log('fetching user...');
        if (Math.random() < 0.5) {
            console.log('...user not found');
            reject('User not found.');
        } else {
            resolve({email: email, color: 'blue',});
        }
        console.log('finishing async_code');
    });
}