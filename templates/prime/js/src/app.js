const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

// Routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');

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

// Welcome Route - HTML page with server info
app.get('/', (req, res) => {
    welcomeHandler(welcomePageEndpoints)(req, res);
});

// Status API endpoint (uptime + db status)
app.get('/api/status', statusHandler);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Prime API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error Handling
app.use(errorHandler);

module.exports = { app, setWelcomePageData };
