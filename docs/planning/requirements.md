# Project Requirements

This document defines the functional and non-functional requirements for the Tassawaq E-Commerce platform.

---

# Functional Requirements

## Authentication

- Users can register using email and password.
- Users can verify their email address.
- Users can log in using valid credentials.
- Users can log out.
- Users can reset their password.
- Users can change their password.
- Users can refresh expired access tokens.

---

## Users

- Users can view their profile.
- Users can update their profile information.
- Users can manage multiple shipping addresses.

---

## Products

- Guests and users can browse products.
- Guests and users can search products.
- Guests and users can filter products.
- Guests and users can sort products.
- Guests and users can view product details.
- Admins can create products.
- Admins can update products.
- Admins can delete products.

---

## Categories

- Guests and users can browse categories.
- Admins can create categories.
- Admins can update categories.
- Admins can delete categories.

---

## Brands

- Guests and users can browse brands.
- Admins can create brands.
- Admins can update brands.
- Admins can delete brands.

---

## Reviews

- Authenticated users can add product reviews.
- Users can edit their own reviews.
- Users can delete their own reviews.
- Guests can view reviews.

---

## Cart

- Authenticated users can add products to the cart.
- Users can update product quantities.
- Users can remove products from the cart.
- Users can clear the cart.
- Users can view their cart.

---

## Wishlist

- Authenticated users can add products to their wishlist.
- Users can remove products from their wishlist.
- Users can view their wishlist.

---

## Orders

- Only authenticated users can place orders.
- Users can view their order history.
- Users can view order details.
- Users can cancel eligible orders.
- Admins can update order status.

---

## Coupons

- Users can apply coupon codes during checkout.
- The system shall validate coupon availability and expiration.
- Admins can create, update, and delete coupons.

---

## Payments

- Users can pay for orders.
- The system shall store payment status.
- Users can view payment status.

---

## Notifications

- Users shall receive email notifications for important account events.
- Users shall receive order status notifications.

---

## Admin Dashboard

- Admins can manage users.
- Admins can manage products.
- Admins can manage categories.
- Admins can manage brands.
- Admins can manage orders.
- Admins can manage coupons.
- Admins can view dashboard statistics.

---

# Non-Functional Requirements

## Security

- Passwords shall be hashed.
- Protected endpoints shall require authentication.
- User input shall be validated.

## Performance

- Product listing endpoints shall support pagination.
- Search and filtering should return results efficiently.

## Reliability

- The system shall return meaningful error messages.
- API responses shall use consistent formats.

## Scalability

- The API shall be stateless.
- The system shall support horizontal scaling.

## Maintainability

- The project shall follow a layered architecture.
- Code shall follow a consistent style guide.

## Documentation

- All public APIs shall be documented using Swagger.

## Testing

- Core business logic should be covered by unit tests.
- API endpoints should be tested before deployment.