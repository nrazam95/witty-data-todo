export const passwordVerifier = ({ getFieldValue }) => ({
    validator(rule, value) {
    if (!value || getFieldValue('password').length < 8) {
        return Promise.reject('Password must be at least 8 characters!');
    }

    if (!value || getFieldValue('password').length > 40) {
        return Promise.reject('Password must be at most 40 characters!');
    }

    if (!value || !/[a-z]/.test(getFieldValue('password'))) {
        return Promise.reject('Password must contain at least one lowercase letter!');
    }

    if (!value || !/[A-Z]/.test(getFieldValue('password'))) {
        return Promise.reject('Password must contain at least one uppercase letter!');
    }

    if (!value || !/[0-9]/.test(getFieldValue('password'))) {
        return Promise.reject('Password must contain at least one number!');
    }

    // eslint-disable-next-line no-useless-escape
    if (!value || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(getFieldValue('password'))) {
        return Promise.reject('Password must contain at least one special character!');
    }

    return Promise.resolve();
    }
})

export const matchingPasswords = ({ getFieldValue }) => ({
    validator(rule, value) {
    if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
    }

    return Promise.reject('The two passwords that you entered do not match!');
    },
})