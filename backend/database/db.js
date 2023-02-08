const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/**
 * It creates a new connection pool to the database
 * @returns A new instance of the pg.Pool class.
 */
const start = async () => {
    const pool = new pg.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    return pool;
}

/**
 * It closes the connection to the database
 * @param pool - The pool object that was created by the createPool function.
 */
const close = async (pool) => {
    await pool.end();
}

/**
 * It takes a connection pool, a query string, and an array of parameters, and returns a promise that
 * resolves to the result of the query
 * @param pool - The connection pool object.
 * @param text - This is the SQL query you want to run.
 * @param params - This is an array of values that will be passed into the query.
 * @returns The query function is returning the result of the query.
 */
const query = async (pool, text, params) => {
    return pool.query(text, params);
}

module.exports = {
    start,
    close,
    query,
};