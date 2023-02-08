/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('todos', {
        id: 'id',
        todo: {
            type: 'varchar',
            notNull: true,
        },
        dueAt: {
            type: 'timestamp',
            notNull: false,
        },
        userId: {
            type: 'integer',
            notNull: true,
            references: 'users',
            onDelete: 'cascade',
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createIndex('todos', 'userId');
};

exports.down = pgm => {
    pgm.dropTable('todos');
};
