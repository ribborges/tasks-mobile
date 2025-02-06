import { AxiosError } from "axios";

import { api } from "@/api";
import { CategoryData } from "@/interfaces/category";

async function GetCategories(userId: string) {
    try {
        const res = await api.get("/categories", {
            withCredentials: true,
            params: {
                userId: userId
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function CreateCategory({
    name,
    color
}: CategoryData) {
    try {
        const res = await api.post("/category", {
            name,
            color
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

export { GetCategories, CreateCategory };