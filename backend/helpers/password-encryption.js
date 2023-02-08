var bcrypt = require('bcryptjs');

/**
 * It takes a password, generates a salt, and then hashes the password with the salt
 * @param password - The password to be encrypted.
 * @returns A promise that resolves to a hash of the password.
 */
const encryptPassword = (password) => {
    /* Creating a promise that will resolve to a hash of the password. */
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

/**
 * It takes a password and a hash, and returns a promise that resolves to true if the password matches
 * the hash, and false otherwise
 * @param password - The password to be compared.
 * @param hash - The hash that was generated by bcrypt.hash()
 * @returns A promise that resolves to a boolean value.
 */
const comparePassword = (password, hash) => {
    /* Returning a promise that resolves to a boolean value. */
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

module.exports = {
    encryptPassword,
    comparePassword,
};

