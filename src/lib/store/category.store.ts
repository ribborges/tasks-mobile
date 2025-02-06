import { create } from "zustand";

import { CategorySchema } from "@/types/category";

type State = {
    categories: CategorySchema[];
}

type Actions = {
    setCategories: (categories: CategorySchema[]) => void;
    getCategory: (id: string) => CategorySchema | undefined;
    addCategory: (category: CategorySchema) => void;
    removeCategory: (id: string) => void;
    updateCategory: (id: string, category: CategorySchema) => void;
}

const useCategoryStore = create<State & Actions>((set) => ({
    categories: [],
    setCategories: (categories: CategorySchema[]) => {
        set({ categories });
    },
    getCategory: (id: string): CategorySchema | undefined => {
        return useCategoryStore.getState().categories.find((category) => category.id === id);
    },
    addCategory: (category: CategorySchema) => {
        set((state) => ({
            categories: [...state.categories, category]
        }));
    },
    removeCategory: (id: string) => {
        set((state) => ({
            categories: state.categories.filter((category) => category.id !== id)
        }));
    },
    updateCategory: (id: string, category: CategorySchema) => {
        set((state) => ({
            categories: state.categories.map((c) => c.id === id ? category : c)
        }));
    }
}));

export default useCategoryStore;