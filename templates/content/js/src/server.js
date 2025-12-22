const { app, setWelcomePageData } = require('./app');
const connectDB = require('./config/db');
const { displayBanner } = require('./utils/banner');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    const endpoints = [
        'GET    /health',
        'POST   /api/auth/login',
        'POST   /api/auth/register',
        'GET    /api/users',
        'GET    /api/users/:id'
    ];

    setWelcomePageData(endpoints);

    app.listen(PORT, () => {
        displayBanner(PORT, endpoints);
    });
};

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    process.exit(1);
});

startServer();
