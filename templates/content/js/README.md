# Content Template - Blog/CMS Backend

Blog and CMS backend with posts, comments, and categories.

## Features
- Post management with slug generation
- Comment system with approval
- Category organization
- Text search
- View tracking
- Pagination

## Models
- **Post** - title, slug, content, author, category, tags, published, views
- **Comment** - post, author, content, approved
- **Category** - name, slug, description

## API Endpoints

### Posts
- `GET /api/posts` - Get posts (filters: category, tag, search, published, page, limit)
- `GET /api/posts/:slug` - Get post by slug
- `POST /api/posts` - Create post
- `PUT /api/posts/:slug` - Update post
- `DELETE /api/posts/:slug` - Delete post

### Comments
- `GET /api/comments/post/:postId` - Get comments for post
- `POST /api/comments/post/:postId` - Create comment
- `PUT /api/comments/:id/approve` - Approve comment
- `DELETE /api/comments/:id` - Delete comment

## Getting Started
```bash
npm install
cp .env.example .env
npm run dev
```
