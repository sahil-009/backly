const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

// Routes
const postRoutes = require('./modules/posts/post.routes');
const authorRoutes = require('./modules/authors/author.routes');
const tagRoutes = require('./modules/tags/tag.routes');
const categoryRoutes = require('./modules/categories/category.routes');
const commentRoutes = require('./modules/comments/comment.routes');
const newsletterRoutes = require('./modules/newsletter/newsletter.routes');

// Middleware
// Middleware
const { errorHandler } = require('./core/middleware/errorHandler');
// Welcome page
const { welcomeHandler, statusHandler } = require('./utils/welcomePage');

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

// Static Files
app.use(express.static('public'));

// Welcome Route - HTML page with server info
app.get('/', (req, res) => {
    welcomeHandler(welcomePageEndpoints)(req, res);
});

// Status API endpoint (uptime + db status)
app.get('/api/status', statusHandler);

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Error Handling
app.use(errorHandler);

module.exports = { app, setWelcomePageData };
