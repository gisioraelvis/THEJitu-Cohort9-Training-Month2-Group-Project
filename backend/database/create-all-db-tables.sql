USE GadgetHub;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS product_review;
DROP TABLE IF EXISTS product_brand;
DROP TABLE IF EXISTS product_category;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS cart;

CREATE TABLE users
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BIT NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    countInStock INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE brands
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_category
(
    productId INT NOT NULL,
    categoryId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (productId, categoryId),
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE product_brand
(
    productId INT NOT NULL,
    brandId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (productId, brandId),
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (brandId) REFERENCES brands(id)
);

CREATE TABLE product_review
(
    productId INT NOT NULL,
    reviewId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (productId, reviewId),
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (reviewId) REFERENCES reviews(id)
);

CREATE TABLE orders
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    shippingAddress VARCHAR(500) NOT NULL,
    paymentMethod VARCHAR(100),
    paymentResultId VARCHAR(100),
    paymentResultStatus VARCHAR(100) DEFAULT 'Pending',
    taxPrice DECIMAL(10, 2),
    shippingPrice DECIMAL(10, 2),
    totalPrice DECIMAL(10, 2) NOT NULL,
    isPaid BIT DEFAULT 0,
    paidAt DATETIME,
    isDelivered BIT DEFAULT 0,
    deliveredAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE order_items
(
    orderId INT NOT NULL,
    productId INT NOT NULL,
    qty INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (orderId, productId),
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE cart
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    qty INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);
