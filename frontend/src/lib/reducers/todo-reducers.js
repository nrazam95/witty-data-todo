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
} from "../actions/types";

const initialState = {
    todoShared: {},
    todos: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
    },
};

export default function todos(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_TODOS_SUCCESS:
            return {
                ...state,
                todos: payload.todos.map((todo) => ({
                    id: todo?.id,
                    todo: todo?.todo,
                    dueAt: todo?.dueAt,
                    createdBy: todo?.user?.name,
                    createdAt: todo?.createdAt,
                    linkToShare: todo?.linkToShare,
                })),
                pagination: payload.pagination,
            };
        case GET_ALL_TODOS_FAIL:
            return {
                ...state,
            };
        case GET_TODO_SUCCESS:
            return {
                ...state,
                todos: payload.todos,
            };
        case GET_TODO_FAIL:
            return {
                ...state,
            };
        case CREATE_TODO_SUCCESS:
            return {
                ...state,
            };
        case CREATE_TODO_FAIL:
            return {
                ...state,
            };
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === payload.id) {
                        return {
                            ...todo,
                            todo: payload.todo,
                            dueAt: payload.dueAt,
                        }
                    }
                    return todo;
                }),
            };
        case UPDATE_TODO_FAIL:
            return {
                ...state,
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== payload),
            };
        case DELETE_TODO_FAIL:
            return {
                ...state,
            };
        case GET_SHARED_TODO_SUCCESS:
            return {
                ...state,
                todoShared: payload.todo,
            };
        case GET_SHARED_TODO_FAIL:
            return {
                ...state,
            };
        case DELETE_SHARED_TODO_SUCCESS:
            return {
                ...state,
                todoShared: {},
            };
        default:
            return state;
    }
}