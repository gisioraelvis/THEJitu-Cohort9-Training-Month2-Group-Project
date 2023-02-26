CREATE PROCEDURE usp_UpgradeUserToAdmin
    (@id INT)
AS
BEGIN
    UPDATE users
SET isAdmin = 1, updatedAt = GETDATE()
WHERE id = @id;
END