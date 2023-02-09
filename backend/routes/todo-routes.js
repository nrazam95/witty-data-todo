const todoControllers = require('../controllers/todo-controllers');
const authController = require('../controllers/auth-controllers.js');
const { koaBody } = require('koa-body');
const Router = require('koa-router');

const todoRouter = new Router();

todoRouter.get('/api/todos/all', koaBody(), authController.addIDatUserContext, todoControllers.findAll);
todoRouter.get('/api/todos/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.find);
todoRouter.get('/api/todos', koaBody(), authController.addIDatUserContext, todoControllers.findByFilter);
todoRouter.post('/api/todos', koaBody(), authController.addIDatUserContext, todoControllers.create);
todoRouter.put('/api/todos/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.isOwner, todoControllers.update);
todoRouter.delete('/api/todos/:todoId', koaBody(), authController.addIDatUserContext, todoControllers.isOwner, todoControllers.remove);
todoRouter.get('/api/todos/share/:todoId', koaBody(), todoControllers.findOneShareTodo);

module.exports = {
    routes () {
        return todoRouter.routes();
    },
    allowedMethods () {
        return todoRouter.allowedMethods();
    }
};