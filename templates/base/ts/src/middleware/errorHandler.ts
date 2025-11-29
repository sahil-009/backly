import { Request, Response, NextFunction } from 'express';

interface MongoError extends Error {
    code?: number;
    keyPattern?: Record<string, any>;
}

interface ValidationError extends Error {
    errors?: Record<string, { message: string }>;
}

// Error handler middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const validationErr = err as ValidationError;
        const errors = validationErr.errors
            ? Object.values(validationErr.errors).map(e => e.message)
            : [];
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const mongoErr = err as MongoError;
        const field = mongoErr.keyPattern ? Object.keys(mongoErr.keyPattern)[0] : 'field';
        return res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export default errorHandler;
