CREATE PROCEDURE usp_RegisterUser(
    @name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @isAdmin BIT = 0
)
AS
BEGIN
    INSERT INTO users
        (name, email, password, isAdmin)
    VALUES
        (@name, @email, @password, @isAdmin);

    SELECT *
    FROM users
    WHERE email = @email;
END
