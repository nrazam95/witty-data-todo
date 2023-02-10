const todoControllers = require('../controllers/todo-controllers');
const authController = require('../controllers/auth-controllers.js');
const { koaBody } = require('koa-body');
const Router = require('koa-router');

const todoRouter = new Router();

todoRouter.get('/api/todos/all', koaBody(), authController.addIDatUserContext, todoControllers.findAll);
todoRouter.get('/api/todos/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.find);
todoRouter.get('/api/todos', koaBody(), authController.addIDatUserContext, todoControllers.findByFilter);
todoRouter.get('/api/share/', koaBody(), authController.addIDatUserContext, todoControllers.findOneShareTodo);
todoRouter.get('/api/public-shared', koaBody(), todoControllers.findPublicTodos);
todoRouter.post('/api/todos', koaBody(), authController.addIDatUserContext, todoControllers.create);
todoRouter.put('/api/todos/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.isOwner, todoControllers.update);
todoRouter.delete('/api/todos/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.isOwner, todoControllers.remove);
todoRouter.put('/api/todos/public/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.isOwner, todoControllers.updatePublicity);

module.exports = {
    routes () {
        return todoRouter.routes();
    },
    allowedMethods () {
        return todoRouter.allowedMethods();
    }
};