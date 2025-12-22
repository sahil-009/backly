const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const http = require('http');
require('dotenv').config();

// Routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const postRoutes = require('./modules/posts/post.routes');
const commentRoutes = require('./modules/comments/comment.routes');
const likeRoutes = require('./modules/likes/like.routes');
const followerRoutes = require('./modules/followers/follower.routes');
const notificationRoutes = require('./modules/notifications/notification.routes');
const storyRoutes = require('./modules/stories/story.routes');
const reelRoutes = require('./modules/reels/reel.routes');
const chatRoutes = require('./modules/chat/chat.routes');

// Middleware
// Welcome page
const { welcomeHandler, statusHandler } = require('./utils/welcomePage');
const { errorHandler } = require('./core/middleware/errorHandler');

require('dotenv').config();

const app = express();

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
let welcomePageEndpoints = [];

const setWelcomePageData = (endpoints) => {
    welcomePageEndpoints = endpoints;
};

// Welcome Route - HTML page with server info
app.get('/', (req, res) => {
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

module.exports = app;
