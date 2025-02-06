import { AxiosError } from "axios";

import { api } from "@/api";
import { LoginData, RegisterData } from "@/interfaces/auth";

async function registerUser({ name, username, email, password }: RegisterData) {
    try {
        const res = await api.post("/auth/register", {
            name,
            username,
            email,
            password
        }, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function loginUser({ username, password }: LoginData) {
    try {
        const res = await api.post("/auth/login", {
            username,
            password
        }, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function getLoginStatus() {
    try {
        const res = await api.get("/auth/status", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function logoutUser() {
    try {
        const res = await api.get("/auth/logout", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}
export { registerUser, loginUser, getLoginStatus, logoutUser };