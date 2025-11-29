const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/helpers');
const { UnauthorizedError, BadRequestError } = require('../utils/errors');

class AuthService {
    /**
     * Register new user
     */
    async register(userData) {
        const user = await userRepository.create(userData);
        const token = generateToken(user._id);

        return {
            user,
            token
        };
    }

    /**
     * Login user
     */
    async login(email, password) {
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }

        // Find user with password
        const user = await userRepository.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedError('Invalid credentials');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new UnauthorizedError('Account is deactivated');
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid credentials');
        }

        // Update last login
        await userRepository.updateLastLogin(user._id);

        // Generate token
        const token = generateToken(user._id);

        return {
            user,
            token
        };
    }

    /**
     * Get user profile
     */
    async getProfile(userId) {
        return await userRepository.findById(userId);
    }

    /**
     * Update user profile
     */
    async updateProfile(userId, updateData) {
        // Prevent updating sensitive fields
        delete updateData.password;
        delete updateData.role;
        delete updateData.permissions;

        return await userRepository.update(userId, updateData);
    }
}

module.exports = new AuthService();
