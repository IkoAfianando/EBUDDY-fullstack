import {Request, Response} from 'express';
import {AuthRequest} from '../middleware/auth.middleware';
import {userRepository} from '../repository/user.repository';
import {UserUpdatePayload, UserResponse} from '../entities/user';

export class UserController {
    async fetchUserData(req: AuthRequest, res: Response<UserResponse>) {
        try {
            const userId = req.user?.uid;
            if (!userId) {
                return res.status(400).json({success: false, error: 'User ID not provided'});
            }

            const user = await userRepository.getUserById(userId);
            if (!user) {
                return res.status(404).json({success: false, error: 'User not found'});
            }

            return res.status(200).json({success: true, data: user});
        } catch (error) {
            console.error('Fetch user error:', error);
            return res.status(500).json({success: false, error: 'Internal server error'});
        }
    }

    async updateUserData(req: AuthRequest, res: Response<UserResponse>) {
        try {
            const userId = req.user?.uid;
            if (!userId) {
                return res.status(400).json({success: false, error: 'User ID not provided'});
            }

            const updateData: UserUpdatePayload = req.body;
            const updatedUser = await userRepository.updateUser(userId, updateData);

            if (!updatedUser) {
                return res.status(404).json({success: false, error: 'User not found'});
            }

            return res.status(200).json({success: true, data: updatedUser});
        } catch (error) {
            console.error('Update user error:', error);
            return res.status(500).json({success: false, error: 'Internal server error'});
        }
    }
}

export const userController = new UserController();