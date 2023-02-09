import {
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAIL,
    UPDATE_MY_PROFILE_SUCCESS,
    UPDATE_MY_PROFILE_FAIL,
    UPDATE_MY_PASSWORD_SUCCESS,
    UPDATE_MY_PASSWORD_FAIL,
    UPDATE_MY_PROFILE_PICTURE_SUCCESS,
    UPDATE_MY_PROFILE_PICTURE_FAIL,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = user ? { myProfile: user, token } : { myProfile: null, token: null };

export default function myProfile(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: payload.user,
            };
        case GET_MY_PROFILE_FAIL:
            return {
                ...state,
            };
        case UPDATE_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: payload.user,
                token: payload.token,
            };
        case UPDATE_MY_PROFILE_FAIL:
            return {
                ...state,
            };
        case UPDATE_MY_PASSWORD_SUCCESS:
            return {
                ...state,
                myProfile: payload.user,
            };
        case UPDATE_MY_PASSWORD_FAIL:
            return {
                ...state,
            };
        case UPDATE_MY_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                myProfile: payload.user,
            };
        case UPDATE_MY_PROFILE_PICTURE_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}