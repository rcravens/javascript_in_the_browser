// TODO: JS goes here!
import {TripRecorder} from './trip_recorder.js'

console.clear();
console.log('Module: Data and Networking');
console.log('Video: Introduction to Browser APIs');

/*
	•	Storage APIs: localStorage, sessionStorage
	•	Geolocation API basics (prompting permissions, getting coords)
	•	Navigator API (user agent, online/offline status)
	•	Other interesting APIs (Clipboard, Notifications) — quick mention
	•	Example: storing form preferences in localStorage
 */

// ---- Storage API

// Local Storage (per user, per domain)
//  - key / value
//  - up to 5MB per origin
//  - persists indefinitely until removed
//  - synchronous access
//  - not encrypted
//  => user preferences, theme setting (dark/light), ...

console.log(window.localStorage, localStorage);

localStorage.setItem('test', 'This is a test');
console.log(localStorage);

const test_val = localStorage.getItem('test');
console.log(test_val, localStorage);

localStorage.removeItem('test');
console.log(localStorage);

// DO NOT DO THIS
localStorage.setItem('is_admin', '0');

// localStorage.clear();


// Session Storage (per user, per domain)
//  - similar to Local Storage except data expires when user closes the tab or browser
//  => multistep forms, shopping cart, ...

// run once -> comment out -> close tab -> open new tab
// localStorage.setItem('persist_test', 'Does this persist?');
// sessionStorage.setItem('persist_test', 'Does this persist?');


// Cookie Storage (per user, per domain)
//  - key / value + expiry date + path
//  - sent with every HTTP request to server
//  - around 4KB per domain
//  - stored as a single string
//  - server side versus client side cookies & security
//  => data that need to be sent to the server
//      session tracking
//      encrypted auth tokens (HttpOnly & Secure)

remove_all_cookies();
log_cookies();

set_cookie('cookie1', 'chocolate chip');
log_cookies();

set_cookie('cookie2', 'oatmeal raisin', 5)
log_cookies();

remove_cookie('cookie1');
log_cookies();

function log_cookies() {
    console.log('document.cookie', document.cookie);
    console.log('cookie1', get_cookie('cookie1'));
    console.log('cookie2', get_cookie('cookie2'));
}

function set_cookie(key, value, expiry_days) {
    const d = new Date();
    d.setTime(d.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function get_cookie(key) {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function remove_cookie(name) {
    set_cookie(name, '', -1);
}

function remove_all_cookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        remove_cookie(name);
    });
}

// IndexDB
//  - async api
//  - hundreds of MB per origin
//  - supports transactions, indexes, and queries
//  - large-scale client-side data storage
//  => offline applications, large structured data
//

// SQLite (no native browser support)
//  - sql based relational database
//  - single file stored locally
//  - works offline
//  => electron apps, mobile apps (react native), browser extensions


// Cache API
//  - stores HTTP responses
//  - offline experiences
//  => caching assets for performance, offline apps


// ---- Geolocation API
//  - GPS -> Wi-Fi Positioning -> Cellular Network Triangulation -> IP Address

console.log(navigator.geolocation);

// navigator.geolocation.getCurrentPosition(log_position, (error) => console.log(error));

function log_position(position) {
    console.log(position);
    const lat = randomize_position(position.coords.latitude);
    const lng = randomize_position(position.coords.longitude);
    const alt = position.coords.altitude;
    const accuracy = position.coords.accuracy;              // meters
    const alt_accuracy = position.coords.altitudeAccuracy;  // meters

    const url = `https://www.google.com/maps/@${lat},${lng},15z`

    console.log(`lat: ${lat}, lng: ${lng}, accuracy: ${accuracy}`);
    console.log(`alt: ${alt}, accuracy: ${alt_accuracy}`);
    console.log(`url: ${url}`);
}

function randomize_position(coordinate) {
    const max_offset = 2
    const degree_offset = (Math.random() * 2 - 1) * max_offset;
    return coordinate + degree_offset;
}

const recorder = new TripRecorder(0.25, 0.1, function (cur_pos) {
    console.log(cur_pos);
});
// recorder.start();

// ---- Navigator API
//  - integration with browser / environment
//  - geolocation....but there is so much more

// online status
console.log('online', navigator.onLine);
window.addEventListener('online', () => console.log('you are back online'));
window.addEventListener('offline', () => console.log('you are offline'));

// device info
console.log(navigator);
console.log('platform', navigator.platform);
console.log('user agent', navigator.userAgent);
console.log('language', navigator.language);

console.log('user agent data', navigator.userAgentData);
const platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
console.log('platform', platform);

// clipboard integration
await navigator.clipboard.writeText('https://tekcasts.com');
console.log('data copied to clipboard');
