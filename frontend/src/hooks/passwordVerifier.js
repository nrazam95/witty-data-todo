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

    if (!value || /\s/.test(getFieldValue("password"))) {
      return Promise.reject("Password must not contain any spaces");
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

export const usernameVerifier = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("username").length < 6) {
        return Promise.reject("Username must be at least 6 characters long");
      }

      if (!value || getFieldValue("username").length > 30) {
        return Promise.reject("Username must be at most 20 characters long");
      }

      // should contain at least one lowercase letter
      // if (!value || !/[a-z]/.test(getFieldValue("username"))) {
      //   return Promise.reject(
      //     "Username must contain at least one lowercase letter"
      //   );
      // }

      // should contain at least one uppercase letter
      // if (!value || !/[A-Z]/.test(getFieldValue("username"))) {
      //   return Promise.reject(
      //     "Username must contain at least one uppercase letter"
      //   );
      // }

      // no leading or trailing spaces
      if (!value || /^\s/.test(getFieldValue("username"))) {
        return Promise.reject("Username must not start with a space");
      }

      // // should also contain at least one number
      // if (!value || !/[0-9]/.test(getFieldValue("username"))) {
      //   return Promise.reject("Username must contain at least one number");
      // }

      // should not contain any spaces
      if (!value || /\s/.test(getFieldValue("username"))) {
        return Promise.reject("Username must not contain any spaces");
      }

      return Promise.resolve();
    },
  });