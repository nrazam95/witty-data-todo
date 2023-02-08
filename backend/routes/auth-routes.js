var authController = require('../controllers/auth-controllers'); 
var Router = require('koa-router');
var { koaBody } = require('koa-body');
var authRouter = new Router();

/* Creating a route for the signin page. */
/* This is a route for the signin page. It is using the koaBody() middleware to parse the body of the
request. It is then calling the signIn function in the authController. */
authRouter.post('/api/auth/signin', koaBody(), authController.signIn);

/* Creating a route for the signup page. */
/* This is a route for the signup page. It is using the koaBody() middleware to parse the body of the
request. It is then calling the passwordVerify, usernameVerify, and signUp functions in the
authController. */
authRouter.post('/api/auth/signup', koaBody(), authController.passwordVerify, authController.usernameVerify, authController.signUp);

/* This is a route for the signout page. */
authRouter.post('/api/auth/signout', koaBody(), authController.signOut);

module.exports = {
    routes () {
        return authRouter.routes();
    },
    allowedMethods () {
        return authRouter.allowedMethods();
    }
}