# Database Design

---

# User Collection

## Purpose

Stores user account information, authentication data, profile details, addresses, and wishlist.

## Relationships

- One User → One Cart
- One User → Many Orders
- One User → Many Reviews
- One User → Many Wishlist Items

## Fields

- firstName
- lastName
- email
- passwordHash
- phone
- profileImage
- role
- isVerified
- verificationCode
- verificationCodeExpiresAt
- addresses[]
- wishlist[]
- isDeleted
- deletedAt
- lastLogin
- lastPasswordChanged
- createdAt
- updatedAt

## Business Rules

- Email must be unique.
- Password must be hashed.
- Email verification is required before placing an order.
- Addresses can be empty until checkout.
- Soft delete is supported.

---

# Product Collection

## Purpose

Stores all product information displayed in the store.

## Relationships

- One Product → One Category
- One Product → One Brand
- One Product → Many Reviews

## Fields

- name
- slug
- description
- price
- discountPrice
- stock
- sku
- images[]
- category
- brand
- averageRating
- totalReviews
- isFeatured
- isPublished
- isDeleted
- deletedAt
- createdAt
- updatedAt

## Business Rules

- Product must belong to one category.
- Product belongs to one brand.
- Stock cannot be negative.
- Price must be greater than zero.
- Soft delete is supported.

---

# Category Collection

## Purpose

Organizes products into categories.

## Relationships

- One Category → Many Products

## Fields

- name
- slug
- image
- createdAt
- updatedAt

## Business Rules

- Category name must be unique.

---

# Brand Collection

## Purpose

Stores product brand information.

## Relationships

- One Brand → Many Products

## Fields

- name
- slug
- logo
- createdAt
- updatedAt

## Business Rules

- Brand name must be unique.

---

# Review Collection

## Purpose

Stores customer reviews for products.

## Relationships

- Many Reviews → One User
- Many Reviews → One Product

## Fields

- user
- product
- rating
- comment
- createdAt
- updatedAt

## Business Rules

- One user can review a product only once.
- Rating must be between 1 and 5.

---

# Cart Collection

## Purpose

Stores products selected before checkout.

## Relationships

- One Cart → One User

## Fields

- user
- items[]
- totalPrice
- totalQuantity
- createdAt
- updatedAt

## Business Rules

- One active cart per user.
- Quantity must be greater than zero.

---

# Order Collection

## Purpose

Stores completed customer orders.

## Relationships

- Many Orders → One User

## Fields

- user
- items[]
- shippingAddress
- paymentMethod
- paymentStatus
- orderStatus
- totalPrice
- shippingCost
- coupon
- createdAt
- updatedAt

## Business Rules

- Order cannot be created with an empty cart.
- Shipping address is required.
- Order status follows the business workflow.

---

# Coupon Collection

## Purpose

Stores discount coupons.

## Fields

- code
- discountType
- discountValue
- minimumOrderAmount
- expiresAt
- usageLimit
- usedCount
- isActive
- createdAt
- updatedAt

## Business Rules

- Coupon code must be unique.
- Expired coupons cannot be used.

---

# Notification Collection

## Purpose

Stores notifications sent to users.

## Relationships

- Many Notifications → One User

## Fields

- user
- title
- message
- type
- isRead
- createdAt

## Business Rules

- Notifications belong to one user.
- Read status defaults to false.

---

# Indexes

- User.email
- Product.slug
- Product.category
- Product.brand
- Category.slug
- Brand.slug
- Coupon.code

---

# Soft Delete Strategy

Collections using soft delete:

- Users
- Products

---

# Audit Fields

Collections should include:

- createdAt
- updatedAt

Users additionally include:

- lastLogin
- lastPasswordChanged