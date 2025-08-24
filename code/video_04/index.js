// TODO: JS goes here!
console.clear();
console.log('Module: Events and Interactions');
console.log('Video: Event Listeners and Handling Events');

/*
	•	Event based programming
	•	addEventListener syntax and removing listeners
	•	The event object (event.target, event.currentTarget)
	•	Event bubbling vs capturing
	•	Stopping propagation (stopPropagation, preventDefault)
	•	Delegation patterns (attaching to parent elements)
 */

// ------- What are events
// examples:
//  - mouse: click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout
//  - keyboard: keydown, keyup
//  - forms: submit, change, focus, blur, input
//  - window: load, resize, scroll, unload
//  - clipboard: copy, cut paste
//  - drag & drop: dragstart, drag, dragend, drop
//  - media: play, pause, ended, volumechange

// ------- Event propagation (https://javascript.info/bubbling-and-capturing)
//  - capturing phase: evt starts from the outermost element (window or document) and
//      travels down the DOM tree trickling down through each intermediate ancestor
//      until is reaches the actual target element where the event originated.
//  - bubbling up phase: after capturing phase completes, the event is then "bubbled up"
//      from the target to immediate parent, then to grandparent...until it reaches top-level
//  - calling `stopPropagation` prevents propagation to the next level (going down or up).
//      it will run all the handlers for the current level first.
//  - calling `preventDefault` prevents the browser's default action associated with a
//      specific event from occurring. (e.g., link -> no navigation, form -> no submission).
//      it does not prevent propagation.


// ------- Attaching event handlers to events

// Event object
document.addEventListener('click', (evt) => {
    console.log(evt.target, evt.currentTarget);
});

for (let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
}

// Show mouse position
const footer = document.getElementById('footer');
document.addEventListener('mousemove', (evt) => {
    // console.log(evt);
    const {clientX, clientY} = evt;
    footer.innerText = `xpos: ${clientX}, ypos: ${clientY}`;
});

// Only allow characters (a-z, A-Z) in input box
const input = document.querySelector('form input');
input.addEventListener('keydown', (evt) => {
    console.log(evt);

    const key = evt.key;

    if (evt.ctrlKey || evt.altKey || evt.metaKey ||
        ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter'].includes(key)) {
        return; // Allow the default action for these keys
    }

    if (key.length === 1) {
        if (/[a-zA-Z]/.test(key)) {
            return;
        }
    }

    evt.preventDefault(); // Prevents the default processing (e.g., adding character to input)
});
input.onkeydown = function (evt) {
    console.log('onkeydown', evt);
}
input.addEventListener('keydown', (evt) => {
    console.log('second listener', evt);
});

// Prevent form submission
document.querySelector('form').addEventListener('submit', (evt) => {
    // Do some validation
    const is_valid = false;
    if (!is_valid) {
        console.log('form submission prevented');
        evt.preventDefault();
        return;
    }

    // Process the form
    console.log('form processing');
});

// Make "remove buttons" function...kind of
// First Try:
//  - Requires addEventListener for every row that exists or is added dynamically
// document.querySelectorAll('.remove-row').forEach((el) => {
//     el.addEventListener('click', (evt) => {
//         console.log(evt, evt.target);
//         const tr = evt.target.closest('tr');
//         console.log(tr);
//         tr.style.textDecoration = 'line-through';
//     });
// });
// Second Try:
//  - Delegate to parent. Single event (reduced memory, improved performance, simpler code)
document.querySelector('tbody').addEventListener('click', (evt) => {
    console.log('second try', evt, evt.target);
    if (evt.target.tagName === 'BUTTON' && evt.target.classList.contains('remove-row')) {
        console.log('originating element is one of my remove buttons');
        const tr = evt.target.closest('tr');
        console.log(tr);
        tr.style.textDecoration = 'line-through';
    }
});
