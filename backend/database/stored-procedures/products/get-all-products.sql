-- DROP PROCEDURE IF EXISTS usp_GetAllProducts;
CREATE PROCEDURE usp_GetAllProducts
AS
BEGIN
    SELECT
        products.id,
        products.userId,
        products.name,
        products.image,
        products.description,
        products.price,
        products.countInStock,
        products.createdAt,
        products.updatedAt,
        brands.id AS brandId,
        brands.name AS brandName,
        categories.id AS categoryId,
        categories.name AS categoryName,
        reviews.id AS reviewId,
        reviews.name AS reviewName,
        reviews.rating,
        reviews.comment
    FROM
        products
        LEFT JOIN product_brand ON products.id = product_brand.productId
        LEFT JOIN product_category ON products.id = product_category.productId
        LEFT JOIN product_review ON products.id = product_review.productId
        LEFT JOIN brands ON product_brand.brandId = brands.id
        LEFT JOIN categories ON product_category.categoryId = categories.id
        LEFT JOIN reviews ON product_review.reviewId = reviews.id
END


