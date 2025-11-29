# Commerce Template - E-Commerce Backend

A complete e-commerce backend with products, cart, and order management.

## Features

- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Stock tracking
- ✅ Product filtering and search
- ✅ Payment method support

## Models

- **Product** - name, description, price, category, stock, images, rating
- **Category** - name, description, parent (for nested categories)
- **Cart** - user, items, totalPrice
- **Order** - user, items, shipping address, payment, status

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

## Query Parameters

### Products
- `category` - Filter by category ID
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Text search
- `page` - Page number
- `limit` - Items per page

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Next Steps

- Add user authentication
- Implement payment gateway integration
- Add product reviews
- Add wishlist functionality
- Implement inventory management
