CREATE PROCEDURE usp_CreateOrderItem
    @orderId INT,
    @productId INT,
    @qty INT
AS
BEGIN
    SET NOCOUNT ON;

    -- insert new order item record
    INSERT INTO order_items (orderId, productId, qty)
    VALUES (@orderId, @productId, @qty);
END
GO