# Social Template - Social Media Backend

Social media backend with posts, likes, and follow system.

## Features
- Post creation and feed
- Like/unlike posts
- Follow/unfollow users
- Followers and following lists
- User feed

## Models
- **Post** - author, content, image, likes, likesCount, commentsCount
- **Follow** - follower, following

## API Endpoints

### Posts
- `GET /api/posts/feed` - Get feed (paginated)
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post

### Users/Follow
- `POST /api/users/:userId/follow` - Follow user
- `DELETE /api/users/:userId/unfollow` - Unfollow user
- `GET /api/users/:userId/followers` - Get followers
- `GET /api/users/:userId/following` - Get following

## Getting Started
```bash
npm install
cp .env.example .env
npm run dev
```
