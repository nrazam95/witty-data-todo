import axios from "axios";
import { BACKEND_URL } from "../axios";

const API_URL = `${BACKEND_URL}/api/auth/`;

const register = async (username, password, confirmPassword) => {
    return axios.post(API_URL + "signup", {
        username,
        password,
        confirmPassword
    });
};

const login = async (username, password) => {
    return await axios
        .post(API_URL + "signin", {
            username,
            password,
        });
};

const logout = async () => {
    return await axios.post(API_URL + "signout");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
};