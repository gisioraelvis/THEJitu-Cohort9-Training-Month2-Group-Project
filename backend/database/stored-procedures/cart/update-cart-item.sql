-- DROP PROCEDURE IF EXISTS usp_UpdateCartItem;

CREATE PROCEDURE usp_UpdateCartItem
    @productId int,
    @userId int,
    @qty int
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE cart
    SET qty = @qty
    WHERE productId = @productId AND userId = @userId;

    SELECT *
    FROM cart
    WHERE userId = @userId;
END
