const app = require('./index');
const db = require('./database/db');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 3000;

/* Starting the database and then setting the pool to the app context. */
db.start().then((pool) => {
    pool.connect();
    app.context.pool = pool;
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});

/* This is the code that starts the server. */
(async () => {

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})();