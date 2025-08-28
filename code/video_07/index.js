// TODO: JS goes here!
console.clear();
console.log('Module: Browser Timing and Execution');
console.log('Video: Understanding the Event Loop');

/*
	•	Call stack basics
	•	Synchronous vs asynchronous execution
	•	Macrotasks (setTimeout, setInterval)
	•	Microtasks (Promises, MutationObserver)
	•	Demo: ordering of console logs with timers & promises
 */

function first() {
    // debugger;
    console.trace('entering first');
    second();
    console.trace('exiting first');
}

function second() {
    console.trace('entering second');
    third();
    console.trace('exiting second');
}

function third() {
    console.trace('entering third');
    // first();    // causes 'stack overflow'
    console.trace('exiting third');
}

function process_once() {
    console.trace('process once');
}

let process_count = 0;

function process_many_times() {
    process_count++;
    console.log('process many times: ' + process_count);
}

let microtask_count = 0;

function microtask() {
    console.log('microtask: ' + microtask_count);
    microtask_count++;
    if (microtask_count < 100000) {
        queueMicrotask(microtask);
    }
}

function my_promise() {
    return new Promise((resolve, reject) => {
        const start_ms = Date.now();
        let delta_ms = 0;
        while (delta_ms < 2000) {
            delta_ms = Date.now() - start_ms;
        }
        resolve(delta_ms);
    });
}


console.log('before');

first();

// Create macrotasks
setTimeout(process_once, 5000);
setInterval(process_many_times, 1000);

// Create microtasks
// queueMicrotask(microtask);
my_promise().then(result => console.log(`my_promise: delta=${result}`))

console.log('end of file');
