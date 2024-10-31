export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        token: string;
        user: {
            uid: string;
            email: string;
            name: string;
        };
    };
    error?: string;
}