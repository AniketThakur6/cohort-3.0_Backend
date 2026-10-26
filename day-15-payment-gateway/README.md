# Razorpay Payment Gateway Demo

A small Express, MongoDB, and Razorpay integration demonstrating how to create products, create Razorpay orders, open Razorpay Checkout, and verify a payment signature on the server.

## How the payment flow works

1. Create a product through the API. The product is stored in MongoDB with its price in the major currency unit (for example, `499` INR).
2. The browser loads the product list and displays a **Pay Now** button for each product.
3. When a customer clicks the button, the browser asks the server to create an order for that product.
4. The server looks up the product, converts its price to the smallest currency unit (for INR, paise), creates an order using the Razorpay server SDK, and stores a pending payment record.
5. The browser opens Razorpay Checkout using the returned order details and public Key ID.
6. After Checkout reports a payment, the browser sends the order ID, payment ID, and signature to the server.
7. The server computes the expected signature with the Razorpay Key Secret and compares it with the signature received from Checkout.

The Key Secret must stay on the server. Do not put it in the HTML, browser JavaScript, or any other client-side code.

## Project structure

```text
day-15-payment-gateway/
├── README.md
└── server/
    ├── package.json
    └── src/
        ├── app/
        │   └── app.js
        ├── config/
        │   ├── config.js
        │   ├── db.js
        │   └── razorpay.js
        ├── controllers/
        │   └── payment.controller.js
        ├── models/
        │   ├── payment.model.js
        │   └── product.model.js
        ├── public/
        │   └── index.html
        ├── routes/
        │   └── payment.route.js
        └── server.js
```

## Requirements

- Node.js and npm
- A MongoDB database, local or hosted
- A Razorpay account with API keys (use test-mode keys while developing)

## Configuration

Create `server/.env` with your local values:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/payment-gateway
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

Use the values from your Razorpay Dashboard. Keep `.env` private and out of version control. The server loads these values from `server/src/config/config.js`; the Razorpay SDK is initialized in `server/src/config/razorpay.js`.

## Run the server

In a terminal:

```bash
cd server
npm install
npm run dev
```

The server connects to MongoDB before listening on the configured port. Open `http://localhost:3000/` to load the demo page.

## API reference

The payment router is mounted at `/api/payment`.

### Create a product

`POST /api/payment/create-product`

Request JSON:

```json
{
  "name": "Demo product",
  "price": 499,
  "currency": "INR"
}
```

The product model stores the name, price, and currency. The current controller expects a currency string because it calls `.toUpperCase()` on it.

### List products

`GET /api/payment/get-product`

Returns a `products` array used by the demo page to render product cards.

### Create a Razorpay order

`POST /api/payment/create/order/:productId`

Replace `:productId` with a product's MongoDB ID. For example:

```text
POST http://localhost:3000/api/payment/create/order/PRODUCT_ID
```

On success, the response includes the Razorpay `orderId`, amount in the smallest currency unit, currency, public `keyId`, and product name. Use these values to initialize Checkout. For INR, a product priced at `499` is sent to Razorpay as `49900` paise.

### Verify a payment

`POST /api/payment/verify`

Send the Checkout handler response as JSON:

```json
{
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "..."
}
```

The expected signature is an HMAC SHA-256 digest of:

```text
razorpay_order_id|razorpay_payment_id
```

using `RAZORPAY_KEY_SECRET`. The server compares that digest with `razorpay_signature`.

## Data models

- **Product**: name, price, currency, and Mongoose timestamps.
- **Payment**: Razorpay order ID, payment ID and signature (when verified), amount, currency, product reference, user reference, status, and timestamps.
- Payment status is represented by `pending`, `completed`, or `failed`.

## Important implementation notes

- The demo currently assigns payments to a hard-coded user ID in `createOrder`. Replace this with the authenticated user's ID before using the flow in an application.
- The verification controller should stop and return immediately when the signature is invalid. It should only mark the payment completed after a successful comparison; also handle the case where no pending payment record matches the order ID.
- A browser Checkout callback is not, by itself, proof that a payment is valid. Trust only the server-side signature verification result, and consider using Razorpay webhooks to receive payment status updates reliably.
- Validate product input (including positive prices and supported currencies) before saving or creating an order.
- The demo HTML inserts product names into the page. Escape or safely render user-provided values before using this approach beyond a local demonstration.
- For production, use HTTPS, protect endpoints against abuse, add authentication/authorization as appropriate, and never log secrets or payment credentials.

## Troubleshooting

- **Missing key / “No key passed”**: ensure the create-order response has `keyId`, and initialize Checkout with `key: data.keyId` (where `data` is the Axios response body, `response.data`).
- **`require is not defined` in the browser**: the Razorpay Node SDK is server-side only. Use the Checkout script in the browser and `import Razorpay from "razorpay"` in the Node ES module backend.
- **HMAC `ERR_INVALID_ARG_TYPE`**: join the IDs using the pipe character inside a string: `` `${razorpay_order_id}|${razorpay_payment_id}` ``. Do not use JavaScript's bitwise `|` operator between the IDs.
- **Product button says `product is not defined`**: interpolate the product ID into the generated button's click handler, rather than referring to the `.map()` callback variable at click time.
- **A comma appears between product cards**: `.map()` returns an array; use `.join("")` before assigning the result to `innerHTML`.
