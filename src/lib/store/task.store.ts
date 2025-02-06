import { create } from 'zustand';

import { TaskSchema } from '@/types/task';

type State = {
    tasks: TaskSchema[];
}

type Actions = {
    getTask: (taskId: string) => TaskSchema | undefined;
    setTasks: (tasks: TaskSchema[]) => void;
    addTask: (task: TaskSchema) => void;
    removeTask: (taskId: string) => void;
    updateTask: (taskId: string, task: TaskSchema) => void;
}

const useTaskStore = create<State & Actions>((set) => ({
    tasks: [],
    getTask: (taskId: string): TaskSchema | undefined => {
        return useTaskStore.getState().tasks.find((task: TaskSchema) => task.id === taskId);
    },
    setTasks: (tasks: TaskSchema[]) => {
        set({ tasks });
    },
    addTask: (task: TaskSchema) => {
        set((state) => ({
            tasks: [...state.tasks, task]
        }));
    },
    removeTask: (taskId: string) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId)
        }));
    },
    updateTask: (taskId: string, task: TaskSchema) => {
        set((state) => ({
            tasks: state.tasks.map((t) => t.id === taskId ? task : t)
        }));
    }
}));

export default useTaskStore;