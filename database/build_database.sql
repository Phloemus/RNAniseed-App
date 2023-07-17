-- create_database.sql

-- Description: SQL query creating a brand new database for the single cell RNA seq project
--              create the database and a user associated with it. A random password is also
--		created to access the newly created user role
--		Database contain tables as defined in the project documentation

-- Creation date: 17 july 2023
-- Author: Brieuc Quemeneur

-- Create the new database
CREATE DATABASE IF NOT EXISTS cellxgene_db OWNER cellxgene;

-- Create one of the many schema to create (a schema by specie is planned. Only a  
-- mammilata schema is currently created and used)
CREATE SCHEMA IF NOT EXISTS phmamm;


-- Create the tables of the database

