const user = require('../models/user-model-functions');
const fs = require('fs');
const stream = require('stream');
const mime = require('mime-types');
const { encryptPassword } = require('../helpers/password-encryption');

/* Creating a new instance of the user model. */
const {
    findOwned,
    updateImage,
    update,
} = new user();

/**
 * It takes the user's id from the JWT, finds the user in the database, and returns the user's
 * information
 * @param ctx - The context object that contains the request and response objects.
 */
const myProfile = async (ctx) => {
    /* A function that takes the user's id from the JWT, finds the user in the database, and returns
    the user's
     * information */
    const { id } = ctx.state.user;
    try {
        const { rows } = await findOwned(ctx.pool, id);
        if (rows.length > 0) {
            ctx.response.status = 200;
            ctx.response.body = {
                user: rows[0]
            }
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It updates the user's profile with the name provided in the request body
 * @param ctx - The context object that contains the request and response objects.
 */
const updateProfile = async (ctx) => {
    /* Updating the user's profile with the name provided in the request body */
    const { id } = ctx.state.user;
    const { name } = ctx.request.body;
    try {
        const { rows } = await update(ctx.pool, id, { name });
        if (rows.length > 0) {
            ctx.response.status = 200;
            ctx.response.body = {
                user: rows[0]
            }
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It takes the user's id from the JWT, the new password from the request body, encrypts the password,
 * and updates the user's password in the database
 * @param ctx - The context object that contains the request and response objects.
 */
const changePassword = async (ctx) => {
    /* Taking the user's id from the JWT, the new password from the request body, encrypts the
    password,
    and updates the user's password in the database */
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;
    try {
        const encryptedPassword = await encryptPassword(password);
        const { rows } = await update(ctx.pool, id, { encryptedPassword });
        if (rows.length > 0) {
            ctx.response.status = 200;
            ctx.response.body = {
                user: rows[0]
            }
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It updates the user's profile with the name provided in the request body
 * @param ctx - The context object that contains the request and response objects.
 */
const uploadProfilePicture = async (ctx) => {
    /* Updating the user's profile with the name provided in the request body */

    // Save the uploaded file to the uploads folder
    // const file = ctx.request.file;
    // Rename the file using crypto
    try {
        const { id } = ctx.state.user;
        await updateImage(ctx.pool, id, ctx.file.filename);
        
        ctx.response.status = 200;
        ctx.response.body = {
            message: 'Image uploaded successfully'
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It takes the id of the user from the url, finds the path of the profile picture, sets the mime type
 * of the response, and then streams the file to the client
 * @param ctx - The context object that contains the request and response objects.
 */
const streamProfilePicture = async (ctx) => {
    const { id } = ctx.params
    try {
        const path = `./uploads/${id}`;
        const mimeType = mime.lookup(path);
        ctx.response.set('Content-Type', mimeType);
        ctx.body = fs.createReadStream(path).pipe(stream.PassThrough());
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

module.exports = {
    myProfile,
    updateProfile,
    changePassword,
    uploadProfilePicture,
    streamProfilePicture,
}