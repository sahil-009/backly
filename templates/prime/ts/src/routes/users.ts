import express from 'express';
import { getUsers, getUser, updateUser, deleteUser, updateUserRole, deactivateUser } from '../controllers/userController';
import { protect, authorize, checkPermission } from '../middleware/auth';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', checkPermission('manage_users'), updateUser);
router.delete('/:id', checkPermission('manage_users'), deleteUser);
router.put('/:id/role', checkPermission('manage_users'), updateUserRole);
router.put('/:id/deactivate', checkPermission('manage_users'), deactivateUser);

export default router;
