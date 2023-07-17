-- create_database.sql

-- Description: SQL query creating a brand new database for the single cell RNA seq project
--              create the database and a user associated with it. A random password is also
--		created to access the newly created user role
--		Database contain tables as defined in the project documentation

-- Creation date: 17 july 2023
-- Author: Brieuc Quemeneur

-- Create the new database
--BEGIN
--	SELECT * FROM information_schema.tables
--	WHERE table_schema = 'public';
--	IF NOT FOUND THEN
--   		CREATE DATABASE cellxgene_db OWNER cellxgene;
--	END IF;
--END;

-- Create one of the many schema to create (a schema by specie is planned. Only a  
-- mammilata schema is currently created and used)
CREATE SCHEMA IF NOT EXISTS phmamm;


-- Create the tables of the database
CREATE TABLE IF NOT EXISTS gene (
	id SERIAL PRIMARY KEY,
	unique_gene_id VARCHAR(9) NOT NULL,
	aniseed_id VARCHAR(30) NOT NULL,
	ena_id VARCHAR(30),
	go_biological_process_id VARCHAR(11),
	go_molecular_function_id VARCHAR(11),
	is_characterized NUMERIC(1)
);

CREATE TABLE IF NOT EXISTS cell (
	id SERIAL PRIMARY KEY,
	fk_embryo_id INT NOT NULL,
	ao_territories_id VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS expression (
	id SERIAL PRIMARY KEY,
	fk_cell_id INT NOT NULL,
	fk_gene_id INT NOT NULL,
	expression_level INT NOT NULL
);

CREATE TABLE IF NOT EXISTS embryo (
	id SERIAL PRIMARY KEY,
	is_wild_type NUMERIC(1)
);

-- Addition of comments on the tables
COMMENT ON TABLE gene
    IS 'Represent a gene independantly from any gene models';

COMMENT ON TABLE cell
    IS 'Represent a cell in which its transcriptome has been sequenced. A cell here is considered as a group of expression levels';

COMMENT ON TABLE expression
    IS 'Represent the expression level of every genes for each cells';

COMMENT ON TABLE embryo
    IS 'Represents a group of cells. Embryos may have any number of cells but at least 2';


-- Create the links between the tables by adding constraints
ALTER TABLE expression ADD CONSTRAINT link_expression_to_cell
	FOREIGN KEY(fk_cell_id)
        REFERENCES cell(id);

ALTER TABLE expression ADD CONSTRAINT link_expression_to_gene
	FOREIGN KEY(fk_gene_id)
	REFERENCES gene(id);

ALTER TABLE cell ADD CONSTRAINT link_cell_to_embryo
	FOREIGN KEY(fk_embryo_id)
	REFERENCES embryo(id);


-- Addition of comments on the table constraints
COMMENT ON CONSTRAINT link_expression_to_cell ON expression
    IS 'Constraint linking the expression level to a cell';

COMMENT ON CONSTRAINT link_expression_to_gene ON expression
    IS 'Constraint linking the expression level to a gene';

COMMENT ON CONSTRAINT link_cell_to_embryo ON cell
    IS 'Constraint linking the cell with its origin embryo';
