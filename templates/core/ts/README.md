# Core Template - Minimal Express API (TypeScript)

A minimal Express.js server with TypeScript, basic routing and middleware.

## Features

- ✅ Express.js server
- ✅ TypeScript with strict mode
- ✅ CORS enabled
- ✅ Environment variables
- ✅ Basic error handling
- ✅ Health check endpoint

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create your `.env` file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript

## Available Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check

## Project Structure

```
.
├── src/
│   └── server.ts      # Main server file
├── dist/              # Compiled JavaScript (after build)
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Next Steps

- Add more routes in `src/server.ts`
- Create a `routes/` folder for better organization
- Add a database connection
- Implement authentication
- Add validation middleware
- Create type definitions in `src/types/`

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
