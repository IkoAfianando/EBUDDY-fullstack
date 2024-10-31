export interface User {
    id: string;
    email: string;
    name: string;
    phoneNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserUpdatePayload {
    name?: string;
    phoneNumber?: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
    phoneNumber?: string;
}