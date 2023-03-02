CREATE PROCEDURE usp_UpdateOrderToPaid
    @id INT,
    @paymentResultId VARCHAR(100),
    @paymentResultStatus VARCHAR(100),
    @paymentResultUpdateTime DATETIME,
    @paymentResultEmailAddress VARCHAR(255)
AS
BEGIN
    UPDATE orders
    SET 
        paymentResultId = @paymentResultId,
        paymentResultStatus = @paymentResultStatus,
        paymentResultUpdateTime = @paymentResultUpdateTime,
        paymentResultEmailAddress = @paymentResultEmailAddress,
        isPaid = 1,
        paidAt = CURRENT_TIMESTAMP
    WHERE 
        id = @id
END
