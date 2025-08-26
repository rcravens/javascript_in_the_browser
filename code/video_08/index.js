// TODO: JS goes here!
console.clear();
console.log('Module: Browser Timing and Execution');
console.log('Video: Timers');

/*
	•	setTimeout for delayed actions
	•	setInterval for repeated actions
	•	Canceling timers (clearTimeout, clearInterval)
	•	Use cases: countdown timers, polling APIs
	•	Common pitfalls (interval drift, relying on timers for UI sync)
 */

let last_called = null;

function long_running_task() {
    // simulate a long-running task
    let i = 0;
    while (i < 5000000000) {
        i++;
    }
}

function print_time() {
    const now = new Date();
    const current_dt = now.toLocaleTimeString();

    const diff = last_called !== null ? now - last_called : 0;

    console.log(current_dt + ' (' + diff + 'mS)')

    last_called = now;
}

console.log('----- start');
print_time();

print_time();

setTimeout(print_time, 1000);

setInterval(print_time, 5000);

const time_span = document.querySelector('#current_time');

function update_time() {
    const now = new Date();
    time_span.innerText = now.toLocaleTimeString();
}

let interval_id = null;
const clock_btn = document.querySelector('#toggle_clock');
clock_btn.addEventListener('click', (evt) => {
    if (interval_id === null) {
        // Clock is stopped....start it
        interval_id = setInterval(update_time, 1000);
        clock_btn.innerText = 'pause';
    } else {
        // Clock is running....stop it
        clearInterval(interval_id);
        interval_id = null;
        clock_btn.innerText = 'start';
    }
})

let timeout_id = setTimeout(() => console.log('BOOM'), 5000);
document.addEventListener('click', (evt) => {
    clearTimeout(timeout_id);
    timeout_id = null;
    console.log('bomb has been defused.');
});

// drift timer
//
let expected_time = Date.now();
const interval = 1000;
let tick_count = 0;
setInterval(() => {
    expected_time += interval

    const actual_time = Date.now();
    const drift = actual_time - expected_time;

    console.log(`tick ${++tick_count}: actual time: ${actual_time}, expected time: ${expected_time}, drift: ${drift}ms`);

    long_running_task();    // timer drift, ui lags, ui non-responsive
}, interval);

console.log('----- end');