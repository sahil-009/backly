# APIcraft 🚀

A modern, interactive backend starter generator for Node.js applications.

## Features

✨ **Interactive CLI** - Simple, guided project setup  
🎯 **6 Professional Templates** - From minimal to advanced architectures  
📦 **JavaScript & TypeScript** - Full support for both languages  
⚡ **Zero Configuration** - Works out of the box  
🛠️ **Flexible** - Start simple, scale as needed

## Quick Start

```bash
npx apicraft
```

That's it! The CLI will guide you through:
1. Choosing your language (JavaScript or TypeScript)
2. Selecting a template
3. Naming your project
4. Automatic dependency installation

## Templates

### 🔹 core
Minimal Express server with basic routing. Perfect for learning or simple APIs.
- Express.js
- CORS
- Environment variables
- Basic route structure

### 🔹 base
Production-ready starter with authentication and database.
- JWT authentication
- MongoDB with Mongoose
- Password hashing (bcrypt)
- MVC architecture
- Error handling middleware

### 🔹 prime
Advanced architecture for scalable applications.
- Everything in `base` +
- Role-Based Access Control (RBAC)
- Service layer pattern
- Repository pattern
- Custom error classes
- Utility functions

### 🔹 commerce
E-commerce backend foundation.
- Product, Cart, Order, Category models
- Inventory management
- Filtering utilities
- Payment handler placeholder

### 🔹 content
Blog/CMS starter kit.
- Post, Comment, Category models
- CRUD operations
- Slug generation
- Pagination utilities

### 🔹 social
Social media backend.
- User profiles
- Posts, Likes, Follows
- Basic feed system
- Modular routing

## CLI Flags

For advanced users, skip prompts with flags:

```bash
# Use TypeScript
npx apicraft --ts

# Use JavaScript
npx apicraft --js

# Specify template
npx apicraft --template base

# Set project name
npx apicraft --name my-awesome-api

# Skip dependency installation
npx apicraft --no-install

# Combine flags
npx apicraft --ts --template prime --name my-api
```

## After Generation

```bash
cd your-project-name
npm run dev
```

## Requirements

- Node.js >= 14.0.0
- npm or yarn

## License

MIT

## Author

Sahil Mund
# apicraft
