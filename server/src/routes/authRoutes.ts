import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);

export default router;