import {Router} from 'express';
import {userController} from '../controllers/api';
import {authMiddleware} from '../middleware/auth.middleware';

const router = Router();

router.get('/fetch-user-data', authMiddleware, userController.fetchUserData);
router.put('/update-user-data', authMiddleware, userController.updateUserData);

export default router;