# Prime Template - Advanced Architecture API

An enterprise-grade Express.js backend with advanced architecture, RBAC, services layer, and repository pattern.

## Features

- ✅ **Advanced Architecture** - Services, Repositories, Controllers separation
- ✅ **RBAC** - Role-Based Access Control with permissions
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **MongoDB** - Database with Mongoose ODM
- ✅ **Repository Pattern** - Data access abstraction
- ✅ **Service Layer** - Business logic separation
- ✅ **Custom Error Classes** - Structured error handling
- ✅ **Rate Limiting** - API protection
- ✅ **Pagination** - Built-in pagination utilities
- ✅ **Helper Functions** - Reusable utilities

## Architecture

```
┌─────────────┐
│  Controller │  ← HTTP layer (request/response)
└──────┬──────┘
       │
┌──────▼──────┐
│   Service   │  ← Business logic
└──────┬──────┘
       │
┌──────▼──────┐
│ Repository  │  ← Data access
└──────┬──────┘
       │
┌──────▼──────┐
│    Model    │  ← Database schema
└─────────────┘
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB and configure `.env`:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm run dev
```

## Project Structure

```
.
├── config/
│   └── db.js                  # Database connection
├── controllers/
│   ├── authController.js      # Auth endpoints
│   └── userController.js      # User management
├── services/
│   ├── authService.js         # Auth business logic
│   └── userService.js         # User business logic
├── repositories/
│   └── userRepository.js      # Data access layer
├── models/
│   └── User.js                # User schema
├── middleware/
│   ├── auth.js                # JWT + RBAC
│   ├── errorHandler.js        # Error handling
│   └── rateLimiter.js         # Rate limiting
├── routes/
│   ├── auth.js                # Auth routes
│   └── users.js               # User routes
├── utils/
│   ├── errors.js              # Custom error classes
│   └── helpers.js             # Utility functions
└── server.js                  # Main server
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### User Management (Admin Only)
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PUT /api/users/:id/role` - Update user role
- `PUT /api/users/:id/deactivate` - Deactivate user

## Roles & Permissions

### Roles
- `user` - Default role
- `moderator` - Moderate content
- `admin` - Full access

### Permissions
- `read` - Read access
- `write` - Write access
- `delete` - Delete access
- `manage_users` - User management

## Rate Limiting

- **API Routes**: 100 requests per 15 minutes
- **Auth Routes**: 5 requests per 15 minutes

## Error Handling

Custom error classes:
- `BadRequestError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (403)
- `NotFoundError` (404)
- `ConflictError` (409)
- `ValidationError` (400)

## Example Usage

### Register
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Users (Admin)
```bash
GET /api/users?page=1&limit=10
Authorization: Bearer <admin-token>
```

### Update User Role (Admin)
```bash
PUT /api/users/:id/role
Authorization: Bearer <admin-token>
{
  "role": "admin",
  "permissions": ["read", "write", "delete", "manage_users"]
}
```

## Next Steps

- Add more domain models
- Implement caching (Redis)
- Add logging (Winston)
- Add API documentation (Swagger)
- Implement file uploads
- Add email service
- Add testing (Jest)

## Environment Variables

- `PORT` - Server port
- `NODE_ENV` - Environment
- `MONGODB_URI` - MongoDB connection
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - Token expiration
