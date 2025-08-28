// TODO: JS goes here!

import {CreateAccountForm} from "./create_account.js";

console.clear();
console.log('Module: Events and Interactions');
console.log('Video: Working with Forms and User Input');

/*
	•	Accessing form elements (value, checked, selectedIndex)
	•	Basic validation (required fields, patterns)
	•	Feedback with validation errors
	•	Handling submit events and preventing reload
	•	Example: Create Account
 */

// Access via elements
const email_el = document.getElementById('email');
email_el.value = 'test@example.com';
console.log(email_el, email_el.value);

const password_el = document.getElementById('password');
password_el.value = 'secret';
console.log(password_el, password_el.value);

const password_confirm_el = document.getElementById('confirm-password');
password_confirm_el.value = 'secret';
console.log(password_confirm_el, password_confirm_el.value);

const terms_el = document.getElementById('terms');
terms_el.checked = true;
console.log(terms_el, terms_el.value, terms_el.checked);

// Access via document.forms
console.log(document.forms['create-account']['email'].value);

// Access via form element
const create_form = document.getElementById('create-account');
console.log(create_form, create_form.elements, create_form.elements.email, create_form.email.value);

// Access via FormData
const form_data = new FormData(create_form);
console.log(form_data);
console.log(...form_data);
for (const [key, val] of form_data.entries()) {
    console.log(`${key}: ${val}`)
}

// Convert to ajax request
create_form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // ---- CLIENT SIDE VALIDATION

    // HTML5 Validation

    const create_form = document.getElementById('create-account');
    const submit_btn = create_form.querySelector('button[type="submit"]');
    submit_btn.disabled = true;

    // JS Validation
    const form_data = new FormData(create_form);

    // intentionally build the data payload
    //  ...this is an opportunity to scrub and transform
    const data = {
        email: form_data.get('email'),
        password: form_data.get('password'),
        confirm_password: form_data.get('confirm-password'),
        is_terms: form_data.has('terms'),
        is_valid: true,
        errors: {}
    }

    // validate the input
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(data.email.toString())) {
        data.errors['email'] = 'Enter a valid email';
        data.is_valid = false;
    }

    if (data.password !== data.confirm_password) {
        data.errors['password'] = 'Passwords do not match';
        data.is_valid = false;
    }

    if (data.password.length < 5) {
        data.errors['password'] = 'Passwords must be at least 5 characters';
        data.is_valid = false;
    }

    if (!data.is_terms) {
        data.errors['terms'] = 'Required to proceed.';
        data.is_valid = false;
    }

    // reset existing errors
    create_form.querySelectorAll('span.error').forEach(el => el.classList.add('hidden'));

    if (!data.is_valid) {
        // provide feedback to the user

        // this is coupled with the HTML form structure
        for (const id in data.errors) {
            const error_el = document.getElementById(id)
                .closest('.field')
                .querySelector('.error');
            if (error_el) {
                error_el.innerText = data.errors[id];
                error_el.classList.remove('hidden');
            }
        }

        submit_btn.disabled = false;
        return;
    }

    // ---- FORM SUBMISSION (submit, server side validation, processing, result)

    // Either default action OR preventDefault and use JS to send
    const url = create_form.getAttribute('action');
    const method = create_form.getAttribute('method') ?? 'POST';
    const payload = JSON.stringify(data);

    fetch(url, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: payload
    })
        .then(response => response.json())
        .then(data => {
            console.log('success:', data)
            create_form.reset();
        })
        .catch(error => {
            // process the error
            console.log('error', error);
        })
        .finally(() => {
            // wrap up any loose ends
            submit_btn.disabled = false;
            console.log('finally');
        });
});

// Probably wrap this form handler into a class / component
// const create_form_component = new CreateAccountForm(on_success_callback, on_error_callback);
//
// function on_success_callback(data) {
//     console.log('Submit Success', data);
// }
//
// function on_error_callback(error) {
//     console.log('Submit Error', error);
}