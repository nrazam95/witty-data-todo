import {
    GET_ALL_TODOS_SUCCESS,
    GET_ALL_TODOS_FAIL,
    GET_TODO_SUCCESS,
    GET_TODO_FAIL,
    CREATE_TODO_SUCCESS,
    CREATE_TODO_FAIL,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAIL,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAIL,
    GET_SHARED_TODO_SUCCESS,
    GET_SHARED_TODO_FAIL,
    DELETE_SHARED_TODO_SUCCESS,
    UPDATE_PUBLICITY_SUCCESS,
    UPDATE_PUBLICITY_FAIL,
    GET_PUBLIC_TODOS_SUCCESS,
    GET_PUBLIC_TODOS_FAIL,
} from "../actions/types";
import TodoService from "../services/todo-service";
import { notification, message } from "antd";

export const getTodosByFilter = (data) => async (dispatch) => {
    try {
        const response = await TodoService.getTodosByFilter({
            page: data?.page,
            limit: data?.limit,
            todo: data?.todo,
        });
        dispatch({
            type: GET_ALL_TODOS_SUCCESS,
            payload: {
                todos: response.data.data.todos,
                pagination: response.data.data.pagination,
            },
        });
        return new Promise.resolve();
    } catch (error) {
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: GET_ALL_TODOS_FAIL,
        });
        return new Promise.reject();
    }
}

export const getTodo = (id) => async (dispatch) => {
    try {
        const response = await TodoService.getTodo(id);
        dispatch({
            type: GET_TODO_SUCCESS,
            payload: response.data,
        });
        return new Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: GET_TODO_FAIL,
        });
        return new Promise.reject();
    }
}

export const createTodo = (todo) => async (dispatch) => {
    try {
        const response = await TodoService.createTodo(todo);
        dispatch({
            type: CREATE_TODO_SUCCESS,
            payload: response.data.todo,
        });
        notification.success({
            message: "Todo created successfully!",
        });
        return new Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: CREATE_TODO_FAIL,
        });
        notification.error({
            message: "Error creating todo!",
        });
        return new Promise.reject();
    }
}

export const updateTodo = (id, todo) => async (dispatch) => {
    try {
        const response = await TodoService.updateTodo(id, todo);
        dispatch({
            type: UPDATE_TODO_SUCCESS,
            payload: response.data.todo,
        });
        notification.success({
            message: "Todo updated successfully!",
        });
        return new Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: UPDATE_TODO_FAIL,
        });
        notification.error({
            message: "Error updating todo!",
        });
        return new Promise.reject();
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    try {
        await TodoService.deleteTodo(id);
        dispatch({
            type: DELETE_TODO_SUCCESS,
            payload: id,
        });
        notification.success({
            message: "Todo deleted successfully!",
        });
        return new Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: DELETE_TODO_FAIL,
        });
        notification.error({
            message: "Error deleting todo!",
        });
        return new Promise.reject();
    }
}

export const getSharedTodo = (data) => async (dispatch) => {
    try {
        const response = await TodoService.findShared(data);
        dispatch({
            type: GET_SHARED_TODO_SUCCESS,
            payload: {
                todo: response.data.todo,
            },
        });
        return await Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: GET_SHARED_TODO_FAIL,
        });
        message.error("Either the todo does not exist or you do not have access to it.");
        return await Promise.reject();
    }
}

export const deleteSharedTodoAfterView = () => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SHARED_TODO_SUCCESS,
            payload: {
                todo: {}
            }
        });
        return await Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        return await Promise.reject();
    }
}

export const updatePublicity = (id, publicity) => async (dispatch) => {
    try {
        const response = await TodoService.updateIsPublic(id, publicity);
        dispatch({
            type: UPDATE_PUBLICITY_SUCCESS,
            payload: response.data.todo,
        });
        notification.success({
            message: "Todo updated successfully!",
        });
        return new Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: UPDATE_PUBLICITY_FAIL,
        });
        notification.error({
            message: "Error updating todo!",
        });
        return new Promise.reject();
    }
}

export const getPublicTodos = (data) => async (dispatch) => {
    try {
        const response = await TodoService.findPublicTodos({
            page: data?.page,
            limit: data?.limit,
        });
        dispatch({
            type: GET_PUBLIC_TODOS_SUCCESS,
            payload: {
                todos: response.data.data.todos,
                pagination: response.data.data.pagination,
            },
        });
        return new Promise.resolve();
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: GET_PUBLIC_TODOS_FAIL,
        });
        return new Promise.reject();
    }
}
