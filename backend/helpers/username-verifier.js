/**
 * It returns an object with a status of true if the username is valid, and an error message if it's
 * not
 * @param username - The username to verify
 * @returns An object with a status and error property.
 */
const usernameVerifier = (username) => {
    /* Checking if the username is less than 3 characters long. If it is, it returns an object with a
    status of false and an error message. */
    if (username.length < 3) {
        return { status: false, error: 'Username must be at least 3 characters long' };
    }

    /* It's checking if the username is more than 20 characters long. If it is, it returns an object
    with a status of false and an error message. */
    if (username.length > 20) {
        return { status: false, error: 'Username must be less than 20 characters long' };
    }

    if (!username || /^\s/.test(username)) {
        return { status: false, error: 'Username must not start with a space' };
    }

    if (!username || /\s/.test(username)) {
        return { status: false, error: 'Username must not contain any spaces' };
    }
    
    return { status: true, error: '' };
}

module.exports = {
    usernameVerifier,
}