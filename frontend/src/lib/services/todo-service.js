import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:3000/api/todos/";

const getAllTodos = () => {
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const getTodo = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const getTodosByFilter = (filter) => {
  return axios.get(API_URL, { headers: authHeader(), params: filter });
};

const createTodo = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const updateTodo = (id, data) => {
  return axios.put(API_URL + id, data, { headers: authHeader() });
};

const deleteTodo = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllTodos,
    getTodo,
    getTodosByFilter,
    createTodo,
    updateTodo,
    deleteTodo,
};