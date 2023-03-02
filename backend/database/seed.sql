USE GadgetHub;

-- -- users
DELETE FROM users;
DBCC CHECKIDENT('users', RESEED, 1);

INSERT INTO users
    (name, email, password, isAdmin, isDeleted)
VALUES
    ('Admin User', 'admin@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 1, 0),
    ('John Doe', 'johndoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 1, 0),
    ('Jane Doe', 'janedoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0, 0),
    ('Jim Smith', 'jimsmith@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0, 0),
    ('Sarah Johnson', 'sarahjohnson@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0, 0),
    ('Tommy Lee', 'tommylee@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0, 0);

-- -- brands
DELETE FROM brands;
DBCC CHECKIDENT('brands', RESEED, 1);

INSERT INTO brands
    (name)
VALUES
    ('Brand 1'),
    ('Brand 2'),
    ('Brand 3'),
    ('Brand 4'),
    ('Brand 5');

-- -- products
DELETE FROM products;
DBCC CHECKIDENT('products', RESEED, 1);

INSERT INTO products
    (userId, name, image, description, price, countInStock, brandId)
VALUES
    (1, 'Product 1', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/ps5_wb6syv.webp', 'This is the description of Product 1', 19.99, 10, 1),
    (1, 'Product 2', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/Galaxy-S23-Ultra_lp9l3q.png', 'This is the description of Product 2', 29.99, 20, 2),
    (1, 'Product 3', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145662/samples/ecommerce/iphone14-pro-max_rclytu.jpg', 'This is the description of Product 3', 39.99, 30, 3),
    (1, 'Product 4', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/logitech-mx3_lqmhth.jpg', 'This is the description of Product 4', 49.99, 40, 4),
    (1, 'Product 5', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145661/samples/ecommerce/airpods-g3_jk6ian.jpg', 'This is the description of Product 5', 59.99, 50, 5),
    (1, 'Product 6', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/playstation_ahrpeh.jpg', 'This is the description of Product 6', 69.99, 60, 1),
    (1, 'Product 7', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/phone_nibiyh.jpg', 'This is the description of Product 7', 79.99, 70, 2),
    (1, 'Product 8', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/mouse_hmuueu.jpg', 'This is the description of Product 8', 89.99, 80, 3),
    (1, 'Product 9', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145662/samples/ecommerce/canon-90d_ydrlj7.jpg', 'This is the description of Product 9', 99.99, 90, 4),
    (1, 'Product 10', 'https://res.cloudinary.com/webapp-assets/image/upload/v1677145662/samples/ecommerce/google-assistant_yw534q.jpg', 'This is the description of Product 10', 109.99, 100, 5);

-- -- reviews
DELETE FROM reviews;
DBCC CHECKIDENT('reviews', RESEED, 1);

INSERT INTO reviews
    (userId, name, rating, comment)
VALUES
    (1, 'John Doe', 4, 'This is a review of Product 1'),
    (2, 'Jane Doe', 5, 'This is a review of Product 2'),
    (3, 'Jim Smith', 3, 'This is a review of Product 3'),
    (4, 'Sarah Johnson', 2, 'This is a review of Product 4'),
    (5, 'Tommy Lee', 1, 'This is a review of Product 5');

-- -- categories
DELETE FROM categories;
DBCC CHECKIDENT('categories', RESEED, 1);

INSERT INTO categories
    (name)
VALUES
    ('Category 1'),
    ('Category 2'),
    ('Category 3'),
    ('Category 4'),
    ('Category 5');

-- product_category
DELETE FROM product_category;
INSERT INTO product_category
    (productId, categoryId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 1),
    (7, 2),
    (8, 3),
    (9, 4),
    (10, 5),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 1),
    (6, 2),
    (7, 3),
    (8, 4),
    (9, 5),
    (10, 1);

-- product_review
DELETE FROM product_review;
INSERT INTO product_review
    (productId, reviewId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 1),
    (7, 2),
    (8, 3),
    (9, 4),
    (10, 5),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 1),
    (6, 2),
    (7, 3),
    (8, 4),
    (9, 5),
    (10, 1);

--  Orders 
DELETE FROM orders;
DBCC CHECKIDENT('orders', RESEED, 1);
INSERT INTO orders
    (userId, shippingAddress, paymentMethod, paymentResultId, paymentResultStatus, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt)
VALUES
    (1, 'Address 1', 'M-Pesa Xpress', '123', 'Success', 10.00, 20.00, 100.00, 1, '2020-01-01 00:00:00', 1, '2020-01-01 00:00:00'),
    (2, 'Address 2', 'M-Pesa Xpress', '123', 'Success', 10.00, 20.00, 100.00, 1, '2020-01-01 00:00:00', 1, '2020-01-01 00:00:00'),
    (3, 'Address 3', 'M-Pesa Xpress', '123', 'Success', 10.00, 20.00, 100.00, 1, '2020-01-01 00:00:00', 1, '2020-01-01 00:00:00'),
    (4, 'Address 4', 'M-Pesa Xpress', '123', 'Success', 10.00, 20.00, 100.00, 1, '2020-01-01 00:00:00', 1, '2020-01-01 00:00:00'),
    (5, 'Address 5', 'M-Pesa Xpress', '123', 'Success', 10.00, 20.00, 100.00, 1, '2020-01-01 00:00:00', 1, '2020-01-01 00:00:00');

--  Order Items
DELETE FROM order_items;
INSERT INTO order_items
    (orderId, productId, qty)
VALUES
    (1, 1, 5),
    (2, 2, 3),
    (3, 3, 1),
    (4, 4, 2),
    (5, 5, 1),
    (1, 2, 1),
    (2, 3, 7),
    (3, 4, 1),
    (4, 5, 6),
    (5, 1, 1);

-- --  Cart
DELETE FROM cart;
INSERT INTO cart
    (userId, productId, qty)
VALUES
    (1, 1, 5),
    (2, 2, 3),
    (3, 3, 1),
    (4, 4, 2),
    (5, 5, 1),
    (1, 2, 1),
    (2, 3, 7),
    (3, 4, 1),
    (4, 5, 6),
    (5, 1, 1);