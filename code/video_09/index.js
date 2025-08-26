// TODO: JS goes here!
console.clear();
console.log('Module: Data and Networking');
console.log('Video: Fetch API Basics');

/*
	•	fetch() syntax (GET requests)
	•	Parsing JSON responses (.json())
	•	Handling network errors with catch
	•	Chaining promises vs async/await
 */

// ---- fetch with no errors
const url_good = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url_good)
    .then(response => response.json())
    .then(json => console.log('url_good', json))


// ---- fetch with 404 error
const url_bad = 'https://jsonplaceholder.typicode.com/todos/999999';
fetch(url_bad)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('resource not found (404)');
            } else {
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
        }
        return response.json();
    })
    .then(json => console.log('url_bad', json))
    .catch(error => console.log('url_bad', error));

// ---- fetch using async/await
//  can make async behave like sync
async function get_user_with_posts(user_id) {
    const user_response = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
    if (user_response.ok) {
        const user = await user_response.json();
        console.log('await - user', user);
        user.posts = [];

        const user_posts_response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
        if (user_posts_response.ok) {
            user.posts = await user_posts_response.json();
            console.log('await - user.posts', user.posts);
        }

        return user;
    }

    return null;
}

const user = await get_user_with_posts(1);
console.log(user);


