const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateUserRole,
    deactivateUser
} = require('../controllers/userController');
const { protect, authorize, checkPermission } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', checkPermission('manage_users'), updateUser);
router.delete('/:id', checkPermission('manage_users'), deleteUser);
router.put('/:id/role', checkPermission('manage_users'), updateUserRole);
router.put('/:id/deactivate', checkPermission('manage_users'), deactivateUser);

module.exports = router;
