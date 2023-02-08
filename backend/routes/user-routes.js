const userControllers = require('../controllers/user-controllers.js');
const authController = require('../controllers/auth-controllers.js');
const Router = require('koa-router');
const multer = require('@koa/multer');
const crypto = require('crypto');
const { koaBody } = require('koa-body');

var userRouter = new Router();

/* This is a multer middleware that is used to upload files to the server. */
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const newFileName = `${crypto.randomBytes(16).toString('hex')}${file.originalname}`;
            cb(null, newFileName);
        }
    })

});

/* A GET request to the route `/api/my-profile` that uses the `koaBody()` middleware, the
`authController.addIDatUserContext` middleware, and the `userControllers.myProfile` controller. */
userRouter.get('/api/my-profile', koaBody(), authController.addIDatUserContext, userControllers.myProfile);

/* This is a PUT request to the route `/api/my-profile` that uses the `koaBody()` middleware, the
`authController.addIDatUserContext` middleware, and the `userControllers.updateProfile` controller. */
userRouter.put('/api/my-profile', koaBody(), authController.addIDatUserContext, userControllers.updateProfile);

/* This is a PUT request to the route `/api/my-profile/change-password` that uses the `koaBody()`
middleware, the
`authController.addIDatUserContext` middleware, the `authController.passwordVerify` middleware, and
the `userControllers.changePassword` controller. */
userRouter.put('/api/my-profile/change-password', koaBody(), authController.addIDatUserContext, authController.passwordVerify, userControllers.changePassword);

/* This is a POST request to the route `/api/my-profile/upload-profile-picture` that uses the
`koaBody()` middleware, the `authController.addIDatUserContext` middleware, and the
`userControllers.uploadProfilePicture` controller. */
userRouter.post('/api/my-profile/upload-profile-picture', koaBody(), upload.single('files'), authController.addIDatUserContext, userControllers.uploadProfilePicture);

/* This is a GET request to the route `/api/user/stream-profile-picture/:id` that uses the `koaBody()`
middleware, and the `userControllers.streamProfilePicture` controller. */
userRouter.get('/api/my-profile/stream-profile-picture/:id', koaBody(), userControllers.streamProfilePicture);

module.exports = {
    routes () {
        return userRouter.routes();
    },
    allowedMethods () {
        return userRouter.allowedMethods();
    }
}