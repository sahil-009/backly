const userRepository = require('../repositories/userRepository');
const { paginate, buildPaginationMeta } = require('../utils/helpers');
const { ForbiddenError } = require('../utils/errors');

class UserService {
    /**
     * Get all users (admin only)
     */
    async getAllUsers(page = 1, limit = 10, filter = {}) {
        const { skip, limit: parsedLimit } = paginate(page, limit);

        const { users, total } = await userRepository.findAll({
            skip,
            limit: parsedLimit,
            filter
        });

        const meta = buildPaginationMeta(total, page, parsedLimit);

        return { users, meta };
    }

    /**
     * Get user by ID
     */
    async getUserById(id) {
        return await userRepository.findById(id);
    }

    /**
     * Update user (admin only)
     */
    async updateUser(id, updateData) {
        return await userRepository.update(id, updateData);
    }

    /**
     * Delete user (admin only)
     */
    async deleteUser(id) {
        return await userRepository.delete(id);
    }

    /**
     * Update user role (admin only)
     */
    async updateUserRole(id, role, permissions = []) {
        return await userRepository.update(id, { role, permissions });
    }

    /**
     * Deactivate user (admin only)
     */
    async deactivateUser(id) {
        return await userRepository.update(id, { isActive: false });
    }

    /**
     * Activate user (admin only)
     */
    async activateUser(id) {
        return await userRepository.update(id, { isActive: true });
    }
}

module.exports = new UserService();
