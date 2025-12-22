import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Routes
import postRoutes from './modules/posts/post.routes';
import authorRoutes from './modules/authors/author.routes';
import tagRoutes from './modules/tags/tag.routes';
import categoryRoutes from './modules/categories/category.routes';
import commentRoutes from './modules/comments/comment.routes';
import newsletterRoutes from './modules/newsletter/newsletter.routes';

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

// Static Files
app.use(express.static('public'));

// Welcome Route - HTML page with server info
app.get('/', (req: Request, res: Response) => {
}
    });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Blog/CMS API is running' });
});

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Error Handling
app.use(errorHandler);

export default app;
