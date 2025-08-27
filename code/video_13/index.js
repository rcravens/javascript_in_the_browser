// TODO: JS goes here!
console.clear();
console.log('Module: Structuring Applications');
console.log('Video: Simple Frontend App Architecture');

/*
	•	Why structure matters (avoiding “spaghetti JS”)

	•	Frameworks have their own architecture / structure....stick to convention.

	--- General Concepts
	•	Separation of concerns: (HTML, CSS, JS), (ui, models, api)
	•	Modularization: one big file ==> smaller files (maintainability, reuse, single responsibility)
	•	Event-Driven Architecture: utilize browser events, attach listeners, "reactive" applications
	•	Data Management: variables/simple objects, objects with functions to manage data
	•	DOM Manipulation: use DOM methods to create/modify/remove, components, reusable components

	--- Principles
	•	YAGNI (you ain't gonna need it)
	        - don't write code until your app needs it
	        - write code in the order of a logical workflow
	        - teams might need to agree upon data structures to allow parallel work
    •	DRY (don't repeat yourself)
            - duplicate code is harder to maintain
            - refactor into reusable function / module
    •	SRP (single responsibility principle)
            - each file has a single function or concern
            - helps keep files shorter / more maintainable
    •	DECOUPLING
            - tightly coupled code is fragile...changes in one place break code somewhere else
            - data is shared with common models
            - external data (api) is transformed into a common model
            - features are code separated and runtime assembled
            - use events to wire together components
 */

// ---- How to raise custom events?

document.addEventListener('my_simple_event', event => {
    console.log('my_simple_event', 'handler', event);
});

const simple_event = new Event('my_simple_event');
document.dispatchEvent(simple_event);


document.addEventListener('my_custom_event', event => {
    console.log('my_custom_event', 'handler', event);
});

const custom_event = new CustomEvent('my_custom_event', {
    detail: {
        data: {symbol: 'AAPL', price: 123.45}
    }
});
document.dispatchEvent(custom_event);


// ---- Application Example

class RemoveSymbolEvent extends Event {
    static event_name = 'remove_symbol';

    constructor(symbol) {
        super(RemoveSymbolEvent.event_name, {bubbles: true});
        this.symbol = symbol;
    }
}

document.querySelector('tbody').addEventListener('click', evt => {
    if (evt.target.tagName === 'BUTTON' && evt.target.classList.contains('remove-row')) {
        const tr = evt.target.closest('tr');
        const symbol = tr.getAttribute('data-symbol');
        const remove_event = new RemoveSymbolEvent(symbol);
        evt.target.dispatchEvent(remove_event);
    }
})

// UI (Table Component) Listener
//
document.addEventListener(RemoveSymbolEvent.event_name, evt => {
    console.log(RemoveSymbolEvent.event_name, evt, 'remove row from table');
});

// Storage Listener
//
document.addEventListener(RemoveSymbolEvent.event_name, evt => {
    console.log(RemoveSymbolEvent.event_name, evt, 'remove row symbol from localStorage');
});