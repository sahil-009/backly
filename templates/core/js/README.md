# Core Template - Minimal Express API

A minimal Express.js server with basic routing and middleware.

## Features

- ✅ Express.js server
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

## Available Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check

## Project Structure

```
.
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Next Steps

- Add more routes in `server.js`
- Create a `routes/` folder for better organization
- Add a database connection
- Implement authentication
- Add validation middleware

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
