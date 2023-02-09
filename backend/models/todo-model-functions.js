const db = require('../database/db');

/* Data Types - TODOS Table
    id SERIAL PRIMARY KEY,
    todo VARCHAR(255) NOT NULL,
    dueAt TIMESTAMP,
    userId INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
*/

/**
 * It's a function that returns an object with functions that perform CRUD operations on the todos
 * table
 * @returns A function that returns an object with methods that can be called.
 */
const todo = function () {
    /* It's a function that creates a new todo. */
    this.create = function (pool, data) {
        return db.query(pool, 'INSERT INTO todos (todo, "dueAt", "userId") VALUES ($1, $2, $3)', [data.todo, data.dueAt, data.userId]);
    };

    /* It's a function that finds a todo by id. */
    this.find = function (pool, id) {
        return db.query(pool, `SELECT id, todo, TO_CHAR("dueAt", 'DD-MM-YYYY HH24:MI:SS') AS "dueAt", TO_CHAR("createdAt", 'DD-MM-YYYY HH24:MI:SS') AS "createdAt", (SELECT json_build_object('id', users.id,'name', users.name,'username', users.username) FROM users WHERE users.id = todos."userId") AS "user" FROM todos WHERE id = $1`, [id]);
    };

    /* It's a function that finds all todos owned by a user. */
    this.findAllOwned = function (pool, userId) {
        return db.query(pool, `SELECT id, todo, TO_CHAR("dueAt", 'DD-MM-YYYY HH24:MI:SS') AS "dueAt", TO_CHAR("createdAt", 'DD-MM-YYYY HH24:MI:SS') AS "createdAt", (SELECT json_build_object('id', users.id,'name', users.name,'username', users.username) FROM users WHERE users.id = todos."userId") AS "user" FROM todos WHERE "userId" = $1`, [userId]);
    };

    /* It's a function that finds todos by filter. */
    this.findByFilter = function (pool, query) {
        console.log(query.todo);
        let { userId, dueAt, todo, page, limit } = query;
        let whereClause = '';
        let values = [];
        let offset = 0;
        let limitClause = '';
        if (userId) {
            whereClause += `"userId" = $${values.length + 1}`;
            values.push(userId);
        }

        if (dueAt) {
            if (whereClause) {
                whereClause += ' AND ';
            }
            whereClause += `To_CHAR("dueAt", 'DD-MM-YYYY') = $${values.length + 1}`;
            values.push(dueAt);
        }

        if (todo) {
            if (whereClause) {
                whereClause += ' AND ';
            }
            whereClause += `lower(todo) LIKE lower($${values.length + 1})`;
            values.push(`%${todo}%`);
        }

        if (page && limit) {
            offset = (page - 1) * limit;
            limitClause = `LIMIT ${limit} OFFSET ${offset}`;
        }

        if (whereClause) {
            whereClause = `WHERE ${whereClause}`;
        }

        // Creating subquery for nested user query
        // const subQuery = `SELECT * FROM todos ${whereClause} ${limitClause}`;
        // // Creating main query
        // const mainQuery = `SELECT * FROM todos AS todos LEFT JOIN users ON todos."userId" = users.id`;

        // Query nested User
        const mainQuery = `SELECT id, todo, TO_CHAR("dueAt", 'DD-MM-YYYY HH24:MI:SS') AS "dueAt", TO_CHAR("createdAt", 'DD-MM-YYYY HH24:MI:SS') AS "createdAt", (SELECT json_build_object('id', users.id,'name', users.name,'username', users.username) FROM users WHERE users.id = todos."userId") AS "user" FROM todos AS todos ${whereClause} ${limitClause}`;

        return db.query(pool, mainQuery, values);
    }

    /* It's a function that deletes a todo by id. */
    this.delete = function (pool, id) {
        return db.query(pool, 'DELETE FROM todos WHERE id = $1', [id]);
    };

    /* It's a function that updates a todo by id. */
    this.update = function (pool, id, data) {
        return db.query(pool, 'UPDATE todos SET todo = $1, "dueAt" = $2 WHERE id = $3', [data.todo, data.dueAt, id]);
    }

    this.findTodoByIdAndUserId = function (pool, id, userId) {
        return db.query(pool, 'SELECT * FROM todos WHERE id = $1 AND "userId" = $2', [id, userId]);
    }
}

module.exports = todo;