CREATE PROCEDURE usp_DeleteUser
    (@id INT)
AS
BEGIN
    DELETE 
    FROM users
    WHERE id = @id
END
