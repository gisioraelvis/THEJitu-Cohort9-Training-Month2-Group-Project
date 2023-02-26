-- DROP PROCEDURE IF EXISTS usp_FindProductById

CREATE PROCEDURE usp_FindProductById
    (@productId INT)
AS
BEGIN
    SELECT
        p.id, p.userId, p.name, p.image, p.description, p.price, p.countInStock,
        b.id AS brandId, b.name AS brandName,
        c.id AS categoryId, c.name AS categoryName,
        r.id AS reviewId, r.rating, r.comment,
        p.createdAt, p.updatedAt
    FROM
        products p
        INNER JOIN brands b ON p.brandId = b.id
        INNER JOIN product_category pc ON p.id = pc.productId
        INNER JOIN categories c ON pc.categoryId = c.id
        INNER JOIN product_review pr ON p.id = pr.productId
        INNER JOIN reviews r ON pr.reviewId = r.id
    WHERE
        p.id = @productId
END



