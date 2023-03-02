-- DROP PROCEDURE IF EXISTS usp_CreateProduct;


-- CREATE PROCEDURE usp_CreateProduct
--     (
--     @userId INT,
--     @name VARCHAR(100),
--     @image VARCHAR(500),
--     @description VARCHAR(1000),
--     @price DECIMAL(10, 2),
--     @countInStock INT,
--     @brandId INT,
--     @categoryId INT
-- )
-- AS
-- BEGIN
--     INSERT INTO products
--         (userId, name, image, description, price, countInStock)
--     VALUES
--         (@userId, @name, @image, @description, @price, @countInStock);
--     DECLARE @productId INT = SCOPE_IDENTITY();

--     INSERT INTO product_brand
--         (productId, brandId)
--     VALUES
--         (@productId, @brandId);

--     INSERT INTO product_category
--         (productId, categoryId)
--     VALUES
--         (@productId, @categoryId);
-- END

CREATE PROCEDURE usp_CreateProduct
    (
    @userId INT,
    @name VARCHAR(100),
    @image VARCHAR(500),
    @description VARCHAR(1000),
    @price DECIMAL(10, 2),
    @countInStock INT
)
AS
BEGIN
    INSERT INTO products
        (userId, name, image, description, price, countInStock)
    VALUES
        (@userId, @name, @image, @description, @price, @countInStock);
    DECLARE @productId INT = SCOPE_IDENTITY();

    -- Return the newly created product
    SELECT *
    FROM products
    WHERE id = @productId;
END

