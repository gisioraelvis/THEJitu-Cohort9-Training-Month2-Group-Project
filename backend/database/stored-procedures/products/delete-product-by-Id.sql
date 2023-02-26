-- DROP PROCEDURE IF EXISTS usp_DeleteProductById;

GO
CREATE PROCEDURE usp_DeleteProductById(@id INT)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM product_brand WHERE productId = @id;
    DELETE FROM product_category WHERE productId = @id;
    DELETE FROM product_review WHERE productId = @id;
    DELETE FROM products WHERE id = @id;
END
