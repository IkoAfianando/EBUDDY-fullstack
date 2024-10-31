export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
    },
    USER: {
        FETCH: '/users/fetch-user-data',
        UPDATE: '/users/update-user-data',
    },
};

export const ERROR_MESSAGES = {
    VALIDATION: {
        INVALID_EMAIL: 'Invalid email format',
        INVALID_PHONE: 'Invalid phone number format',
        NAME_LENGTH: 'Name must be between 2 and 50 characters',
        REQUIRED_FIELD: (field: string) => `${field} is required`,
    },
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid email or password',
        UNAUTHORIZED: 'Unauthorized access',
        TOKEN_EXPIRED: 'Session expired, please login again',
    },
    USER: {
        NOT_FOUND: 'User not found',
        UPDATE_FAILED: 'Failed to update user data',
    },
};

export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s-]{10,}$/,
};