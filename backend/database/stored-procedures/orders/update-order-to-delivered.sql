CREATE PROCEDURE usp_UpdateOrderToDelivered
    @id INT
AS
BEGIN
    UPDATE orders
    SET isDelivered = 1, deliveredAt = GETDATE()
    WHERE id = @id
END
