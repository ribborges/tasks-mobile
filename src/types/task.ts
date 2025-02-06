export type TaskStatus = "pending" | "completed" | "in-progress";

export type TaskSchema = {
    id: string;
    categoryId: string;
    userId: string;
    name: string;
    description?: string;
    dueDate?: string;
    status: TaskStatus;
    isImportant: boolean;
    createdAt: string;
    updatedAt?: string;
}