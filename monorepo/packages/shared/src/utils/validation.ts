import { UserUpdatePayload, userValidation } from '../types/user';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const validateUserData = (data: UserUpdatePayload): void => {
    if (data.name) {
        if (data.name.length < userValidation.name.min ||
            data.name.length > userValidation.name.max) {
            throw new ValidationError(
                `Name must be between ${userValidation.name.min} and ${userValidation.name.max} characters`
            );
        }
    }

    if (data.phoneNumber && !userValidation.phoneNumber.pattern.test(data.phoneNumber)) {
        throw new ValidationError('Invalid phone number format');
    }
};

export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Format as international number if it starts with a country code
    if (cleaned.length > 10) {
        return `+${cleaned}`;
    }

    // Format as local number
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
};