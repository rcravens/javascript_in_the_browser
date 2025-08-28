export class CreateAccountForm {
    #create_form;
    #on_success_callback;
    #on_error_callback;

    constructor(on_success_callback, on_error_callback) {
        this.#create_form = document.getElementById('create-account');
        this.#on_success_callback = on_success_callback;
        this.#on_error_callback = on_error_callback;

        this.#init();
    }

    #init() {
        this.#create_form.addEventListener('submit', evt => this.#handle_submit(evt))
    }

    async #handle_submit(evt) {
        evt.preventDefault();   // Prevent default form submission (HTTP POST to action URL

        const submit_btn = this.#create_form.querySelector('button[type="submit"]');

        submit_btn.disabled = true;

        const data = this.#validate_data();

        create_form.querySelectorAll('span.error').forEach(el => el.classList.add('hidden'));
        if (!data.is_valid) {
            this.#show_validation_errors(data);

            submit_btn.disabled = false;
            return;
        }

        await this.#post_data(data);
        submit_btn.disabled = false;
    }

    #validate_data() {
        const form_data = new FormData(this.#create_form);

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

        return data;
    }

    #show_validation_errors(data) {
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
    }

    async #post_data(data) {
        return new Promise((resolve, reject) => {
            const url = this.#create_form.getAttribute('action');
            const method = this.#create_form.getAttribute('method') ?? 'POST';
            const payload = JSON.stringify(data);

            fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: payload
            })
                .then(response => response.json())
                .then(data => {
                    // clear the form data
                    this.#create_form.reset();

                    if (this.#on_success_callback) {
                        this.#on_success_callback(data);
                    }

                    resolve(data);
                })
                .catch(error => {

                    if (this.#on_error_callback) {
                        this.#on_error_callback(error);
                    }

                    reject(error);
                });
        });
    }
}