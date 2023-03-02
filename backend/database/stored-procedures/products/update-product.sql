-- DROP PROCEDURE IF EXISTS usp_UpdateProduct;

-- CREATE PROCEDURE usp_UpdateProduct
--     (
--     @id INT,
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
--     UPDATE products
-- SET userId = @userId,
-- name = @name,
-- image = @image,
-- description = @description,
-- price = @price,
-- countInStock = @countInStock,
-- updatedAt = GETDATE()
-- WHERE id = @id;
--     DELETE FROM product_brand
-- WHERE productId = @id;

--     INSERT INTO product_brand
--         (productId, brandId)
--     VALUES
--         (@id, @brandId);

--     DELETE FROM product_category
-- WHERE productId = @id;

--     INSERT INTO product_category
--         (productId, categoryId)
--     VALUES
--         (@id, @categoryId);
-- END



CREATE PROCEDURE usp_UpdateProduct
    (
    @id INT,
    @userId INT,
    @name VARCHAR(100),
    @image VARCHAR(500),
    @description VARCHAR(1000),
    @price DECIMAL(10, 2),
    @countInStock INT
)
AS
BEGIN
    UPDATE products
SET userId = @userId,
name = @name,
image = @image,
description = @description,
price = @price,
countInStock = @countInStock,
updatedAt = GETDATE()
WHERE id = @id;
    SELECT *
    FROM products
    WHERE id = @id;
END
