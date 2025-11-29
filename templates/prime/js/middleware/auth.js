const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new UnauthorizedError('Not authorized to access this route');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                throw new UnauthorizedError('User not found');
            }

            if (!req.user.isActive) {
                throw new UnauthorizedError('Account is deactivated');
            }

            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedError('Invalid token');
            }
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedError('Token expired');
            }
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

// Authorize specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ForbiddenError(`User role '${req.user.role}' is not authorized to access this route`)
            );
        }
        next();
    };
};

// Check specific permission
exports.checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user.hasPermission(permission)) {
            return next(
                new ForbiddenError(`You don't have '${permission}' permission`)
            );
        }
        next();
    };
};
