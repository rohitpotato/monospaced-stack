DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'rohit') THEN
        CREATE ROLE rohit WITH LOGIN PASSWORD 'monospaced';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'monospaced') THEN
        CREATE DATABASE monospaced;
        GRANT ALL PRIVILEGES ON DATABASE monospaced TO rohit;
    END IF;
END $$;
