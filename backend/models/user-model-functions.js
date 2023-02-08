const db = require('../database/db');

/** Data Types USERS Table
 * id SERIAL PRIMARY KEY,
 * name VARCHAR(255) NOT NULL,
 * username VARCHAR(255) NOT NULL,
 * encryptedPassword VARCHAR(255) NOT NULL,
 * imageId VARCHAR(255),
 * createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
 */

/**
 * @returns The function is being returned.
 */
const user = function () {
    /* Creating a new user. */
    this.createUser = function (pool, data) {
        return db.query(pool, 'INSERT INTO users (name, username, "encryptedPassword") VALUES ($1, $2, $3)', [data.name, data.username, data.encryptedPassword]);
    }

    /* A function that is being returned. */
    this.getUserByUsername = function (pool, username) {
        return db.query(pool, 'SELECT * FROM users WHERE username = $1', [username]);
    }

    /* A function that is being returned. */
    this.find = function (pool, id) {
        return db.query(pool, 'SELECT * FROM users WHERE id = $1', [id]);
    }

    /* Returning the user that is being found. */
    this.findOwned = function (pool, id) {
        return db.query(pool, 'SELECT * FROM users WHERE id = $1', [id]);
    }

    /* Returning all the users. */
    this.findAll = function (pool) {
        return db.query(pool, 'SELECT * FROM users');
    }

    /* Updating the user. */
    this.update = function (pool, id, data) {
        return db.query(pool, 'UPDATE users SET name = $1, username = $2, "encryptedPassword" = $3 WHERE id = $4', [data.name, data.username, data.encryptedPassword, id]);
    }

    /* Deleting the user. */
    this.delete = function (pool, id) {
        return db.query(pool, 'DELETE FROM users WHERE id = $1', [id]);
    }

    /* Updating the image. */
    this.updateImage = function (pool, id, imageId) {
        return db.query(pool, 'UPDATE users SET "imageId" = $1 WHERE id = $2', [imageId, id]);
    }
}

module.exports = user;