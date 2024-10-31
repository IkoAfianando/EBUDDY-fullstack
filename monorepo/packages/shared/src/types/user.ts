export interface User {
    id: string;
    email: string;
    name: string;
    phoneNumber?: string;
    createdAt: Date;
    updatedAt: Date;
    profilePicture?: string;
}

export interface UserUpdatePayload {
    name?: string;
    phoneNumber?: string;
    profilePicture?: string;
}

export interface UserResponse {
    success: boolean;
    data?: User;
    error?: string;
}

export interface AuthPayload {
    email: string;
    password: string;
}

export interface RegisterPayload extends AuthPayload {
    name: string;
    phoneNumber?: string;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        token: string;
        user: User;
    };
    error?: string;
}

// Validation schemas
export const userValidation = {
    name: {
        min: 2,
        max: 50,
        required: true
    },
    phoneNumber: {
        pattern: /^\+?[\d\s-]{10,}$/,
        required: false
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true
    }
};