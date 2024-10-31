import {db} from '../config/firebase.config';
import {User, UserUpdatePayload} from '../entities/user';

export class UserRepository {
    private collection = db.collection('USERS');

    async getUserById(userId: string): Promise<User | null> {
        try {
            const userDoc = await this.collection.doc(userId).get();
            if (!userDoc.exists) return null;
            return {id: userDoc.id, ...userDoc.data()} as User;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async updateUser(userId: string, userData: UserUpdatePayload): Promise<User | null> {
        try {
            const updateData = {
                ...userData,
                updatedAt: new Date()
            };

            await this.collection.doc(userId).update(updateData);
            return this.getUserById(userId);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}

export const userRepository = new UserRepository();