-- DROP PROCEDURE IF EXISTS usp_GetAllUsers;

CREATE PROCEDURE usp_GetAllUsers
AS
BEGIN
    SELECT id, name, email, isAdmin, isDeleted, createdAt, updatedAt
    FROM users
    WHERE isDeleted = 0;
END