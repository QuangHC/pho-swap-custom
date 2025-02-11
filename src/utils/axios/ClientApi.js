import axiosClient from "~/utils/axios/AxiosClient.jsx";

const ClientApi = {
    USER: {
        login: async (data) => {
            const url = "/login";
            return axiosClient.post(url, data);
        },
        register: async (data) => {
            const url = "/register";
            return axiosClient.post(url, data);
        }
    },
};

export default ClientApi;
