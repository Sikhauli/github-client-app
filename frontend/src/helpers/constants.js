// icons imports
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


export const USER_ENDPOINTS = {
    get: "users/",
    numUserTypes: "users/num-user-types",
    update: "/users/",
    delete: "/users/",
    add: "/users/add",
    branchUsers: "/users/branch-users",
};


export const getAxiosError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return error.request.data;
    } else {
        console.error(error);
        return "Internal error occured!";
        // return error.message;
    }
};
