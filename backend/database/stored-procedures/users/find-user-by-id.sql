CREATE PROCEDURE usp_FindUserById
    (@id INT)
AS
BEGIN
    SELECT *
    FROM users
    WHERE id = @id
END