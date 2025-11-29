# Base Template - Auth & Database API

A production-ready Express.js backend with authentication, MongoDB, and MVC architecture.

## Features

- ✅ JWT Authentication (register, login, protected routes)
- ✅ MongoDB with Mongoose
- ✅ Password hashing with bcrypt
- ✅ MVC architecture
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Role-based authorization

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env`

3. Create your `.env` file:
```bash
cp .env.example .env
```

4. Update environment variables:
   - Set a strong `JWT_SECRET`
   - Configure `MONGODB_URI`

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Public Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Routes (require JWT token)
- `GET /api/auth/me` - Get current user profile

### General
- `GET /` - Welcome message
- `GET /api/health` - Health check

## Authentication

Include JWT token in requests:
```
Authorization: Bearer <your-token>
```

## Project Structure

```
.
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── authController.js  # Auth logic
├── middleware/
│   ├── auth.js            # JWT verification
│   └── errorHandler.js    # Error handling
├── models/
│   └── User.js            # User model
├── routes/
│   └── auth.js            # Auth routes
├── server.js              # Main server file
├── package.json
├── .env.example
└── README.md
```

## Example Requests

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```bash
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

## Next Steps

- Add more models (e.g., Posts, Products)
- Implement password reset functionality
- Add email verification
- Create more protected routes
- Add rate limiting
- Implement refresh tokens

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - Token expiration time
