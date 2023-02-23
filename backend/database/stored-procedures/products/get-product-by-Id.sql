-- DROP PROCEDURE IF EXISTS usp_FindProductById

CREATE PROCEDURE usp_FindProductById
    (@productId INT)
AS
BEGIN
    SELECT
        p.id, p.userId, p.name, p.image, p.description,
        p.price, p.countInStock, p.createdAt, p.updatedAt,
        b.id AS brandId, b.name AS brandName,
        c.id AS categoryId, c.name AS categoryName,
        r.id AS reviewId, r.rating, r.comment
    FROM
        products p
        INNER JOIN product_brand pb ON p.id = pb.productId
        INNER JOIN brands b ON pb.brandId = b.id
        INNER JOIN product_category pc ON p.id = pc.productId
        INNER JOIN categories c ON pc.categoryId = c.id
        INNER JOIN product_review pr ON p.id = pr.productId
        INNER JOIN reviews r ON pr.reviewId = r.id
    WHERE
        p.id = @productId
END



