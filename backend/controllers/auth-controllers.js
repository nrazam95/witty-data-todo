const { passwordVerifier } = require('../helpers/password-verifier');
const { encryptPassword, comparePassword } = require('../helpers/password-encryption');
const { usernameVerifier } = require('../helpers/username-verifier');
const { generateNameFromUsername } = require('../helpers/generate-name-from-username');
const { encryptJWT } = require('../helpers/jwt-encryption');

const user = require('../models/user-model-functions');

/* It's destructuring the user object and assigning it to the user functions. */
const {
    createUser,
    getUserByUsername,
} = new user();

/**
 * It checks if the password and confirmPassword fields in the request body are equal, and if they are
 * not, it returns a 400 status code with an error message
 * @param ctx - The context of the request.
 * @param next - The next middleware function in the chain.
 * @returns status: boolean
 *     error: string
 */
const passwordVerify = async (ctx, next) => {
    /* Checking if the password and confirmPassword fields in the request body are equal, and if they
    are
     * not, it returns a 400 status code with an error message */
    try {
        const { password, confirmPassword } = ctx.request.body;

        const { status, error } = passwordVerifier(password, confirmPassword);
        if (!status) {
            ctx.response.status = 400;
            ctx.response.body = { error: error };
            return;
        }
        await next();
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It checks if the username is valid and if it's already taken
 * @param ctx - The context of the request.
 * @param next - The next middleware function in the chain.
 */
const usernameVerify = async (ctx, next) => {
    /* Checking if the username is valid and if it's already taken */
    try {
        const { username } = ctx.request.body;
        const { status, error } = usernameVerifier(username);

        if (!status) {
            throw new Error(error);
        }

        const { rows } = await getUserByUsername(ctx.pool, username);
        if (rows.length > 0) {
            throw new Error('Username already exists');
        }
        await next();
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It takes the username, password, and name from the request body, encrypts the password, and then
 * creates a user with the username, name, and encrypted password
 * @param ctx - The context object that contains the request and response objects.
 */
const signUp = async (ctx) => {
    /* Taking the username, password, and name from the request body, encrypting the password, and then
    creating a user with the username, name, and encrypted password. */
    const { username, password } = ctx.request.body;
    try {
        const encryptedPassword = await encryptPassword(password);
        const name = generateNameFromUsername(username);
        await createUser(ctx.pool, { username, name: name, encryptedPassword });
        
        const newUser = await getUserByUsername(ctx.pool, username);

        const token = await encryptJWT({ username: user.username });
        ctx.response.status = 200;
        ctx.response.body = { message: 'User created', token: token, user: {
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            name: newUser.rows[0].name,
        }};
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It adds the user's id to the context object
 * @param ctx - The context of the request.
 * @param next - The next middleware function in the chain.
 */
const addIDatUserContext = async (ctx, next) => {
    /* Adding the user's id to the context object */
    try {
        const { username } = ctx.state.user;
        const { rows } = await getUserByUsername(ctx.pool, username);
        if (rows.length > 0) {
            ctx.state.user.id = rows[0].id;
            await next();
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It takes in a username and password from the request body, checks if the user exists in the
 * database, and if so, compares the password with the encrypted password in the database. If the
 * password matches, it creates a JWT token and sends it back to the user
 * @param ctx - The context object that contains the request and response objects.
 */
const signIn = async (ctx) => {
    /* Taking in a username and password from the request body, checking if the user exists in the
    database, and if so, comparing the password with the encrypted password in the database. If the
    password matches, it creates a JWT token and sends it back to the user. */
    const { username, password } = ctx.request.body;
    try {
        const { rows } = await getUserByUsername(ctx.pool, username);
        if (rows.length === 0) {
            throw new Error('User does not exist');
        }
        const user = rows[0];
        const res = await comparePassword(password, user.encryptedPassword);
        if (!res) {
            throw new Error(error);
        }

        const token = await encryptJWT({ username: user.username });
        const newUser = await getUserByUsername(ctx.pool, username);

        ctx.response.status = 200;
        ctx.response.body = { message: 'User logged in', token: token, user: {
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            name: newUser.rows[0].name,
        }};
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
};

/**
 * It sets the response status to 200, and sets the response body to a message and a null token
 * @param ctx - The context object that contains the request and response objects.
 */
const signOut = async (ctx) => {
    /* Setting the response status to 200, and setting the response body to a message and a null token. */
    try {
        ctx.response.status = 200;
        ctx.response.body = { message: 'User logged out', token: null };
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

module.exports = {
    passwordVerify,
    usernameVerify,
    addIDatUserContext,
    signUp,
    signOut,
    signIn,
};