// src/store/authStore.js
import { create } from "zustand";
import ClientApi from "~/utils/axios/ClientApi.js";

const useAuthStore = create((set) => ({
    jwt: localStorage.getItem("jwtToken") || null,
    isAuthenticated: !!localStorage.getItem("jwtToken"),
    user: localStorage.getItem("userInf") || null,

    login: async (data) => {
        try {
            const response = await ClientApi.USER.login(data);
            const token = response.jwt;
            const user = response.user;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userInf", response.user);
            set({ jwt: token, isAuthenticated: true, user: user });
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userInf");
        set({ token: null, isAuthenticated: false, user: null });
    },

    getUser: async (data) => {
        try {
            const response = await ClientApi.USER.getUser(data);
            return response;
        } catch (error) {
            console.error("Get user Failed", error);
            throw error;
        }
    }
}));

export default useAuthStore;
