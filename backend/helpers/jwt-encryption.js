var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

/**
 * It takes a payload, signs it with a secret, and returns a token
 * @param payload - The data you want to encrypt.
 * @returns A promise that resolves to a token.
 */
const encryptJWT = (payload) => {
    /* A promise that resolves to a token. */
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h',
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

/**
 * It takes a token, and returns a promise that resolves to the decoded token, or rejects with an error
 * @param token - The token to be decrypted
 * @returns A promise that resolves to the decoded token.
 */
const decryptJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    encryptJWT,
    decryptJWT,
};