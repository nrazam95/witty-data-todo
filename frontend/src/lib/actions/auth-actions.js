import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";
import AuthService from "../services/auth-service";
import { notification } from "antd";

export const register = (username, password, confirmPassword) => async (dispatch) => {
    try {
        const response = await AuthService.register(username, password, confirmPassword);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { user: response.data.user, token: response.data.token },
        });

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        notification.open({
            message: response.data.message,
            description: 'Looks like you have successfully registered!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        return await Promise.resolve();
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
        });

        notification.open({
            message: error.response.data.message,
            description: 'Looks like you have failed to register!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        return await Promise.reject();
    }
};

export const login = (username, password) => async (dispatch) => {
    try {
        const response = await AuthService.login(username, password);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: response.data.user, token: response.data.token },
        });

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        notification.open({
            message: response.data.message,
            description: 'Looks like you have successfully logged in!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        return await Promise.resolve();
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        });

        notification.open({
            message: error.response.data.message,
            description: 'Looks like you have failed to log in!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        return await Promise.reject();
    }
};
  
export const logout = () => async (dispatch) => {
    try {
        const response = await AuthService.logout();
        dispatch({
            type: LOGOUT,
        });
        notification.open({
            message: response.data.message,
            description: 'Looks like you have successfully logged out!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return await Promise.resolve();
    } catch (error) {
        notification.open({
            message: error.response.data.message,
            description: 'Looks like you have failed to log out!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        return await Promise.reject();
    }
};