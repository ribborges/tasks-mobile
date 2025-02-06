import { TaskStatus } from "@/types/task";

export interface TaskData {
    categoryId?: string;
    name?: string;
    description?: string;
    dueDate?: string;
    status?: TaskStatus;
    isImportant?: boolean;
}