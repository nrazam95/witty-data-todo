const todo = require('../models/todo-model-functions');

/* Destructuring the object returned by the `new todo()` function. */
const { 
    create: createTodo, 
    find: findTodo,
    findAllOwned: findAllOwnedTodos, 
    delete: deleteTodo, 
    update: updateTodo, 
    findTodoByIdAndUserId,
    findByFilter: findTodosByFilter,
    findOneShared: findShared,
} = new todo();

/**
 * It creates a new todo in the database
 * @param ctx - The context object that contains the request and response objects.
 */
const create = async (ctx) => {
    /* Creating a new todo in the database. */
    const { id } = ctx.state.user;
    const { body } = ctx.request;
    try {
        await createTodo(ctx.pool, {
            todo: body.todo,
            dueAt: body.dueAt,
            userId: id,
        });
        ctx.response.status = 201;
        ctx.response.body = {
            message: 'Todo created successfully',
        };
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
};

/**
 * It finds a todo by its id and returns it
 * @param ctx - The context object that contains the request and response objects.
 */
const find = async (ctx) => {
    /* A function that finds a todo by its id and returns it. */
    const { todoId } = ctx.params;
    try {
        const { rows } = await findTodo(ctx.pool, todoId);
        if (rows.length > 0) {
            ctx.response.status = 200;
            ctx.response.body = {
                message: 'Todo found',
                data: rows[0],
            };
        } else {
            throw new Error('Todo not found');
        }
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }
};

/**
 * It finds todos by filter
 * @param ctx - The context object that contains the request and response objects.
 */
const findByFilter = async (ctx) => {
    /* Destructuring the object returned by the `new todo()` function. */
    const { id } = ctx.state.user;
    const { query } = ctx.request;
    try {
        const { rows } = await findTodosByFilter(ctx.pool, {
            userId: id,
            dueAt: query.dueAt ?? null,
            todo: query.todo ?? null,
            page: query.page ?? 1,
            limit: query.limit ?? 10,
        });
            ctx.response.status = 200;
            ctx.response.body = {
                message: 'Todos found',
                data: {
                    todos: rows.map((row) => ({
                        ...row,
                        linkToShare: `${process.env.FRONTEND_URL}/share/${row.id}`,
                    })),
                    pagination: {
                        page: query.page || 1,
                        limit: query.limit || 10,
                        total: rows.length,
                    },
                }
            };
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }
};

/**
 * It finds all the todos owned by the user making the request
 * @param ctx - The context object that contains the request and response objects.
 */
const findAll = async (ctx) => {
    /* Finding all the todos owned by the user making the request. */
    const { id } = ctx.state.user;
    try {
        const { rows } = await findAllOwnedTodos(ctx.pool, id);
        ctx.response.status = 200;
        ctx.response.body = {
            message: 'Todos found',
            data: rows,
        };
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It deletes a todo from the database and returns a success message if the todo was deleted
 * successfully
 * @param ctx - The context object that contains the request and response objects.
 */
const remove = async (ctx) => {
    /* A function that deletes a todo from the database and returns a success message if the todo was
    deleted successfully. */
    const { todoId } = ctx.params;
    try {
        await deleteTodo(ctx.pool, todoId);
        ctx.response.status = 200;
        ctx.response.body = {
            message: 'Todo deleted successfully',
        };
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }
}

/**
 * It takes the todoId from the request params, the todo and dueAt from the request body, and then
 * updates the todo in the database
 * @param ctx - The context object that contains the request and response objects.
 */
const update = async (ctx) => {
    /* It takes the todoId from the request params, the todo and dueAt from the request body, and then
        updates the todo in the database */
    const { todoId } = ctx.params;
    const { body } = ctx.request;
    try {
        await updateTodo(ctx.pool, todoId, {
            todo: body.todo,
            dueAt: body.dueAt,
        });

        const updatedTodo = await findTodo(ctx.pool, todoId);
        ctx.response.status = 200;
        ctx.response.body = {
            message: 'Todo updated successfully',
            todo: {
                ...updatedTodo.rows[0],
                linkToShare: `${process.env.FRONTEND_URL}/share/${todoId}`,
            },
        };
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }
}

/**
 * If the user is the owner of the todo, then continue to the next middleware
 * @param ctx - The context object that contains the request and response objects.
 * @param next - The next middleware function in the chain.
 */
const isOwner = async (ctx, next) => {
    /* A middleware function that checks if the user is the owner of the todo. */
    const { id } = ctx.state.user;
    const { todoId } = ctx.params;
    try {
        const { rows } = await findTodoByIdAndUserId(ctx.pool, todoId, id);
        if (rows.length > 0) {
            await next();
        } else {
            throw new Error('You are not the owner of this todo');
        }
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }
}

const findOneShareTodo = async (ctx) => {
    const { todoId } = ctx.params;
    try {
        const { rows } = await findShared(ctx.pool, todoId);
        if (rows.length > 0) {
            ctx.response.status = 200;
            ctx.response.body = {
                message: 'Todo found',
                todo: {
                    id: rows[0].id,
                    todo: rows[0].todo,
                    dueAt: rows[0].dueAt,
                    createdAt: rows[0].createdAt,
                    user: {
                        id: rows[0]?.user?.id,
                        name: rows[0]?.user?.name,
                        username: rows[0]?.user?.username,
                        imageUrl: rows[0]?.user?.imageId ? `${process.env.BACKEND_URL}/api/my-profile/stream-profile-picture/${rows[0]?.user?.imageId}` : null,
                    },
                },
            };
        } else {
            throw new Error('Todo not found');
        }
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { error: err.message };
    }
};

module.exports = {
    create,
    find,
    findByFilter,
    findAll,
    remove,
    update,
    isOwner,
    findOneShareTodo,
};