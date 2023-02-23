USE GadgetHub;

-- -- -- Drops all tables and all dependencies i.e. foreign keys

DECLARE @SQL NVARCHAR(MAX) = '';

-- Drop foreign key constraints
DECLARE @ForeignKeySQL NVARCHAR(MAX) = '';

SELECT @ForeignKeySQL = @ForeignKeySQL + 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id)) + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';'
FROM sys.foreign_keys;

EXEC sp_executesql @ForeignKeySQL, N'@ForeignKeySQL NVARCHAR(MAX)', @ForeignKeySQL = @ForeignKeySQL;

-- Drop tables
SELECT @SQL = @SQL + 'DROP TABLE ' + QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) + ';'
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG = 'GadgetHub';

EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;




