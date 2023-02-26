DROP PROCEDURE IF EXISTS usp_AddToCart;

-- CREATE PROCEDURE usp_AddToCart
--     @productId int,
--     @userId int,
--     @qty int
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     INSERT INTO cart
--         (productId, userId, qty)
--     VALUES
--         (@productId, @userId, @qty);

--     SELECT *
--     FROM cart
--     WHERE userId = @userId;
-- END
