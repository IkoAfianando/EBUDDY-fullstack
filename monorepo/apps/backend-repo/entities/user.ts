export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    profilePicture?: string;
    phoneNumber?: string;
}

export interface UserUpdatePayload {
    name?: string;
    profilePicture?: string;
    phoneNumber?: string;
}

export interface UserResponse {
    success: boolean;
    data?: User;
    error?: string;
}