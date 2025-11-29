const User = require('../models/User');
const { NotFoundError, ConflictError } = require('../utils/errors');

class UserRepository {
    /**
     * Find user by ID
     */
    async findById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    /**
     * Find user by email
     */
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    /**
     * Find user by email with password
     */
    async findByEmailWithPassword(email) {
        return await User.findOne({ email }).select('+password');
    }

    /**
     * Create new user
     */
    async create(userData) {
        // Check if user already exists
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new ConflictError('User already exists with this email');
        }

        const user = await User.create(userData);
        return user;
    }

    /**
     * Update user
     */
    async update(id, updateData) {
        const user = await User.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }

    /**
     * Delete user
     */
    async delete(id) {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    /**
     * Get all users with pagination
     */
    async findAll(options = {}) {
        const { skip = 0, limit = 10, filter = {} } = options;

        const users = await User.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);

        return { users, total };
    }

    /**
     * Update last login
     */
    async updateLastLogin(id) {
        return await User.findByIdAndUpdate(
            id,
            { lastLogin: Date.now() },
            { new: true }
        );
    }
}

module.exports = new UserRepository();
