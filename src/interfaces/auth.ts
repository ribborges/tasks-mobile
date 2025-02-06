export interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    username: string;
    name: string;
    email: string;
    profilePic?: string;
    createdAt: Date;
    updatedAt?: Date;
    token: string;
}

export interface RegisterResponse {
    id: string;
    username: string;
    name: string;
    email: string;
    createdAt: Date;
    token: string;
}