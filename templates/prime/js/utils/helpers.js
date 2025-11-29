const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 */
const generateToken = (userId, expiresIn = process.env.JWT_EXPIRE || '7d') => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Paginate results
 */
const paginate = (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return { skip, limit: parseInt(limit) };
};

/**
 * Build pagination metadata
 */
const buildPaginationMeta = (total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    return {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    };
};

/**
 * Sanitize user object (remove sensitive fields)
 */
const sanitizeUser = (user) => {
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    return userObj;
};

/**
 * Generate random string
 */
const generateRandomString = (length = 32) => {
    return require('crypto').randomBytes(length).toString('hex');
};

module.exports = {
    generateToken,
    verifyToken,
    paginate,
    buildPaginationMeta,
    sanitizeUser,
    generateRandomString
};
