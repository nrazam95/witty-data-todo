var Koa = require('koa');
var cors = require('@koa/cors');
var helmet = require('koa-helmet');
var logger = require('koa-logger');
var pg = require('pg');
var dotenv = require('dotenv');
var jwt = require('koa-jwt');
var mount = require('koa-mount');
var compress = require('koa-compress');
var convert = require('koa-convert');

var authRouter = require('./routes/auth-routes');
var userRouter = require('./routes/user-routes');
var todoRouter = require('./routes/todo-routes');

dotenv.config();

const app = new Koa();

/* Allowing cross-origin resource sharing. */
app.use(convert(cors()));

/* Helmet is a collection of 12 smaller middleware functions that set HTTP response headers. */
app.use(convert(helmet()));

/* Logging the request and response. */
app.use(convert(logger()));

/* This is a middleware that checks for a valid JWT token in the request header. If the token is valid,
the request is allowed to proceed. If the token is invalid, the request is rejected. */
app.use(convert(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [
    /^\/api\/auth/,
    /^\/api\/my-profile\/stream-profile-picture/,
    /^\/api\/public/,
] })));

/* Compressing the response body. */
app.use(convert(compress()));

/* Mounting the authRouter at the root path. */
app.use(convert(mount('/', authRouter.routes())));

/* Mounting the userRouter at the root path. */
app.use(convert(mount('/', userRouter.routes())));

/* Mounting the todoRouter at the root path. */
app.use(convert(mount('/', todoRouter.routes())));

module.exports = app;