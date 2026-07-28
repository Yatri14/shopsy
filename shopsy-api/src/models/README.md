# Shopsy MongoDB database design

## Collections

- Users
- Products
- Orders
- Categories
- Brands
- Reviews
- Coupons
- Addresses
- Payments
- Wishlist
- Cart
- Notifications
- OTP
- Sessions

## Core relationships

- Users 1:N Addresses
- Users 1:N Orders
- Users 1:N Reviews
- Users 1:N Payments
- Users 1:1 Cart
- Users 1:1 Wishlist
- Users 1:N Notifications
- Users 1:N Sessions
- Products N:1 Categories
- Products N:1 Brands
- Orders 1:N OrderItems (embedded in Orders for simplicity)
- Orders 1:1 Payments
- Products 1:N Reviews
- Coupons N:M Users (not modeled directly; applied at checkout)

## ER diagram

```mermaid
erDiagram
  USER ||--o{ ADDRESS : has
  USER ||--o{ ORDER : places
  USER ||--o{ REVIEW : writes
  USER ||--o{ PAYMENT : makes
  USER ||--|| CART : owns
  USER ||--|| WISHLIST : owns
  USER ||--o{ NOTIFICATION : receives
  USER ||--o{ SESSION : has
  USER ||--o{ OTP : uses

  CATEGORY ||--o{ PRODUCT : contains
  BRAND ||--o{ PRODUCT : produces
  PRODUCT ||--o{ REVIEW : receives
  PRODUCT ||--o{ ORDER_ITEM : appears_in
  ORDER ||--o{ ORDER_ITEM : contains
  ORDER ||--o| PAYMENT : pays_for

  USER {
    ObjectId _id
    string name
    string email
    string password
    string role
    boolean isVerified
    string refreshToken
    datetime createdAt
  }

  ADDRESS {
    ObjectId _id
    ObjectId user
    string fullName
    string phone
    string line1
    string line2
    string city
    string state
    string country
    string postalCode
    boolean isDefault
  }

  CATEGORY {
    ObjectId _id
    string name
    string slug
    string description
  }

  BRAND {
    ObjectId _id
    string name
    string slug
  }

  PRODUCT {
    ObjectId _id
    ObjectId category
    ObjectId brand
    string name
    string slug
    number price
    number compareAtPrice
    number stock
    string sku
    string status
    string image
    string description
  }

  REVIEW {
    ObjectId _id
    ObjectId user
    ObjectId product
    number rating
    string comment
  }

  ORDER {
    ObjectId _id
    ObjectId user
    array items
    number total
    string status
    string paymentMethod
    string currency
  }

  ORDER_ITEM {
    ObjectId _id
    ObjectId product
    number quantity
    number price
  }

  PAYMENT {
    ObjectId _id
    ObjectId user
    ObjectId order
    number amount
    string method
    string status
  }

  CART {
    ObjectId _id
    ObjectId user
    array items
  }

  WISHLIST {
    ObjectId _id
    ObjectId user
    array items
  }

  NOTIFICATION {
    ObjectId _id
    ObjectId user
    string title
    string message
    boolean isRead
  }

  OTP {
    ObjectId _id
    string purpose
    string identifier
    string code
    datetime expiresAt
  }

  SESSION {
    ObjectId _id
    ObjectId user
    string tokenHash
    string userAgent
    string ipAddress
    datetime expiresAt
  }
```

## Recommended indexes

- Users: email unique, role, isVerified, createdAt
- Products: category, brand, price, stock, status, slug unique, search text
- Orders: user, status, createdAt, paymentStatus, total
- Categories: slug unique
- Brands: slug unique
- Reviews: product, rating, createdAt
- Coupons: code unique, expiresAt
- Addresses: user, isDefault
- Payments: order, user, status
- Wishlist: user
- Cart: user
- Notifications: user, isRead, createdAt
- OTP: identifier + purpose, expiresAt TTL
- Sessions: user, expiresAt TTL

## Query optimization

- Use selective indexes for filtering by category, brand, price, and status.
- Keep hot paths like auth and search to indexed fields.
- Prefer projection to avoid fetching large document payloads.
- Use pagination with limit/skip or cursor-based pagination for products and orders.
- Denormalize frequently used fields such as product name or category name when needed.
- Enable covered queries when possible.
- Use compound indexes for common filters, such as category + status + price.
