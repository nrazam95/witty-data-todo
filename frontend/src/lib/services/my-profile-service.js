import axios from "axios";
import authHeader from "../auth-header";
import { BACKEND_URL } from "../axios";

const API_URL = `${BACKEND_URL}/api/my-profile/`;

const getMyProfile = () => {
    return axios.get(API_URL, { headers: authHeader() });
}

const updateMyProfile = (data) => {
    return axios.put(API_URL, data, { headers: authHeader() });
}

const changePassword = (data) => {
    return axios.put(API_URL + "change-password", data, { headers: authHeader() });
}

const uploadProfilePicture = (data) => {
    return axios.post(API_URL + "upload-profile-picture", data, { headers: authHeader() });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getMyProfile,
    updateMyProfile,
    changePassword,
    uploadProfilePicture,
};
