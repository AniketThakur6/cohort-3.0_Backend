# StoreAPI

A professional Node.js and Express backend for user authentication, product management, and ImageKit-powered product image uploads.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-TODO-lightgrey)](#license)

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project folder structure](#project-folder-structure)
- [Installation and setup](#installation-and-setup)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
  - [GET /](#get-)
  - [POST /api/auth/register](#post-apiauthregister)
  - [POST /api/auth/login](#post-apiauthlogin)
  - [POST /api/auth/refresh-token](#post-apiauthrefresh-token)
  - [GET /api/auth/me](#get-apiauthme)
  - [POST /api/auth/logout](#post-apiauthlogout)
  - [POST /api/products](#post-apiproducts)
  - [GET /api/products](#get-apiproducts)
  - [GET /api/products/:id](#get-apiproductsid)
  - [PUT /api/products/:id](#put-apiproductsid)
  - [DELETE /api/products/:id](#delete-apiproductsid)
- [Rate limiting](#rate-limiting)
- [Middleware](#middleware)
- [Key functions and utilities](#key-functions-and-utilities)
- [Database models and schema overview](#database-models-and-schema-overview)
- [Error handling](#error-handling)
- [Testing](#testing)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)
- [Route summary](#route-summary)

## Overview

StoreAPI is a Node.js backend built with Express and MongoDB for managing users and products. It supports JWT-based authentication, refresh-token rotation, product CRUD operations, and ImageKit uploads for product images.

Base URL: `http://localhost:4000/api`

## Features

- User registration with email, name, and password validation
- Password hashing with `bcryptjs`
- JWT-based login and token rotation using access and refresh tokens
- Refresh token storage using a SHA-256 hash for verification and invalidation
- Authenticated user profile retrieval
- Product creation, listing, retrieval, update, and deletion
- Product image upload and deletion via ImageKit
- Validation using `express-validator`
- IP-based request limiting using `express-rate-limit`
- Cookie-based refresh token handling with `cookie-parser`

## Tech stack

| Area | Technology |
|---|---|
| Runtime | Node.js |
| Web framework | Express 5 |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT (`jsonwebtoken`) |
| Password hashing | `bcryptjs` |
| Validation | `express-validator` |
| Rate limiting | `express-rate-limit` |
| File upload handling | `multer` |
| Image hosting | ImageKit (`@imagekit/nodejs`) |
| Cookies | `cookie-parser` |
| Environment config | `dotenv` |
| CORS | `cors` |

## Project folder structure

```text
StoreAPI/
├── README.md
├── backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── app/
│       │   └── app.js
│       ├── config/
│       │   ├── config.js
│       │   └── db.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── product.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── rateLimit.middleware.js
│       ├── models/
│       │   ├── product.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   └── product.route.js
│       ├── services/
│       │   └── storage.service.js
│       ├── utils/
│       │   └── auth.utils.js
│       ├── validators/
│       │   ├── auth.validator.js
│       │   └── product.validator.js
│       └── server.js
└── frontend/
    └── TODO: frontend source is not present in the repository snapshot reviewed for this backend.
```

## Installation and setup

### Prerequisites

- Node.js installed on your machine
- MongoDB instance or Atlas connection
- Access token and refresh token secrets
- ImageKit private key
- `.env` file created in the `backend/` folder

### 1) Clone the repository

```bash
git clone <repository-url>
cd StoreAPI/backend
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env` file in `backend/` using the variables listed in the table below. Do not commit secrets to version control.

### 4) Run in development

```bash
npm run dev
```

This project uses `nodemon ./src/server.js` from the `dev` script.

### 5) Run in production

```bash
node ./src/server.js
```

> TODO: A dedicated production `start` script is not defined in `backend/package.json` yet.

## Environment variables

The following values are placeholders only. Replace them with real values in your local or deployment environment.

| Name | Description | Example value |
|---|---|---|
| `PORT` | Port used by the Express server | `4000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/storeapi` |
| `ACCESS_SECRET_TOKEN` | Secret used to sign access JWTs | `replace-with-strong-access-secret` |
| `REFRESH_SECRET_TOKEN` | Secret used to sign refresh JWTs | `replace-with-strong-refresh-secret` |
| `ACCESS_TOKEN_EXPIRY` | Expiration for access token | `1h` |
| `REFRESH_TOKEN_EXPIRY` | Expiration for refresh token | `7d` |
| `IMAGEKIT_SECRET_KEY` | ImageKit private key used for uploads/deletes | `replace-with-imagekit-secret` |
| `FRONTEND_URL` | CORS origin settings for frontend | `http://localhost:3000` |

> TODO: Confirm the exact expiry values used in production and document them consistently.

## API reference

Base URL: `http://localhost:4000/api`

All routes below are derived from the checked backend code. No route-based role system is implemented; the app currently treats authenticated users as a single "logged-in user" group unless otherwise noted.

### `GET /`

- Method: `GET`
- Path: `/`
- Description: Basic health check endpoint returning a string response.
- Auth required: No
- Rate limit: None (no route-specific limiter configured)
- Handler: Inline callback in `backend/src/app/app.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Query | None | — | No | No query parameters are read. |
| Body | None | — | No | No request body is read. |

Example request:

```bash
curl http://localhost:4000/
```

Example success response:

```text
200 OK
working
```

Possible error responses:

- `500` — unexpected server failure (no dedicated error response is defined)

### `POST /api/auth/register`

- Method: `POST`
- Path: `/api/auth/register`
- Description: Register a new user account.
- Auth required: No
- Rate limit: 8 requests per 1 hour per IP (`registerIpLimiter`)
- Handler: `regsiterController` in `backend/src/controllers/auth.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Body | `name` | String | Yes | 2–50 characters; must start with a letter and can contain letters, numbers, or underscores |
| Body | `email` | String | Yes | Valid email format; normalized by validator |
| Body | `password` | String | Yes | 6–50 characters; whitespace at the start is rejected |
| Body | `confirmPassword` | String | Yes | Must match `password`; validated in the validator |

Example request:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Taylor_Store",
    "email": "taylor@example.com",
    "password": "example-password",
    "confirmPassword": "example-password"
  }'
```

Example success response:

```json
201 Created
{
  "message": "Registration successfull",
  "data": {
    "user": {
      "userId": "<user-id>",
      "email": "taylor@example.com",
      "name": "Taylor_Store"
    }
  }
}
```

Possible error responses:

- `400` — validation failed or invalid request body
- `401` — not implemented for this route
- `403` — not implemented for this route
- `404` — not implemented for this route
- `409` — email already exists
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `POST /api/auth/login`

- Method: `POST`
- Path: `/api/auth/login`
- Description: Authenticate a user and return an access token.
- Auth required: No
- Rate limit: 5 requests per 15 minutes per IP (`loginIpLimiter`)
- Handler: `loginController` in `backend/src/controllers/auth.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Body | `email` | String | Yes | Existing user email |
| Body | `password` | String | Yes | Matching password for the account |

Example request:

```bash
curl -i -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "taylor@example.com",
    "password": "example-password"
  }'
```

Example success response:

```json
200 OK
{
  "message": "login successful",
  "data": {
    "user": {
      "userId": "<user-id>",
      "email": "taylor@example.com",
      "name": "Taylor_Store"
    },
    "accessToken": "<access-token>"
  }
}
```

This route also sets a cookie named `refreshToken` with `httpOnly: true`.

Possible error responses:

- `400` — validation failed
- `401` — invalid email or password
- `403` — not implemented for this route
- `404` — not used here; missing user returns `401`
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `POST /api/auth/refresh-token`

- Method: `POST`
- Path: `/api/auth/refresh-token`
- Description: Validate the refresh-token cookie, verify it against the stored hash, rotate it, and issue a new access token.
- Auth required: No bearer token required; valid refresh token cookie required
- Rate limit: 150 requests per 15 minutes per IP (`standardIpLimiter`)
- Handler: `refreshTokenController` in `backend/src/controllers/auth.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Cookie | `refreshToken` | String | Yes | JWT refresh token returned by login flow |
| Query | None | — | No | No query parameters are read |
| Body | None | — | No | No request body is read |

Example request:

```bash
curl -i -X POST http://localhost:4000/api/auth/refresh-token \
  --cookie "refreshToken=<refresh-token>"
```

Example success response:

```json
200 OK
{
  "message": "token rotated successsfully",
  "data": {
    "accessToken": "<new-access-token>"
  }
}
```

Possible error responses:

- `400` — not explicitly returned by the handler
- `401` — refresh token missing, invalid, expired, or mismatched hash
- `403` — not implemented for this route
- `404` — not used here; missing user returns `401`
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `GET /api/auth/me`

- Method: `GET`
- Path: `/api/auth/me`
- Description: Return the currently authenticated user profile information.
- Auth required: Yes — valid access token required in `Authorization` header
- Rate limit: 150 requests per 15 minutes per IP (`standardIpLimiter`)
- Handler: `getMe` in `backend/src/controllers/auth.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | Bearer access token, e.g. `Bearer <token>` |
| Query | None | — | No | No query parameters are read |
| Body | None | — | No | No request body is read |

Example request:

```bash
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <access-token>"
```

Example success response:

```json
200 OK
{
  "message": "successfully fetched user",
  "data": {
    "user": {
      "userId": "<user-id>",
      "name": "Taylor_Store",
      "email": "taylor@example.com",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  }
}
```

Possible error responses:

- `400` — not returned by current handler
- `401` — missing, invalid, or expired access token
- `403` — not implemented for this route
- `404` — user record not found
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `POST /api/auth/logout`

- Method: `POST`
- Path: `/api/auth/logout`
- Description: Clear the stored refresh-token hash and the refresh cookie for the authenticated user.
- Auth required: Yes — valid access token required in `Authorization` header
- Rate limit: 800 requests per 1 hour per IP (`logoutIpLimiter`)
- Handler: `logoutController` in `backend/src/controllers/auth.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | Bearer access token |
| Cookie | `refreshToken` | String | No | Cleared by the server; not required to be re-sent to succeed |
| Body | None | — | No | No request body is read |

Example request:

```bash
curl -i -X POST http://localhost:4000/api/auth/logout \
  -H "Authorization: Bearer <access-token>"
```

Example success response:

```json
200 OK
{
  "message": "user logged out successfully"
}
```

Possible error responses:

- `400` — not returned by current handler
- `401` — missing, invalid, or expired access token
- `403` — not implemented for this route
- `404` — user not found; cookie is still cleared
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `POST /api/products`

- Method: `POST`
- Path: `/api/products`
- Description: Create a new product and upload one or more images to ImageKit.
- Auth required: Yes — valid access token required
- Rate limit: 10 requests per 15 minutes per IP (`productCreationLimiter`)
- Handler: `createProduct` in `backend/src/controllers/product.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | Bearer access token |
| Body | `title` | String | Yes | 10–100 characters; letters, numbers, spaces, and hyphens |
| Body | `description` | String | Yes | 20–500 characters; letters, numbers, spaces, and hyphens |
| Body | `category` | String | Yes | 3–50 characters; English letters, spaces, and hyphens |
| Body | `price` | JSON string | Yes | Must be a JSON string representing `{ amount, currency }` |
| Body | `sizes` | JSON string | Yes | Must be a JSON array of size/stock objects |
| File | `images` | File[] | No | Uploaded images; max 5 files and 20 MB per file |

Example request:

```bash
curl -X POST http://localhost:4000/api/products \
  -H "Authorization: Bearer <access-token>" \
  -F 'title=Canvas Tote Bag' \
  -F 'description=Durable everyday tote bag for carrying personal items' \
  -F 'category=Accessories' \
  -F 'price={"amount":29.99,"currency":"USD"}' \
  -F 'sizes=[{"size":"M","stock":10}]' \
  -F 'images=@./sample.jpg'
```

Example success response:

```json
201 Created
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "<product-id>",
      "title": "Canvas Tote Bag",
      "description": "Durable everyday tote bag for carrying personal items",
      "category": "Accessories",
      "price": {
        "amount": 29.99,
        "currency": "USD"
      },
      "images": [
        {
          "url": "<image-url>",
          "fileId": "<image-file-id>"
        }
      ],
      "sizes": [
        {
          "size": "M",
          "stock": 10
        }
      ],
      "seller": "<user-id>"
    }
  }
}
```

Possible error responses:

- `400` — invalid multipart JSON in `price` or `sizes`, missing required fields, or validation errors
- `401` — missing or invalid access token
- `403` — not implemented for this route
- `404` — not used in create flow
- `429` — rate limit exceeded
- `500` — ImageKit, database, or server failure

### `GET /api/products`

- Method: `GET`
- Path: `/api/products`
- Description: Fetch all products and populate each product's seller name.
- Auth required: No
- Rate limit: 150 requests per 15 minutes per IP (`standardIpLimiter`)
- Handler: `getAllProduct` in `backend/src/controllers/product.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Query | None | — | No | No filtering or pagination query parameters are read |
| Body | None | — | No | No request body is read |

Example request:

```bash
curl http://localhost:4000/api/products
```

Example success response:

```json
200 OK
{
  "success": true,
  "message": "Product fectched successfully",
  "data": {
    "products": []
  }
}
```

Possible error responses:

- `400` — not returned by current handler
- `401` — not required for this public route
- `403` — not implemented for this route
- `404` — not returned for empty collections
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `GET /api/products/:id`

- Method: `GET`
- Path: `/api/products/:id`
- Description: Fetch a single product by MongoDB ObjectId.
- Auth required: No
- Rate limit: 150 requests per 15 minutes per IP (`standardIpLimiter`)
- Handler: `getOneProduct` in `backend/src/controllers/product.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Path | `id` | String | Yes | Must be a valid MongoDB ObjectId |
| Query | None | — | No | No query parameters are read |
| Body | None | — | No | No request body is read |

Example request:

```bash
curl http://localhost:4000/api/products/<product-id>
```

Example success response:

```json
200 OK
{
  "success": true,
  "message": "product fetched successfully",
  "data": {
    "product": {
      "_id": "<product-id>",
      "title": "Canvas Tote Bag",
      "seller": {
        "_id": "<user-id>",
        "name": "Taylor_Store"
      }
    }
  }
}
```

Possible error responses:

- `400` — invalid MongoDB ObjectId
- `401` — not required for this route
- `403` — not implemented for this route
- `404` — product not found
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `PUT /api/products/:id`

- Method: `PUT`
- Path: `/api/products/:id`
- Description: Update a product and optionally replace its images.
- Auth required: Yes — valid access token required
- Rate limit: 100 requests per 15 minutes per IP (`productUpdateLimiter`)
- Handler: `updateProduct` in `backend/src/controllers/product.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | Bearer access token |
| Path | `id` | String | Yes | Must be a valid MongoDB ObjectId |
| Body | `title` | String | Yes | Same rules as product creation |
| Body | `description` | String | Yes | Same rules as product creation |
| Body | `category` | String | Yes | Same rules as product creation |
| Body | `price` | JSON string | Yes | Same structure as product creation |
| Body | `sizes` | JSON string | Yes | Same structure as product creation |
| File | `images` | File[] | No | Replaces existing images when supplied |

Example request:

```bash
curl -X PUT http://localhost:4000/api/products/<product-id> \
  -H "Authorization: Bearer <access-token>" \
  -F 'title=Canvas Tote Bag' \
  -F 'description=Durable everyday tote bag for carrying personal items' \
  -F 'category=Accessories' \
  -F 'price={"amount":34.99,"currency":"USD"}' \
  -F 'sizes=[{"size":"M","stock":12}]' \
  -F 'images=@./replacement.jpg'
```

Example success response:

```json
200 OK
{
  "message": "updated successfully",
  "product": {
    "_id": "<product-id>",
    "title": "Canvas Tote Bag",
    "price": {
      "amount": 34.99,
      "currency": "USD"
    }
  }
}
```

Possible error responses:

- `400` — malformed JSON, invalid product fields, or invalid ObjectId
- `401` — missing or invalid access token
- `403` — not implemented for this route
- `404` — product not found or ImageKit delete/upload issue reported as 404 by the handler
- `429` — rate limit exceeded
- `500` — unexpected database or server error

### `DELETE /api/products/:id`

- Method: `DELETE`
- Path: `/api/products/:id`
- Description: Delete a product and attempt to delete associated ImageKit files.
- Auth required: Yes — valid access token required
- Rate limit: 5 requests per 15 minutes per IP (`productDeleteLimiter`)
- Handler: `deteteProduct` in `backend/src/controllers/product.controller.js`

Request details:

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | Bearer access token |
| Path | `id` | String | Yes | Must be a valid MongoDB ObjectId |
| Query | None | — | No | No query parameters are read |
| Body | None | — | No | No request body is read |

Example request:

```bash
curl -X DELETE http://localhost:4000/api/products/<product-id> \
  -H "Authorization: Bearer <access-token>"
```

Example success response:

```json
200 OK
{
  "success": true,
  "message": "product is delete successfully",
  "imageDeletion": {
    "success": true,
    "message": "images deleted successfully"
  }
}
```

Possible error responses:

- `400` — invalid MongoDB ObjectId
- `401` — missing or invalid access token
- `403` — not implemented for this route
- `404` — product not found
- `429` — rate limit exceeded
- `500` — unexpected database or server error

## Rate limiting

There is no global limiter mounted in `backend/src/app/app.js`; rate limiting is applied only to individual routes via `express-rate-limit`.

### Summary table

| Route(s) | Limit | Window | Scope |
|---|---:|---:|---|
| `POST /api/auth/login` | 5 | 15 minutes | IP |
| `POST /api/auth/register` | 8 | 1 hour | IP |
| `POST /api/auth/logout` | 8 | 1 hour | IP |
| `POST /api/auth/refresh-token`, `GET /api/auth/me`, `GET /api/products`, `GET /api/products/:id` | 150 | 15 minutes | IP |
| `POST /api/products` | 10 | 15 minutes | IP |
| `PUT /api/products/:id` | 100 | 15 minutes | IP |
| `DELETE /api/products/:id` | 5 | 15 minutes | IP |
| `GET /` | None | — | None |

When a limiter triggers, `express-rate-limit` responds with status `429` and default message:

```text
Too many requests, please try again later.
```

The library also sets standard rate-limit headers, including `Retry-After`, when `standardHeaders` is enabled. Some product routes also enable legacy `X-RateLimit-*` headers.

> TODO: Ensure proxy trust is configured correctly before production deployment if the app sits behind a reverse proxy or load balancer.

## Middleware

### Authentication middleware

File: `backend/src/middlewares/auth.middleware.js`

- Reads the bearer token from `req.headers.authorization`
- Splits the header value and extracts the token
- Verifies the JWT using `verifyAccessToken()`
- Stores the decoded `userId` on `req.userId`
- Returns `401` when the token is missing or invalid

### Validation middleware

Files:

- `backend/src/validators/auth.validator.js`
- `backend/src/validators/product.validator.js`

These middleware chains validate:

- registration input
- login input
- product creation/update input
- MongoDB ObjectId parameters

On validation failure, they return `400` with `message` and `errors` arrays from `express-validator`.

### Rate limiting middleware

File: `backend/src/middlewares/rateLimit.middleware.js`

- Registers route-specific limiters such as `registerIpLimiter`, `loginIpLimiter`, `logoutIpLimiter`, `productCreationLimiter`, `productUpdateLimiter`, and `productDeleteLimiter`
- Uses the client IP and `express-rate-limit` defaults for enforcement
- Sets standard headers and legacy headers depending on the limiter configuration

### Error handling middleware

No custom global error-handling middleware is present in the reviewed backend. Most handlers return payloads manually and are not centralized.

### Logging

No dedicated request logging middleware or centralized logger is present in the checked codebase.

## Key functions and utilities

| Function / module | Purpose | Parameters | Return value |
|---|---|---|---|
| `generateToken` — `backend/src/utils/auth.utils.js` | Signs access and refresh JWTs | `userId` | `{ accessToken, refreshToken }` |
| `verifyRefreshToken` — `backend/src/utils/auth.utils.js` | Verifies a refresh token | `token` | Decoded JWT payload |
| `verifyAccessToken` — `backend/src/utils/auth.utils.js` | Verifies an access token | `token` | Decoded JWT payload |
| `authenticate` — `backend/src/middlewares/auth.middleware.js` | Validates bearer token and attaches `req.userId` | `req`, `res`, `next` | Calls `next()` or returns `401` |
| `connectToDB` — `backend/src/config/db.js` | Connects Mongoose to MongoDB | None | Database connection promise |
| `uploadFile` — `backend/src/services/storage.service.js` | Uploads Multer files to ImageKit | `files` | Uploaded file metadata array |
| `deleteUploadedFile` — `backend/src/services/storage.service.js` | Deletes files from ImageKit | `files` | Promise resolving after file delete operations |
| `registerValidator` — `backend/src/validators/auth.validator.js` | Validates registration input | `req`, `res`, `next` | Calls `next()` or returns `400` |
| `loginValidator` — `backend/src/validators/auth.validator.js` | Validates login credentials | `req`, `res`, `next` | Calls `next()` or returns `400` |
| `productValidator` — `backend/src/validators/product.validator.js` | Validates product creation payload | `req`, `res`, `next` | Calls `next()` or returns `400` |
| `updateValidator` — `backend/src/validators/product.validator.js` | Validates product update payload | `req`, `res`, `next` | Calls `next()` or returns `400` |
| `productPramId` — `backend/src/validators/product.validator.js` | Validates MongoDB ObjectId in params | `req`, `res`, `next` | Calls `next()` or returns `400` |

## Database models and schema overview

### User model

File: `backend/src/models/user.model.js`

| Field | Type | Notes |
|---|---|---|
| `email` | String | Required, unique, lowercase |
| `name` | String | Required, trimmed, min 2, max 50 |
| `passwordHash` | String | Required; stores bcrypt hash |
| `confirmPasswordHash` | String | Required; stores bcrypt hash for confirm-password check |
| `refreshTokenHash` | String | Optional; stores SHA-256 hash of refresh token |
| `createdAt`, `updatedAt` | Date | Added by Mongoose timestamps |

### Product model

File: `backend/src/models/product.model.js`

| Field | Type | Notes |
|---|---|---|
| `title` | String | Required, min 10, max 100 |
| `description` | String | Required, min 20, max 500 |
| `category` | String | Required, min 3, max 50 |
| `price.amount` | Number | Non-negative numeric amount |
| `price.currency` | String | `INR` or `USD` |
| `images` | Array | Each item includes `url` and `fileId`; max 5 images |
| `sizes` | Array | Each item includes `size` and `stock` |
| `seller` | ObjectId | Required reference to the user who created the item |
| `createdAt`, `updatedAt` | Date | Added by Mongoose timestamps |

## Error handling

There is no single standardized global error response format in this backend. Current handlers and validators return varying shapes depending on the route.

Common examples observed in the code:

```json
{
  "message": "Invalid Request",
  "errors": [
    {
      "type": "field",
      "path": "email",
      "msg": "Invalid Email"
    }
  ]
}
```

Another common format:

```json
{
  "message": "Unauthorized",
  "errors": [
    {
      "field": "refreshToken",
      "message": "Refresh token is Invalid"
    }
  ]
}
```

Some handlers respond with only a message and no `errors` array. There is no custom global error middleware in the checked project.

> TODO: Standardize error responses and add a single application-wide error handler.

## Testing

No automated tests are configured in the project yet.

The current `test` script is a placeholder:

```bash
cd backend
npm test
```

This script currently exits with an error because there are no tests configured.

> TODO: Add automated tests for authentication, validation, rate limiting, and CRUD flows.

## Deployment notes

- Set all environment variables in your deployment platform or secret manager
- Do not commit `.env` files to version control
- Ensure MongoDB is reachable from the hosting environment
- Configure ImageKit credentials correctly for upload and delete operations
- Use HTTPS in production for all traffic
- Review cookie security settings because refresh tokens are set with `httpOnly: true` but no `secure` or `sameSite` attributes are configured in the reviewed code
- Configure Express proxy trust correctly if deployed behind Nginx, Cloudflare, or another reverse proxy
- Add a proper production `start` script and deployment process

> TODO: Document the actual hosting target and deployment workflow if this project is deployed to a platform or VM.

## Contributing

Contributions are welcome. Please keep changes focused, document new behavior, and add tests for any modified logic.

Current project conventions:

- No linting config is defined
- No formatter config is defined
- No explicit contribution guidelines are defined

> TODO: Add contribution guidelines, branch strategy, review workflow, and code style rules.

## License

No license file or explicit license declaration was found in the reviewed repository snapshot.

> TODO: Select an open-source license and add a `LICENSE` file before public distribution.

## Route summary

| Method | Path | Auth | Rate Limit | Handler |
|---|---|---|---|---|
| `GET` | `/` | No | None | Inline handler in `backend/src/app/app.js` |
| `POST` | `/api/auth/register` | No | 8 / 1 hour / IP | `regsiterController` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/auth/login` | No | 5 / 15 minutes / IP | `loginController` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/auth/refresh-token` | Refresh cookie required | 150 / 15 minutes / IP | `refreshTokenController` — `backend/src/controllers/auth.controller.js` |
| `GET` | `/api/auth/me` | Yes — bearer access token | 150 / 15 minutes / IP | `getMe` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/auth/logout` | Yes — bearer access token | 8 / 1 hour / IP | `logoutController` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/products` | Yes — bearer access token | 10 / 15 minutes / IP | `createProduct` — `backend/src/controllers/product.controller.js` |
| `GET` | `/api/products` | No | 150 / 15 minutes / IP | `getAllProduct` — `backend/src/controllers/product.controller.js` |
| `GET` | `/api/products/:id` | No | 150 / 15 minutes / IP | `getOneProduct` — `backend/src/controllers/product.controller.js` |
| `PUT` | `/api/products/:id` | Yes — bearer access token | 100 / 15 minutes / IP | `updateProduct` — `backend/src/controllers/product.controller.js` |
| `DELETE` | `/api/products/:id` | Yes — bearer access token | 5 / 15 minutes / IP | `deteteProduct` — `backend/src/controllers/product.controller.js` |

| Item | Details |
|---|---|
| Auth required | No |
| Rate limit | 8 requests per 1 hour per IP |
| Handler | `regsiterController` — `backend/src/controllers/auth.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Body | `name` | String | Yes | 2–50 characters; must start with a letter and contain letters, digits, or underscores. |
| Body | `email` | String | Yes | Must be a valid email address; normalized by the validator. |
| Body | `password` | String | Yes | 6–50 characters; validator rejects a value beginning with whitespace. |
| Body | `confirmPassword` | — | No | Not implemented. **TODO:** add confirmation if required. |

**Example**

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Taylor_Store","email":"taylor@example.com","password":"example-password"}'
```

**Success response — `201 Created`**

```json
{
  "message": "Registration successfull",
  "data": {
    "user": {
      "userId": "<created-user-id>",
      "email": "taylor@example.com",
      "name": "Taylor_Store"
    }
  }
}
```

**Possible errors**

- `400 Bad Request` — validation failed; response includes `message` and an
  `errors` array.
- `401 Unauthorized` — not returned by this public handler.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — not returned by current handler.
- `409 Conflict` — an account with that email already exists.
- `429 Too Many Requests` — the IP-based registration limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

#### `POST /api/auth/login`

**Description:** Verify credentials, issue an access token, persist a hash of
the refresh token, and set the refresh token in an HTTP-only cookie.

| Item | Details |
|---|---|
| Auth required | No |
| Rate limit | 5 requests per 15 minutes per IP |
| Handler | `loginController` — `backend/src/controllers/auth.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Body | `email` | String | Yes | Must be a valid email address; normalized by the validator. |
| Body | `password` | String | Yes | 6–50 characters; validator rejects a value beginning with whitespace. |

**Example**

```bash
curl -i -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"taylor@example.com","password":"example-password"}'
```

**Success response — `200 OK`**

```json
{
  "message": "login successful",
  "data": {
    "user": {
      "userId": "<user-id>",
      "email": "taylor@example.com",
      "name": "Taylor_Store"
    },
    "accessToken": "<access-token>"
  }
}
```

The response also sets a `refreshToken` cookie with `httpOnly: true`. The current
code does not set `secure` or `sameSite` cookie attributes.

**Possible errors**

- `400 Bad Request` — validation failed.
- `401 Unauthorized` — email or password is invalid; the handler uses a generic
  credential error message.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — not returned for unknown users; those return `401`.
- `429 Too Many Requests` — the IP-based login limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

#### `POST /api/auth/refresh-token`

**Description:** Verify the refresh-token cookie against its JWT signature and
stored SHA-256 hash, rotate it, and issue a new access token.

| Item | Details |
|---|---|
| Auth required | No bearer token; a valid refresh-token cookie is required |
| Rate limit | 150 requests per 15 minutes per IP |
| Handler | `refreshTokenController` — `backend/src/controllers/auth.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Cookie | `refreshToken` | String | Yes | Refresh JWT set by login or a previous refresh. |
| Query | None | — | — | No query parameters are read. |
| Body | None | — | — | No request body is read. |

**Example**

```bash
curl -i -X POST http://localhost:4000/api/auth/refresh-token \
  --cookie "refreshToken=<refresh-token>"
```

**Success response — `200 OK`**

```json
{
  "message": "token rotated successsfully",
  "data": {
    "accessToken": "<new-access-token>"
  }
}
```

The response also sets the rotated `refreshToken` cookie.

**Possible errors**

- `400 Bad Request` — not explicitly returned by the handler.
- `401 Unauthorized` — cookie missing/invalid/expired, user no longer exists, or
  token hash does not match the stored hash.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — not returned; a missing user returns `401`.
- `429 Too Many Requests` — the IP-based limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

#### `GET /api/auth/me`

**Description:** Return the authenticated user's ID, name, and email.

| Item | Details |
|---|---|
| Auth required | Yes — any user with a valid access JWT; no role check |
| Rate limit | 150 requests per 15 minutes per IP |
| Handler | `getMe` — `backend/src/controllers/auth.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | `Bearer <access-token>` |

**Example**

```bash
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <access-token>"
```

**Success response — `200 OK`**

```json
{
  "message": "successfully fetched user",
  "data": {
    "user": {
      "userId": "<user-id>",
      "name": "Taylor_Store",
      "email": "taylor@example.com"
    }
  }
}
```

**Possible errors**

- `400 Bad Request` — not returned by current handler.
- `401 Unauthorized` — missing, invalid, or expired access token.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — token is valid but its user no longer exists.
- `429 Too Many Requests` — the IP-based limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

#### `POST /api/auth/logout`

**Description:** Invalidate the authenticated user's stored refresh-token hash
and clear the refresh-token cookie.

| Item | Details |
|---|---|
| Auth required | Yes — any user with a valid access JWT; no role check |
| Rate limit | 8 requests per 1 hour per IP |
| Handler | `logoutController` — `backend/src/controllers/auth.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | `Bearer <access-token>` |

**Example**

```bash
curl -i -X POST http://localhost:4000/api/auth/logout \
  -H "Authorization: Bearer <access-token>" \
  --cookie "refreshToken=<refresh-token>"
```

**Success response — `200 OK`**

```json
{
  "message": "user logged out successfully"
}
```

The response clears the `refreshToken` cookie.

**Possible errors**

- `400 Bad Request` — not returned by current handler.
- `401 Unauthorized` — missing, invalid, or expired access token.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — authenticated user record no longer exists; cookie is
  cleared.
- `429 Too Many Requests` — the IP-based logout limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

### Products

Product create and update accept `multipart/form-data`. The `price` and `sizes`
fields must each contain a JSON-encoded string because the route parses them
before validation. Uploaded files use the field name `images`. Multer is
configured for at most 5 files, with a 20 MiB maximum size per file.

#### `POST /api/products`

**Description:** Create a product and upload any provided images to ImageKit.

| Item | Details |
|---|---|
| Auth required | Yes — any authenticated user; no role check |
| Rate limit | 10 requests per 15 minutes per IP |
| Handler | `createProduct` — `backend/src/controllers/product.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | `Bearer <access-token>` |
| Body | `title` | String | Yes | 10–100 characters; letters, numbers, spaces, and hyphens. |
| Body | `description` | String | Yes | 20–500 characters; letters, numbers, spaces, and hyphens. |
| Body | `category` | String | Yes | 5–50 characters; English letters, spaces, and hyphens. |
| Body | `price` | JSON string | Yes | JSON object with numeric `amount` (non-negative) and `currency` (`INR` or `USD`). |
| Body | `sizes` | JSON string | Yes | JSON array of objects with a supported `size` and non-negative integer `stock`. |
| File | `images` | File(s) | No | Uploaded image files; maximum 5 files, 20 MiB each. |

**Example**

```bash
curl -X POST http://localhost:4000/api/products \
  -H "Authorization: Bearer <access-token>" \
  -F 'title=Canvas Tote Bag' \
  -F 'description=Durable everyday tote bag for carrying personal items' \
  -F 'category=Accessories' \
  -F 'price={"amount":29.99,"currency":"USD"}' \
  -F 'sizes=[{"size":"M","stock":10}]' \
  -F 'images=@./sample.jpg'
```

**Success response — `201 Created`**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "<product-id>",
      "title": "Canvas Tote Bag",
      "description": "Durable everyday tote bag for carrying personal items",
      "category": "Accessories",
      "price": {
        "amount": 29.99,
        "currency": "USD"
      },
      "images": [
        {
          "url": "<ImageKit-url>",
          "fileId": "<ImageKit-file-id>"
        }
      ],
      "sizes": [
        {
          "size": "M",
          "stock": 10
        }
      ],
      "seller": "<user-id>"
    }
  }
}
```

The document also includes Mongoose timestamps.

**Possible errors**

- `400 Bad Request` — invalid multipart JSON in `price` or `sizes`, or field
  validation failed.
- `401 Unauthorized` — missing, invalid, or expired access token.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — not returned by the create handler.
- `429 Too Many Requests` — the IP-based product-creation limit was exceeded.
- `500 Internal Server Error` — unexpected ImageKit, database, or server error;
  no custom global error response is defined.

#### `GET /api/products`

**Description:** Return all products and populate each seller's name. No
pagination is implemented.

| Item | Details |
|---|---|
| Auth required | No |
| Rate limit | 150 requests per 15 minutes per IP |
| Handler | `getAllProduct` — `backend/src/controllers/product.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Query | None | — | — | No filtering or pagination query parameters are read. |
| Body | None | — | — | No request body is read. |

**Example**

```bash
curl http://localhost:4000/api/products
```

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Product fectched successfully",
  "data": {
    "products": []
  }
}
```

`products` contains the matching product documents; an empty collection yields
an empty array.

**Possible errors**

- `400 Bad Request` — not returned by current handler.
- `401 Unauthorized` — not required for this public route.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — not returned for an empty collection.
- `429 Too Many Requests` — the IP-based read limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

#### `GET /api/products/:id`

**Description:** Return one product by MongoDB ID and populate the seller's
name.

| Item | Details |
|---|---|
| Auth required | No |
| Rate limit | 150 requests per 15 minutes per IP |
| Handler | `getOneProduct` — `backend/src/controllers/product.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Path | `id` | String | Yes | Must be a valid MongoDB ObjectId. |

**Example**

```bash
curl http://localhost:4000/api/products/<product-id>
```

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "product fetched successfully",
  "data": {
    "product": {
      "_id": "<product-id>",
      "title": "Canvas Tote Bag",
      "seller": {
        "_id": "<user-id>",
        "name": "Taylor_Store"
      }
    }
  }
}
```

The response includes the other fields stored on the product document as well.

**Possible errors**

- `400 Bad Request` — `id` is not a valid MongoDB ObjectId.
- `401 Unauthorized` — not required for this public route.
- `403 Forbidden` — not returned by current code.
- `404 Not Found` — no product exists for the valid ID.
- `429 Too Many Requests` — the IP-based read limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  error response is defined.

#### `PUT /api/products/:id`

**Description:** Update product fields and optionally replace its images. The
validator requires the full set of product fields, so this is not a partial
update endpoint.

| Item | Details |
|---|---|
| Auth required | Yes — any authenticated user; no role or ownership check |
| Rate limit | 10 requests per 15 minutes per IP |
| Handler | `updateProduct` — `backend/src/controllers/product.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | `Bearer <access-token>` |
| Path | `id` | String | Yes | Must be a valid MongoDB ObjectId. |
| Body | `title` | String | Yes | Same validation as product creation. |
| Body | `description` | String | Yes | Same validation as product creation. |
| Body | `category` | String | Yes | Same validation as product creation. |
| Body | `price` | JSON string | Yes | Same structure and validation as product creation. |
| Body | `sizes` | JSON string | Yes | Same structure and validation as product creation. |
| File | `images` | File(s) | No | If provided, uploaded images replace the existing image set; maximum 5 files, 20 MiB each. |

**Example**

```bash
curl -X PUT http://localhost:4000/api/products/<product-id> \
  -H "Authorization: Bearer <access-token>" \
  -F 'title=Canvas Tote Bag' \
  -F 'description=Durable everyday tote bag for carrying personal items' \
  -F 'category=Accessories' \
  -F 'price={"amount":34.99,"currency":"USD"}' \
  -F 'sizes=[{"size":"M","stock":12}]' \
  -F 'images=@./replacement.jpg'
```

**Success response — `200 OK`**

```json
{
  "message": "updated successfully",
  "product": {
    "_id": "<product-id>",
    "title": "Canvas Tote Bag",
    "price": {
      "amount": 34.99,
      "currency": "USD"
    }
  }
}
```

**Possible errors**

- `400 Bad Request` — malformed multipart JSON, invalid product fields, or
  invalid product ID.
- `401 Unauthorized` — missing, invalid, or expired access token.
- `403 Forbidden` — not returned; the current handler does not enforce seller
  ownership.
- `404 Not Found` — product does not exist, or an image delete/upload operation
  fails (the latter is currently reported as `404` by the handler).
- `429 Too Many Requests` — the IP-based product-update limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  global error response is defined.

#### `DELETE /api/products/:id`

**Description:** Delete a product and attempt to delete its ImageKit files.

| Item | Details |
|---|---|
| Auth required | Yes — any authenticated user; no role or ownership check |
| Rate limit | 5 requests per 15 minutes per IP |
| Handler | `deteteProduct` — `backend/src/controllers/product.controller.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Header | `Authorization` | String | Yes | `Bearer <access-token>` |
| Path | `id` | String | Yes | Must be a valid MongoDB ObjectId. |

**Example**

```bash
curl -X DELETE http://localhost:4000/api/products/<product-id> \
  -H "Authorization: Bearer <access-token>"
```

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "product is delete successfully",
  "imageDeletion": {
    "success": true,
    "message": "images deleted successfully"
  }
}
```

If ImageKit deletion fails, the handler still deletes the database product and
returns `200`; `imageDeletion.success` is `false` and an `errors` array is
included in `imageDeletion`.

**Possible errors**

- `400 Bad Request` — `id` is not a valid MongoDB ObjectId.
- `401 Unauthorized` — missing, invalid, or expired access token.
- `403 Forbidden` — not returned; the current handler does not enforce seller
  ownership.
- `404 Not Found` — no product exists for the valid ID.
- `429 Too Many Requests` — the IP-based product-deletion limit was exceeded.
- `500 Internal Server Error` — unexpected database or server error; no custom
  global error response is defined.

## Rate limiting

There is **no global limiter** mounted in `app.js`. The following per-route
limiters are configured with `express-rate-limit`. They use the request IP as
the default key; they are not per-account or per-user limits.

| Routes | Limit | Window | Headers |
|---|---:|---:|---|
| `POST /api/auth/login` | 5 | 15 minutes | Standard headers; legacy headers disabled |
| `POST /api/auth/register` | 8 | 1 hour | Standard headers; legacy headers disabled |
| `POST /api/auth/logout` | 8 | 1 hour | Standard headers; legacy headers disabled |
| `POST /api/auth/refresh-token`, `GET /api/auth/me`, `GET /api/products`, `GET /api/products/:id` | 150 | 15 minutes | Standard headers; legacy headers disabled |
| `POST /api/products` | 10 | 15 minutes | Standard and legacy headers |
| `PUT /api/products/:id` | 10 | 15 minutes | Standard and legacy headers |
| `DELETE /api/products/:id` | 5 | 15 minutes | Standard and legacy headers |
| `GET /` | No route-specific limiter | — | — |

When a limit is exceeded, the library responds with status `429` and the default
message `Too many requests, please try again later.` The configured standard
headers are enabled, and `Retry-After` is set by the library. Legacy
`X-RateLimit-*` headers are enabled on product create, update, and delete only.

**TODO:** configure and verify Express proxy trust settings before deploying
behind a reverse proxy, because IP-based limiting depends on the client IP
reported to Express.

## Middleware

- **JSON and cookie parsing:** `express.json()` and `cookieParser()` are mounted
  in `backend/src/app/app.js`.
- **Authentication:** `authenticate` in
  `backend/src/middlewares/auth.middleware.js` extracts the token from the
  `Authorization` header, verifies it, and assigns the decoded `userId` to
  `req.userId`. It returns `401` if the token is absent or invalid.
- **Validation:** `express-validator` chains in `backend/src/validators/`
  validate authentication bodies, product bodies, and product IDs. Validation
  failures are returned as `400` responses with an `errors` array. Product
  multipart `price` and `sizes` strings are parsed before those validators run;
  JSON parsing errors return `400`.
- **Rate limiting:** Route-specific limiters are applied in the route files.
- **Error handling:** There is no custom global error-handling middleware or
  request-logging middleware in the checked backend.

## Key functions and utilities

| Function | Purpose | Parameters | Return / effect |
|---|---|---|---|
| `generateToken` — `backend/src/utils/auth.utils.js` | Signs access and refresh JWTs using configured secrets and expiry values. | `userId` | `{ accessToken, refreshToken }` |
| `verifyAccessToken` — `backend/src/utils/auth.utils.js` | Verifies an access JWT. | `token` | Decoded JWT payload; throws on invalid/expired tokens. |
| `verifyRefreshToken` — `backend/src/utils/auth.utils.js` | Verifies a refresh JWT. | `token` | Decoded JWT payload; throws on invalid/expired tokens. |
| `authenticate` — `backend/src/middlewares/auth.middleware.js` | Validates a bearer access token and attaches its `userId` to the request. | `req`, `res`, `next` | Calls `next()` when authenticated; otherwise sends `401`. |
| `connectToDB` — `backend/src/config/db.js` | Connects Mongoose to `MONGO_URI`. | None | Promise resolving after connection; rejects if connection fails. |
| `uploadFile` — `backend/src/services/storage.service.js` | Uploads in-memory Multer files to the `StoreAPI` ImageKit folder. | Array of Multer files | Promise resolving to ImageKit upload results. |
| `deleteUploadedFile` — `backend/src/services/storage.service.js` | Deletes ImageKit files by their `fileId`. | Array of image objects with `fileId` | Promise resolving after deletion; rejects if a deletion fails. |
| `registerValidator`, `loginValidator` — `backend/src/validators/auth.validator.js` | Validate auth request bodies and send validation errors. | Express request/response/next through middleware | Calls `next()` or sends `400`. |
| `productValidator`, `updateValidator`, `productPramId` — `backend/src/validators/product.validator.js` | Validate product fields and product IDs. | Express request/response/next through middleware | Calls `next()` or sends `400`. |

## Database models

### User (`users`)

Defined in `backend/src/models/user.model.js`.

| Field | Type | Notes |
|---|---|---|
| `email` | String | Required, unique, lowercase |
| `name` | String | Required, trimmed, 2–50 characters |
| `passwordHash` | String | Required; stores the bcrypt hash, not the submitted password |
| `refreshTokenHash` | String | Stores the SHA-256 hash used to validate/revoke the refresh token |
| `createdAt`, `updatedAt` | Date | Added by Mongoose timestamps |

### Product (`products`)

Defined in `backend/src/models/product.model.js`.

| Field | Type | Notes |
|---|---|---|
| `title` | String | Required, 10–100 characters |
| `description` | String | Required, 20–500 characters |
| `category` | String | Required, 5–50 characters |
| `price.amount` | Number | Non-negative in request validation |
| `price.currency` | String | `INR` or `USD`; defaults to `INR` |
| `images` | Array | Each item stores an ImageKit `url` and `fileId`; maximum 5 items |
| `sizes` | Array | Each item has a size (`XS`, `S`, `M`, `L`, `XL`, `XXL`, `XXXL`) and stock |
| `seller` | ObjectId | Required reference to a user |
| `createdAt`, `updatedAt` | Date | Added by Mongoose timestamps |

## Error handling

There is no single standard error response shape implemented across the API.
Current handlers and validators use several shapes, including:

```json
{
  "message": "Invalid Request",
  "errors": [
    {
      "type": "field",
      "path": "email",
      "msg": "Invalid Email"
    }
  ]
}
```

Some handlers use `errors`, some use `error`, and some return only `message`.
Unexpected errors are not mapped by a custom global error handler.

**TODO:** standardize error response shape and document the exact production
behavior for unhandled errors.

## Testing

There are no project tests configured. The `test` script in `backend/package.json`
is a placeholder that prints an error and exits with status 1.

```bash
cd backend
npm test
```

**TODO:** add automated tests for authentication, validation, rate limits,
product CRUD, ImageKit failures, and unauthorized product ownership behavior.

## Deployment notes

- Set all environment variables in the hosting platform's secret/config store;
  do not deploy a committed `.env`.
- Fix the `prpcess` typo in `backend/src/config/config.js` before startup.
- Choose and configure access and refresh token expiration values.
- Configure `secure` and appropriate `sameSite` attributes for refresh-token
  cookies in production; current code only sets `httpOnly`.
- Use HTTPS for production traffic and protect JWT and ImageKit secrets.
- Configure Express proxy trust correctly if deployed behind a reverse proxy,
  then verify IP-based rate limits.
- The server connects to MongoDB before listening. Ensure the database is
  reachable from the deployment environment.
- Product uploads require a working ImageKit private key.
- There is no declared production `start` script, automated test suite, or
  documented deployment target. **TODO:** add these deployment details.
- A `frontend/` directory exists but contains no checked project files.
  **TODO:** implement and document the frontend if it is part of this project.

## Contributing

Contributions should include a clear description of the change and tests for
behavior that is added or modified. No contribution guidelines or lint/format
scripts are currently defined.

**TODO:** define contribution, branch, review, and formatting guidelines.

## License

No license file or license declaration was present in the checked project.

**TODO:** select a license and add its text to the repository before
redistribution.

## Route summary

| Method | Path | Auth | Rate limit | Handler |
|---|---|---|---|---|
| `GET` | `/` | No | None route-specific | Inline handler — `backend/src/app/app.js` |
| `POST` | `/api/auth/register` | No | 8 / 1 hour / IP | `regsiterController` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/auth/login` | No | 5 / 15 minutes / IP | `loginController` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/auth/refresh-token` | Refresh cookie | 150 / 15 minutes / IP | `refreshTokenController` — `backend/src/controllers/auth.controller.js` |
| `GET` | `/api/auth/me` | Yes — bearer access token | 150 / 15 minutes / IP | `getMe` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/auth/logout` | Yes — bearer access token | 8 / 1 hour / IP | `logoutController` — `backend/src/controllers/auth.controller.js` |
| `POST` | `/api/products` | Yes — bearer access token | 10 / 15 minutes / IP | `createProduct` — `backend/src/controllers/product.controller.js` |
| `GET` | `/api/products` | No | 150 / 15 minutes / IP | `getAllProduct` — `backend/src/controllers/product.controller.js` |
| `GET` | `/api/products/:id` | No | 150 / 15 minutes / IP | `getOneProduct` — `backend/src/controllers/product.controller.js` |
| `PUT` | `/api/products/:id` | Yes — bearer access token | 10 / 15 minutes / IP | `updateProduct` — `backend/src/controllers/product.controller.js` |
| `DELETE` | `/api/products/:id` | Yes — bearer access token | 5 / 15 minutes / IP | `deteteProduct` — `backend/src/controllers/product.controller.js` |
