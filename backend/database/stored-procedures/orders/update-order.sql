-- DROP PROCEDURE IF EXISTS usp_UpdateOrder;

CREATE PROCEDURE usp_UpdateOrder
  @id INT,
  @isPaid BIT = 0,
  @isDelivered BIT = 0
AS
BEGIN
  UPDATE orders
    SET
        isPaid = CASE WHEN @isPaid = 1 THEN 1 ELSE 0 END,
        paidAt = CASE WHEN @isPaid = 1 THEN CURRENT_TIMESTAMP ELSE NULL END,
        isDelivered = CASE WHEN @isDelivered = 1 THEN 1 ELSE 0 END,
        deliveredAt = CASE WHEN @isDelivered = 1 THEN CURRENT_TIMESTAMP ELSE NULL END,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id;

  SELECT *
  FROM orders
  WHERE id = @id;
END
