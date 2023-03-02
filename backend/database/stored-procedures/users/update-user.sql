-- DROP PROCEDURE IF EXISTS usp_UpdateUser;

CREATE PROCEDURE usp_UpdateUser(
    @id INT,
    @name NVARCHAR(255) = NULL,
    @email NVARCHAR(255) = NULL,
    @password NVARCHAR(255) = NULL,
    @isAdmin BIT = 0,
    @isDeleted BIT = 0
)
AS
BEGIN
    UPDATE users
        SET name = COALESCE(@name, name),
        email = COALESCE(@email, email),
        password = COALESCE(@password, password),
        isAdmin = COALESCE(@isAdmin, isAdmin),
        isDeleted = COALESCE(@isDeleted, isDeleted),
        updatedAt = GETDATE()
        WHERE id = @id;
    SELECT *
    FROM users
    WHERE id = @id;
END