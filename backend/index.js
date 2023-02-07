import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import jwt from 'koa-jwt';
import serve from 'koa-static';
import mount from 'koa-mount';
import send from 'koa-send';
import compress from 'koa-compress';
import convert from 'koa-convert';

import { authRoutes } from './routes/auth/authRoutes.js';
// import { profileRoutes } from './routes/profileRoutes';
// import { todoRoutes } from './routes/todoRoutes';
// import { errorHandler } from './middlewares/errorHandler';
// import { notFoundHandler } from './middlewares/notFoundHandler';

dotenv.config();

const app = new Koa();
const router = new Router();

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// const staticPath = path.join(__dirname, '../frontend/build');

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProd,
});

app.context.pool = pool;

// app.use(errorHandler);

// app.use(notFoundHandler);

app.use(convert(cors()));

app.use(convert(helmet()));

app.use(convert(logger()));

app.use(convert(bodyParser()));

app.use(convert(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/api\/auth/] })));

app.use(convert(compress()));

app.use(convert(mount('/', authRoutes.routes())));

// app.use(convert(mount('/api/profile', profileRoutes.routes())));

// app.use(convert(mount('/api/todo', todoRoutes.routes())));

app.use(async (ctx, next) => {
    if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        await send(ctx, 'index.html', { root: staticPath });
    }
    await next();
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});
console.log('Server is running on port 3000');
app.listen(3000);