// TODO: JS goes here!
console.clear();
console.log('Module: The Browser and the DOM');
console.log('Video: Class and Style Manipulation');

/*
	•	classList methods (add, remove, toggle, contains)
	•	Direct style manipulation via .style
	•	When to prefer CSS classes vs inline styles
	•	Dynamic themes (e.g., dark mode toggle demo)
 */

// ------- From previous video on selectors
const google_tr = document.querySelector('[data-symbol="GOOGL"]');
console.log('google_tr', google_tr);

const price_td = google_tr.children[2];
console.log('price_td', price_td);

const change_td = google_tr.children[5];
console.log('change_td', change_td);

// ------- Modifying CSS classes
console.log(google_tr.classList);

google_tr.classList.add('test-class');

console.log(google_tr.classList);

google_tr.classList.remove('test-class');

if (change_td.classList.contains('text-red-600')) {
    google_tr.classList.toggle('hidden');
}

// ------- Direct Style Manipulation
const btn = document.querySelector('form button');
console.log('btn', btn, btn.style);
btn.style.backgroundColor = 'red';
btn.style.fontSize = '48px';
btn.style.textTransform = 'uppercase';
btn.style.border = '3px solid blue';


// ------- Tailwind CSS Dark Mode Toggle
tailwind.config.darkMode = 'class';

const mode_switch = document.querySelector('.mode-switch');
const is_dark_mode = document.documentElement.classList.contains('dark');
if (is_dark_mode) {
    mode_switch.checked = true;
}
mode_switch.addEventListener('change', () => {
    const {checked} = mode_switch;
    if (checked) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});