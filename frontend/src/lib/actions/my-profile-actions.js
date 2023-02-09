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
import MyProfileService from "../services/my-profile-service";
import { notification } from "antd";

export const getMyProfile = () => (dispatch) => {
    return MyProfileService.getMyProfile().then(
        (response) => {
            dispatch({
                type: GET_MY_PROFILE_SUCCESS,
                payload: { user: response.data.user },
            });
            return Promise.resolve();
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            dispatch({
                type: GET_MY_PROFILE_FAIL,
            });
            return Promise.reject();
        }
    );
}

export const updateMyProfile = (user) => (dispatch) => {
    return MyProfileService.updateMyProfile(user).then(
        (response) => {
            dispatch({
                type: UPDATE_MY_PROFILE_SUCCESS,
                payload: { user: response.data.user, token: response.data.token },
            });
            notification.open({
                message: 'Profile Updated',
                description: 'Looks like you have successfully updated your profile!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return Promise.resolve();
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            dispatch({
                type: UPDATE_MY_PROFILE_FAIL,
            });
            notification.open({
                message: 'Profile Update Failed',
                description: 'Looks like you have failed to update your profile!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return Promise.reject();
        }
    );
}

export const updateMyPassword = (data) => (dispatch) => {
    return MyProfileService.changePassword(data).then(
        (response) => {
            dispatch({
                type: UPDATE_MY_PASSWORD_SUCCESS,
                payload: { user: response.data.user },
            });
            notification.open({
                message: 'Password Updated',
                description: 'Looks like you have successfully updated your password!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return Promise.resolve();
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            dispatch({
                type: UPDATE_MY_PASSWORD_FAIL,
            });
            notification.open({
                message: 'Password Update Failed',
                description: 'Looks like you have failed to update your password!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return Promise.reject();
        }
    );
}

export const updateMyProfilePicture = (profilePicture) => (dispatch) => {
    return MyProfileService.uploadProfilePicture(profilePicture).then(
        (response) => {
            dispatch({
                type: UPDATE_MY_PROFILE_PICTURE_SUCCESS,
                payload: { user: response.data.user },
            });

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            
            notification.open({
                message: 'Profile Picture Updated',
                description: 'Looks like you have successfully updated your profile picture!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return Promise.resolve();
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            dispatch({
                type: UPDATE_MY_PROFILE_PICTURE_FAIL,
            });
            notification.open({
                message: 'Profile Picture Update Failed',
                description: 'Looks like you have failed to update your profile picture!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return Promise.reject();
        }
    );
}