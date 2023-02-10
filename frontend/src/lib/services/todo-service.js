import axios from "axios";
import authHeader from "../auth-header";
import { BACKEND_URL } from "../axios";

const API_URL = BACKEND_URL;

const getAllTodos = () => {
  return axios.get(API_URL + "/api/todos/all", { headers: authHeader() });
};

const getTodo = (id) => {
  return axios.get(API_URL + '/api/todos/' + id, { headers: authHeader() });
};

const getTodosByFilter = (filter) => {
  return axios.get(API_URL + '/api/todos/', { headers: authHeader(), params: filter });
};

const createTodo = (data) => {
  return axios.post(API_URL + '/api/todos/', data, { headers: authHeader() });
};

const updateTodo = (id, data) => {
  return axios.put(API_URL + '/api/todos/' +  id, data, { headers: authHeader() });
};

const deleteTodo = (id) => {
  return axios.delete(API_URL + '/api/todos/' + id, { headers: authHeader() });
};

const findShared = (data) => {
  return axios.get(API_URL + "/api/share/", { headers: authHeader(), params: data });
};

const updateIsPublic = (id, data) => {
  return axios.put(API_URL + "/api/todos/public/" + id, data, { headers: authHeader() });
};

const findPublicTodos = () => {
  return axios.get(API_URL + "/api/public-shared");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllTodos,
    getTodo,
    getTodosByFilter,
    createTodo,
    updateTodo,
    deleteTodo,
    findShared,
    updateIsPublic,
    findPublicTodos,
};