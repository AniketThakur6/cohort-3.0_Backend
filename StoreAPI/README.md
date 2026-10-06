# StoreAPI

StoreAPI is a Node.js/Express backend for user authentication and product catalog
CRUD. It stores users and products in MongoDB, uses JWT access and refresh
tokens, and uploads product images through ImageKit.

> **Setup note:** The current backend has a startup-blocking typo in
> `backend/src/config/config.js` (`prpcess.env.ACCESS_TOKEN_EXPIRY`). Correct
> that reference to `process.env` before starting the server. Also, the
> `dev` script invokes `nodemon`, but `nodemon` is not declared in
> `backend/package.json`; add it as a development dependency or use the direct
> Node.js command shown below.

## Table of contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Installation and setup](#installation-and-setup)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
  - [Root endpoint](#get-)
  - [Authentication](#authentication)
  - [Products](#products)
- [Rate limiting](#rate-limiting)
- [Middleware](#middleware)
- [Key functions and utilities](#key-functions-and-utilities)
- [Database models](#database-models)
- [Error handling](#error-handling)
- [Testing](#testing)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)
- [Route summary](#route-summary)

## Features

- Register users and hash their passwords with `bcryptjs`.
- Log in with email and password; return an access token and set a refresh-token
  cookie.
- Store a SHA-256 hash of the refresh token for revocation and rotate the token
  on refresh.
- Authenticate protected routes with a bearer access token.
- Create, list, retrieve, update, and delete products.
- Upload product images to ImageKit when creating or updating products.
- Validate authentication and product request fields using
  `express-validator`.
- Apply IP-based request limits to authentication and product routes.

## Technology stack

| Area | Technology |
|---|---|
| Runtime | Node.js (ES modules) |
| HTTP framework | Express 5 |
| Database / ODM | MongoDB / Mongoose |
| Authentication | JSON Web Tokens (`jsonwebtoken`) |
| Password hashing | `bcryptjs` |
| Validation | `express-validator` |
| Rate limiting | `express-rate-limit` |
| Upload handling | Multer (in-memory storage) |
| Image storage | ImageKit (`@imagekit/nodejs`) |
| Cookie parsing | `cookie-parser` |

## Project structure

```text
StoreAPI/
├── README.md
├── backend/
│   ├── package-lock.json
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
    └── TODO: frontend files are not present in the checked project tree
```

## Installation and setup

### Prerequisites

- A Node.js installation compatible with the installed dependencies.
- A MongoDB connection URI.
- JWT access-token and refresh-token secrets.
- An ImageKit private key to use product image upload and deletion.

### Install dependencies

```bash
cd backend
npm install
```

### Configure environment

Create `backend/.env` using the variable names in
[Environment variables](#environment-variables). Do not commit `.env` or put
real secrets in this README.

Before starting, fix the `prpcess` typo noted above. To use `npm run dev`,
install and declare `nodemon` as a development dependency; it is not currently
listed in the package manifest.

### Development

Once those setup gaps have been resolved:

```bash
npm run dev
```

The configured script runs `nodemon ./src/server.js`.

### Direct / production process

The project does not define a production `start` script. The server entry point
can be launched directly:

```bash
node ./src/server.js
```

This command also requires the configuration typo to be fixed and the required
environment variables and database to be available. **TODO:** define and
document a production start command and deployment process.

## Environment variables

Values below are examples/placeholders only. Actual secrets and deployment
values must be supplied outside source control.

| Name | Description | Example value |
|---|---|---|
| `PORT` | HTTP port; the server falls back to `4000` when this value is falsy. | `4000` |
| `MONGO_URI` | MongoDB connection URI passed to Mongoose. | `mongodb://<host>:<port>/<database>` |
| `ACCESS_SECRET_TOKEN` | Secret used to sign and verify access JWTs. | `<set-a-long-random-secret>` |
| `REFRESH_SECRET_TOKEN` | Secret used to sign and verify refresh JWTs. | `<set-a-different-long-random-secret>` |
| `ACCESS_TOKEN_EXPIRY` | Access-token expiry passed to `jsonwebtoken`. **TODO:** choose and document a value. | `<TODO>` |
| `REFRESH_TOKEN_EXPIRY` | Refresh-token expiry passed to `jsonwebtoken`. **TODO:** choose and document a value. | `<TODO>` |
| `IMAGEKIT_SECRET_KEY` | ImageKit private key used by the storage service. | `<ImageKit-private-key>` |

`ACCESS_TOKEN_EXPIRY` currently has a configuration typo in
`backend/src/config/config.js`: the code says `prpcess.env` instead of
`process.env`. As written, importing that module throws a `ReferenceError`.
**TODO:** correct this before the application can start.

## API reference

Base URL: `http://localhost:4000` when `PORT` is not set. API paths below include
the `/api` prefix where applicable.

Unless otherwise stated, no endpoint accepts query parameters. Route handlers
do not implement role-based authorization; protected write endpoints accept
any authenticated user. Product ownership enforcement is **TODO**.

### `GET /`

**Description:** Basic server response.

| Item | Details |
|---|---|
| Auth required | No |
| Rate limit | No route-specific limiter |
| Handler | Inline handler in `backend/src/app/app.js` |

**Request**

| Location | Name | Type | Required | Description |
|---|---|---|---|---|
| Query | None | — | — | No query parameters are read. |
| Body | None | — | — | No request body is read. |

**Example**

```bash
curl http://localhost:4000/
```

**Success response — `200 OK`**

```text
working
```

**Possible errors:** No route-specific error responses are defined. A `500`
could occur from an unexpected server failure; there is no custom global error
handler.

### Authentication

#### `POST /api/auth/register`

**Description:** Create a user account. Passwords are hashed before storage;
this handler does not return tokens.

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
