import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) throw new UnauthorizedError('Not authorized to access this route');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      const user = await User.findById(decoded.id);
      if (!user) throw new UnauthorizedError('User not found');
      if (!user.isActive) throw new UnauthorizedError('Account is deactivated');
      req.user = user;
      next();
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError') throw new UnauthorizedError('Invalid token');
      if (error.name === 'TokenExpiredError') throw new UnauthorizedError('Token expired');
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError(`User role '${req.user?.role}' is not authorized`));
    }
    next();
  };
};

export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.hasPermission(permission)) {
      return next(new ForbiddenError(`You don't have '${permission}' permission`));
    }
    next();
  };
};
