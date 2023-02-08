const app = require('./index');
const db = require('./database/db');

const port = process.env.PORT || 3000;

/* Starting the database and then setting the pool to the app context. */
db.start().then((pool) => {
    app.context.pool = pool;
}).catch((err) => {
    console.log(err);
});

/* This is the code that starts the server. */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});