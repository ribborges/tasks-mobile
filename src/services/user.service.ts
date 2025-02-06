import { AxiosError } from "axios";

import { api } from "@/api";

async function getLoggedUser() {
    try {
        const res = await api.get("/user", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function UpdateUser(userId: string, data: {
    username?: string,
    name?: string,
    profilePic?: string,
}) {
    try {
        const res = await api.patch(`/user/${userId}`, data, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function ChangePassword(userId: string, password: {
    password: string,
    newPassword: string,
}) {
    try {
        const res = await api.patch(`/password/${userId}`, password, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

export { getLoggedUser, UpdateUser, ChangePassword };