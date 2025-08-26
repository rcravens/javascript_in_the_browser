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
    if (process_count % 5 === 0) {
        microtask_count = 0;
        queueMicrotask(microtask);
    }
    console.log('process many times: ' + process_count);
}

function my_promise() {
    return new Promise((resolve, reject) => {
        let sum = 0
        for (let i = 0; i < 1; i++) {
            sum += i;
        }
        resolve(sum);
    });
}

let microtask_count = 0;

function microtask() {
    console.log('microtask: ' + microtask_count);
    microtask_count++;
    if (microtask_count < 100000) {
        queueMicrotask(microtask);
    }
}


console.log('before');

first();

// Create macrotasks
setTimeout(process_once, 5000);
setInterval(process_many_times, 1000);

// Create microtasks
my_promise().then((result) => {
    console.log(`my promise: sum=${result}`);
});
queueMicrotask(microtask);

console.log('end of file');