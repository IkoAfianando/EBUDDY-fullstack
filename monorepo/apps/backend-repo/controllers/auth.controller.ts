import {Request, Response} from 'express';
import admin from '../config/firebase.config';
import {RegisterPayload, LoginPayload, AuthResponse} from '../entities/auth';
import {userRepository} from '../repository/user.collection';

export class AuthController {
    async register(req: Request<{}, {}, RegisterPayload>, res: Response<AuthResponse>) {
        try {
            const {email, password, name, phoneNumber} = req.body;

            // Create user in Firebase Auth
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: name,
                phoneNumber
            });

            // Create custom token
            const token = await admin.auth().createCustomToken(userRecord.uid);

            // Save additional user data to Firestore
            await userRepository.createUser({
                id: userRecord.uid,
                email,
                name,
                phoneNumber,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return res.status(201).json({
                success: true,
                data: {
                    token,
                    user: {
                        uid: userRecord.uid,
                        email: userRecord.email!,
                        name: userRecord.displayName!
                    }
                }
            });
        } catch (error: any) {
            console.error('Registration error:', error);
            return res.status(400).json({
                success: false,
                error: error.message || 'Failed to register user'
            });
        }
    }

    async login(req: Request<{}, {}, LoginPayload>, res: Response<AuthResponse>) {
        try {
            const {email, password} = req.body;

            // Verify user credentials using Firebase Admin SDK
            const userRecord = await admin.auth().getUserByEmail(email);

            // Create custom token
            const token = await admin.auth().createCustomToken(userRecord.uid);

            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        uid: userRecord.uid,
                        email: userRecord.email!,
                        name: userRecord.displayName || ''
                    }
                }
            });
        } catch (error: any) {
            console.error('Login error:', error);
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }
    }
}

export const authController = new AuthController();