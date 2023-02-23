USE GadgetHub;

-- -- -- Run users, products, brands, categories, reviews first & -- -- -- -- -- -- -- -- -- --
-- -- -- then run product_brand, product_category, product_review aftwards to prevent errors --

-- -- users
DELETE FROM users;
DBCC CHECKIDENT('users', RESEED, 1);

INSERT INTO users
    (name, email, password, isAdmin)
VALUES
    ('Admin User', 'admin@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 1),
    ('John Doe', 'johndoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 1),
    ('Jane Doe', 'janedoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0),
    ('Jim Smith', 'jimsmith@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0),
    ('Sarah Johnson', 'sarahjohnson@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0),
    ('Tommy Lee', 'tommylee@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 0);

-- -- products
DELETE FROM products;
DBCC CHECKIDENT('products', RESEED, 1);

INSERT INTO products
    (userId, name, image, description, price, countInStock)
VALUES
    (1, 'Product 1', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 1', 19.99, 10),
    (1, 'Product 2', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 2', 29.99, 20),
    (1, 'Product 3', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 3', 39.99, 30),
    (1, 'Product 4', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 4', 49.99, 40),
    (1, 'Product 5', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 5', 59.99, 50),
    (1, 'Product 6', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 6', 69.99, 60),
    (1, 'Product 7', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 7', 79.99, 70),
    (1, 'Product 8', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 8', 89.99, 80),
    (1, 'Product 9', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 9', 99.99, 90),
    (1, 'Product 10', 'https://raw.githubusercontent.com/gisioraelvis/THEJitu-Cohort9-Training-Month1-Group-Project/intergration/frontend/assests/images/playstation.jpg', 'This is the description of Product 10', 109.99, 100);

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


-- -- -- -- To be run after users, products, brands, categories , reviews -- -- -- -- -- --

-- product_brand
DELETE FROM product_brand;
INSERT INTO product_brand
    (productId, brandId)
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


-- -- -- -- -- To be run after users, products, brands, categories , reviews, product_brand, product_category, product_review -- -- -- -- -- --

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


-- -- -- -- -- To be run after users, products, brands, categories , reviews, product_brand, product_category, product_review, orders, order_items -- -- -- -- -- --

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