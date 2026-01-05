import express from 'express';
import { register, login, updateMe, getAllUsers, adminUpdateUser,getUserById ,adminUpdateFull} from '../controllers/authController';
import upload from '../middlewares/uploadMiddleware';
import { protect,isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);
router.put('/update-me', protect, upload.single('profileImage'), updateMe);
router.get('/all', protect, isAdmin, getAllUsers);
router.put('/admin-update/:userId', protect, isAdmin, adminUpdateUser);
router.put('/admin-update-full/:id', protect, isAdmin, upload.single('profileImage'), adminUpdateFull);
router.get('/:id', protect, isAdmin, getUserById);
export default router;