# Prime Template - Advanced Architecture API (TypeScript)

An enterprise-grade Express.js backend with TypeScript, advanced architecture, RBAC, services layer, and repository pattern.

## Features

- ✅ **TypeScript** - Full type safety with strict mode
- ✅ **Advanced Architecture** - Services, Repositories, Controllers separation
- ✅ **RBAC** - Role-Based Access Control with permissions
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **MongoDB** - Database with Mongoose ODM
- ✅ **Repository Pattern** - Data access abstraction
- ✅ **Service Layer** - Business logic separation
- ✅ **Custom Error Classes** - Structured error handling
- ✅ **Rate Limiting** - API protection
- ✅ **Pagination** - Built-in pagination utilities

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB and configure `.env`:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── repositories/
│   │   └── userRepository.ts
│   ├── models/
│   │   └── User.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── users.ts
│   ├── utils/
│   │   ├── errors.ts
│   │   └── helpers.ts
│   └── server.ts
├── dist/                      # Compiled JavaScript
├── tsconfig.json
└── package.json
```

See JavaScript version README for full API documentation and examples.
