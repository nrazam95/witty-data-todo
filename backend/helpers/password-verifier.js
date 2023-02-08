/**
 * It takes two strings, `password` and `confirmPassword`, and returns an object with a `status`
 * property that is `true` if the password is valid and `false` if it is not, and an `error` property
 * that is an empty string if the password is valid and a string describing the error if it is not
 * @param password - The password to be verified
 * @param confirmPassword - The password that the user entered in the confirm password field
 * @returns An object with a status and error property.
 */
const passwordVerifier = (password, confirmPassword) => {

    /* This is checking to see if the password or confirm password is undefined. If it is, it returns
    an object with a status of false and an error message. */
    if (password === undefined || confirmPassword === undefined) {
        return {
            status: false,
            error: 'Password or confirm password is undefined',
        }
    }

    /* This is checking to see if the password is less than 8 characters. If it is, it returns an
    object with a status of false and an error message. */
    if (password < 8) {
        return {
            status: false,
            error: 'Password must be at least 8 characters',
        }
    }

    /* This is checking to see if the password is greater than 40 characters. If it is, it returns an
    object with a status of false and an error message. */
    if (password > 40) {
        return {
            status: false,
            error: 'Password must be less than 40 characters',
        }
    }

    /* This is checking to see if the password contains at least one uppercase letter. If it does not,
    it returns an object with a status of false and an error message. */
    if (!password.match(/[A-Z]/g)) {
        return {
            status: false,
            error: 'Password must contain at least one uppercase letter',
        }
    }

    /* This is checking to see if the password contains at least one lowercase letter. If it does not,
        it returns an object with a status of false and an error message. */
    if (!password.match(/[a-z]/g)) {
        return {
            status: false,
            error: 'Password must contain at least one lowercase letter',
        }
    }

    /* This is checking to see if the password contains at least one number. If it does not, it returns
    an object with a status of false and an error message. */
    if (!password.match(/[0-9]/g)) {
        return {
            status: false,
            error: 'Password must contain at least one number',
        }
    }

    /* This is checking to see if the password contains at least one special character. If it does not,
    it returns an object with a status of false and an error message. */
    if (!password.match(/[,`~!@#$^*-_=\[\]{}|;:,./?]/g)) {
        return {
            status: false,
            error: 'Password must contain at least one special character',
        }
    }

    /* This is checking to see if the password and confirm password match. If they do not, it returns
    an object with a status of false and an error message. */
    if (password !== confirmPassword) {
        return {
            status: false,
            error: 'Passwords do not match',
        }
    }

    return {
        status: true,
        error: '',
    }
}

module.exports = {
    passwordVerifier,
};