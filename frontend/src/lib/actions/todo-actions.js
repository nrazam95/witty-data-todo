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
} from "../actions/types";
import TodoService from "../services/todo-service";
import { notification } from "antd";

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
    } catch (error) {
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: GET_ALL_TODOS_FAIL,
        });
    }
}

export const getTodo = (id) => async (dispatch) => {
    try {
        const response = await TodoService.getTodo(id);
        dispatch({
            type: GET_TODO_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        dispatch({
            type: GET_TODO_FAIL,
        });
    }
}

export const createTodo = (todo) => async (dispatch) => {
    try {
        await TodoService.createTodo(todo);
        dispatch({
            type: CREATE_TODO_SUCCESS,
        });
        notification.success({
            message: "Todo created successfully!",
        });
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
    }
}

export const updateTodo = (todo) => async (dispatch) => {
    try {
        const response = await TodoService.updateTodo(todo);
        dispatch({
            type: UPDATE_TODO_SUCCESS,
            payload: response.data,
        });
        notification.success({
            message: "Todo updated successfully!",
        });
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
    }
}
