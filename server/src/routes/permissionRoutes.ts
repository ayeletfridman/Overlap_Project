import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware';
import { requestPermission, getAllRequests, getMyRequests, handleRequest } from '../controllers/permissionController';

const router = express.Router();

router.post('/', protect, requestPermission); 
router.get('/my-history', protect, getMyRequests); 
router.get('/admin/all', protect, isAdmin, getAllRequests); 
router.put('/:id/status', protect, isAdmin, handleRequest); 

export default router;