-- DROP PROCEDURE IF EXISTS usp_CreateOrder;

CREATE PROCEDURE usp_CreateOrder
    @userId INT,
    @shippingAddress VARCHAR(500),
    @paymentMethod VARCHAR(100),
    @totalPrice DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @orderId INT;

    -- insert new order record
    INSERT INTO orders
        (userId, shippingAddress, paymentMethod, totalPrice)
    VALUES
        (@userId, @shippingAddress, @paymentMethod, @totalPrice);

    -- get the id of the newly inserted order record
    SELECT @orderId = SCOPE_IDENTITY();

    -- return the the new order
    SELECT *
    FROM orders
    WHERE id = @orderId;
END


