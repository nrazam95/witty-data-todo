/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        name: {
            type: 'varchar',
            notNull: true,
        },
        username: {
            type: 'varchar',
            notNull: false,
        },
        encryptedPassword: {
            type: 'varchar',
            notNull: true,
        },
        imageId: {
            type: 'varchar',
            notNull: false,
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('users');
};
