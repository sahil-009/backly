require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/db');

const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3000;

// Track database connection status
let dbConnected = false;

// Connect to database
connectDB().then(conn => {
    dbConnected = !!conn;
});

// Security middleware
app.use(helmet());

// Logging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Blog/CMS API',
        status: 'running',
        database: dbConnected ? 'connected' : 'not configured',
        endpoints: { posts: '/api/posts', comments: '/api/comments' }
    });
});

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Blog/CMS API running on http://localhost:${PORT}`);
});
