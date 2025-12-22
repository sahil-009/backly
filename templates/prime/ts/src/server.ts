import app from './app';
import connectDB from './config/db';
import { displayBanner } from './utils/banner';

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

  app.listen(PORT, () => {
    displayBanner(PORT, endpoints);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Rejection:', err.message);
  process.exit(1);
});

startServer();
