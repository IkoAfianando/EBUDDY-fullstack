import * as admin from 'firebase-admin';
import * as path from 'path';
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;

try {
    serviceAccount = require(path.join(__dirname, '../service-account-key.json'));
} catch (error) {
    console.error('Error loading Firebase service account file:', error);
    console.error('Please ensure you have placed your service-account-key.json file in the root directory');
    process.exit(1);
}

// Initialize Firebase Admin
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
        process.exit(1);
    }
}

export const db = admin.firestore();
export default admin;