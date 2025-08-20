import axios from "axios";

export const getStarsVisibility = async (lat, lon) => {
    const response = await axios.get(`/api/stars/visibility`, {
        params: { lat, lon }
    });
    return response.data;
};

export const getLightPollution = async (lat, lon) => {
    const response = await axios.get(`/api/lightpollution`, {
        params: { lat, lon }
    });
    return response.data;
};

export const getPhotos = async (sido) => {
    const response = await axios.get(`/api/photos`, {
        params: { sido },
        withCredentials: true
    });
    console.log(response.data);
    return response.data;
};

export const getDeviceList = async () => {
    const response = await axios.get(`/api/cameras/models`);
    return response.data;
};


export const getCameraSetting = async (model_id) => {
    const response = await axios.get(`/api/cameras/models/${model_id}`);
    return response.data;
};

export const getAccountData = async () => {
    const response = await axios.get(`/api/user/me`);
    return response.data;
};


export const postLogout = async () => {
    const response = await axios.post(`/api/user/logout`);
    return response.data;
};