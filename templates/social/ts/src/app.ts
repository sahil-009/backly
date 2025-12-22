import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Routes
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import postRoutes from './modules/posts/post.routes';
import commentRoutes from './modules/comments/comment.routes';
import likeRoutes from './modules/likes/like.routes';
import followerRoutes from './modules/followers/follower.routes';
import notificationRoutes from './modules/notifications/notification.routes';
import storyRoutes from './modules/stories/story.routes';
import reelRoutes from './modules/reels/reel.routes';
import chatRoutes from './modules/chat/chat.routes';

// Welcome page
import { welcomeHandler, statusHandler } from './utils/welcomePage';

// Middleware
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Application = express();

// Security & Performance Middleware
app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));
app.use(compression());
app.use(cors());
app.use(morgan('dev'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome page data
let welcomePageEndpoints: string[] = [];

export const setWelcomePageData = (endpoints: string[]) => {
    welcomePageEndpoints = endpoints;
};

// Welcome Route - HTML page with server info
app.get('/', (req: Request, res: Response) => {
    welcomeHandler(welcomePageEndpoints)(req, res);
});

// Status API endpoint (uptime + db status)
app.get('/api/status', statusHandler);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/followers', followerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling
app.use(errorHandler);

export default app;
