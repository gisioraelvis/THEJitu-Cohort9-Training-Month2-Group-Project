-- DROP PROCEDURE IF EXISTS usp_RemoveFromCart;

CREATE PROCEDURE usp_RemoveFromCart
    @id INT,
    @userId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM cart
    WHERE id = @id AND userId = @userId;

    SELECT *
    FROM cart
    WHERE userId = @userId;
END
