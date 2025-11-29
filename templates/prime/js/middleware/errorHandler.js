const { ApiError } = require('../utils/errors');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Handle custom API errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            ...(err.errors && { errors: err.errors }),
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            status: 'fail',
            message: 'Validation Error',
            errors
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            status: 'fail',
            message: `${field} already exists`
        });
    }

    // Mongoose cast error
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            status: 'fail',
            message: 'Invalid ID format'
        });
    }

    // Default error
    res.status(500).json({
        success: false,
        status: 'error',
        message: 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && {
            error: err.message,
            stack: err.stack
        })
    });
};

module.exports = errorHandler;
