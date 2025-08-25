// TODO: JS goes here!
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
console.log(terms_el, terms_el.value);

console.log(document.forms['create-account']['email']);

const create_form = document.getElementById('create-account');
console.log(create_form, create_form.elements, create_form.elements.email.value, create_form.email.value);

// https://developer.mozilla.org/en-US/docs/Web/API/FormData
const form_data = new FormData(create_form);
console.log(...form_data);
for (const [key, val] of form_data.entries()) {
    console.log(`${key}: ${val}`)
}

create_form.addEventListener('submit', (evt) => {
    evt.preventDefault();   // Prevent default form submission (HTTP POST to action URL

    // ---- CLIENT SIDE VALIDATION

    // HTML5 Validation:
    // - types (https://www.w3schools.com/html/html_form_input_types.asp)
    // - attributes (https://www.w3schools.com/html/html_form_attributes.asp)

    const create_form = document.getElementById('create-account');
    const submit_btn = create_form.querySelector('button[type="submit"]');

    // disable the submit button
    submit_btn.disabled = true;

    // JS Simple Validation:
    //
    // intentionally build the data payload
    //  ...this is an opportunity to scrub and transform
    const form_data = new FormData(create_form);
    const data = {
        email: form_data.get('email'),
        password: form_data.get('password'),
        confirm_password: form_data.get('confirm-password'),
        is_terms: form_data.has('terms'),
        is_valid: true,
        errors: {}
    }

    // validate the input
    if (data.password !== data.confirm_password) {
        data.errors['password'] = 'Passwords do not match';
        data.is_valid = false;
    }

    if (!data.is_terms) {
        data.errors['terms'] = 'Required to proceed.';
        data.is_valid = false;
    }

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

    // INFO: JS Validation Libraries


    // ---- FORM SUBMISSION (includes SERVER-SIDE VALIDATION + PROCESSING)

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
            // clear the form data
            create_form.reset();

            // process the response
            console.log('Success:', data)

        })
        .catch(error => {
            // process the error
            console.log('Error:', error)
        })
        .finally(() => {
            submit_btn.disabled = false;
        });
});
