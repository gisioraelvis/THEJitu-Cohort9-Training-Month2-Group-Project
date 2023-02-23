DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    countInStock INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES users(id)
);

DROP TABLE IF EXISTS brands
CREATE TABLE brands
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

DROP TABLE IF EXISTS product_brand
CREATE TABLE product_brand
(
    productId INT NOT NULL,
    brandId INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (productId, brandId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (brandId) REFERENCES Brands(id)
);

DROP TABLE IF EXISTS categories
CREATE TABLE categories
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

DROP TABLE IF EXISTS product_category
CREATE TABLE product_category
(
    productId INT NOT NULL,
    categoryId INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (productId, categoryId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

DROP TABLE IF EXISTS reviews
CREATE TABLE reviews
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

DROP TABLE IF EXISTS product_review
CREATE TABLE product_review
(
    productId INT NOT NULL,
    reviewId INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (productId, reviewId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (reviewId) REFERENCES Reviews(id)
);
