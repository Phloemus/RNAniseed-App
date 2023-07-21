-- setup_database.sql

-- Description: This plsql script prepare the database before being used. 
-- 		Use this script in the postgres console after having created 
--		a blank database. Be sure to be connected on this blank database
-- 		before running this script.
--		This script will create routine functions that can be used directly
-- 		in the postgres console, as well as creating all the tables and
-- 		constraints on the public schema needed for the project as 
-- 		documented in the project database documentation.
--		This script is only meant to be run once. It stores function in the
-- 		database that will help you managing the database and adding 
--		schemas

-- Creation date: 17 july 2023
-- Last update: 20 july 2023
-- Author: Brieuc Quemeneur


---------------------- Routine functions ------------------------------------------------------

------- build_new_schema -------
--
-- Create a function allowing to add custom schemas to the database by creating all the tables
-- and constrains defined in the project documentation about the database
--
CREATE OR REPLACE FUNCTION build_new_schema(schema_name varchar(32)) RETURNS void AS $body$
DECLARE
	link_expression_to_cell INT;
	link_expression_to_gene INT;
	link_cell_to_embryo INT;
	link_gene_go_biological_process_to_gene INT;
	link_gene_go_biological_process_to_go_biological_process INT;
	link_gene_go_molecular_function_to_gene INT;
	link_gene_go_molecular_function_to_go_molecular_function INT;
BEGIN

	-- Create the shema wanted by the user using the 
	-- logged user as owner of the schema
	EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);

	-- Create the tables of the database
	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.gene (
		id SERIAL PRIMARY KEY,
		unique_gene_id TEXT NOT NULL,
		aniseed_id VARCHAR(30) NOT NULL,
		ena_id VARCHAR(30),
		is_characterized NUMERIC(1)
	)', schema_name);

	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.cell (
		id SERIAL PRIMARY KEY,
		fk_embryo_id INT NOT NULL,
		ao_territories_id VARCHAR(20)
	)', schema_name);

	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.expression (
		id SERIAL PRIMARY KEY,
		fk_cell_id INT NOT NULL,
		fk_gene_id INT NOT NULL,
		expression_level INT NOT NULL
	)', schema_name);

	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.embryo (
		id SERIAL PRIMARY KEY,
		is_wild_type NUMERIC(1)
	)', schema_name);

	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.gene_go_biological_process (
		id SERIAL PRIMARY KEY,
		fk_gene_id INT NOT NULL,
		fk_go_biological_process_id INT NOT NULL
	)', schema_name);

	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.go_biological_process (
		id SERIAL PRIMARY KEY,
		go_id VARCHAR(11),
		name TEXT,
		definition TEXT
	)', schema_name);

	EXECUTE format('CREATE TABLE IF NOT EXISTS %I.gene_go_molecular_function (
                id SERIAL PRIMARY KEY,
                fk_gene_id INT NOT NULL,
                fk_go_molecular_function_id INT NOT NULL
        )', schema_name);

        EXECUTE format('CREATE TABLE IF NOT EXISTS %I.go_molecular_function (
                id SERIAL PRIMARY KEY,
                go_id VARCHAR(11),
                name TEXT,
                definition TEXT
        )', schema_name);

	-- Addition of comments on the tables
	EXECUTE format('COMMENT ON TABLE %I.gene
    		IS ''Represent a gene independantly from any gene models''', schema_name);

	EXECUTE format('COMMENT ON TABLE %I.cell
    		IS ''Represent a cell in which its transcriptome has been sequenced. A cell here is considered as a group of expression levels''', schema_name);

	EXECUTE format('COMMENT ON TABLE %I.expression
    		IS ''Represent the expression level of every genes for each cells''', schema_name);

	EXECUTE format('COMMENT ON TABLE %I.embryo
    		IS ''Represents a group of cells. Embryos may have any number of cells but at least 2''', schema_name);

	EXECUTE format('COMMENT ON TABLE %I.gene_go_biological_process
		IS ''Correspond to the intermediate tables on ensure a many to many relationship between gene and go_biological_process tables''', schema_name);

	EXECUTE format('COMMENT ON TABLE %I.go_biological_process
		IS ''Represents the list of the biological process terms from the gene ontology''', schema_name);

	EXECUTE format('COMMENT ON TABLE %I.gene_go_molecular_function
                IS ''Correspond to the intermediate tables on ensure a many to many relationship between gene and go_molecular_function tables''', schema_name);

        EXECUTE format('COMMENT ON TABLE %I.go_molecular_function
                IS ''Represents the list of the molecular function terms from the gene ontology''', schema_name);

	-- Store the existance of each constrains used within the database
	EXECUTE format('SELECT 1 FROM pg_constraint
        	WHERE conname = ''link_expression_to_cell''
                AND conrelid = ''%I.expression''::regclass', schema_name)
	INTO link_expression_to_cell;

	EXECUTE format('SELECT 1 FROM pg_constraint
                WHERE conname = ''link_expression_to_gene''
                AND conrelid = ''%I.expression''::regclass', schema_name)
	INTO link_expression_to_gene;

	EXECUTE format('SELECT 1 FROM pg_constraint
                        WHERE conname = ''link_cell_to_embryo''
                        AND conrelid = ''%I.cell''::regclass', schema_name)
	INTO link_cell_to_embryo;

	EXECUTE format('SELECT 1 FROM pg_constraint
		WHERE conname = ''link_gene_go_biological_process_to_gene''
		AND conrelid = ''%I.gene_go_biological_process''::regclass', schema_name)
	INTO link_gene_go_biological_process_to_gene;

	EXECUTE format('SELECT 1 FROM pg_constraint
		WHERE conname = ''link_gene_go_biological_process_to_go_biological_process''
		AND conrelid = ''%I.gene_go_biological_process''::regclass', schema_name)
	INTO link_gene_go_biological_process_to_go_biological_process;

	EXECUTE format('SELECT 1 FROM pg_constraint
                WHERE conname = ''link_gene_go_molecular_function_to_gene''
                AND conrelid = ''%I.gene_go_molecular_function''::regclass', schema_name)
        INTO link_gene_go_molecular_function_to_gene;

        EXECUTE format('SELECT 1 FROM pg_constraint
                WHERE conname = ''link_gene_go_molecular_function_to_go_molecular_function''
                AND conrelid = ''%I.gene_go_molecular_function''::regclass', schema_name)
        INTO link_gene_go_molecular_function_to_go_molecular_function;

	-- Create the links between the tables by adding constraints if they aren't binded to the tables yet
	IF link_expression_to_cell IS NULL THEN
		RAISE NOTICE 'Contraint link_expression_to_cell inexistant. Constraint added';
    		EXECUTE format('ALTER TABLE %I.expression ADD CONSTRAINT link_expression_to_cell
			FOREIGN KEY(fk_cell_id)
			REFERENCES %I.cell(id)', schema_name, schema_name);
  	END IF;

	IF link_expression_to_gene IS NULL THEN
		RAISE NOTICE 'Contraint link_expression_to_gene inexistant. Constraint added';
		EXECUTE format('ALTER TABLE %I.expression ADD CONSTRAINT link_expression_to_gene
			FOREIGN KEY(fk_gene_id)
			REFERENCES %I.gene(id)', schema_name, schema_name);
	END IF;

	IF link_cell_to_embryo IS NULL THEN
		RAISE NOTICE 'Contraint link_cell_to_embryo inexistant. Constraint added';
		EXECUTE format('ALTER TABLE %I.cell ADD CONSTRAINT link_cell_to_embryo
			FOREIGN KEY(fk_embryo_id)
			REFERENCES %I.embryo(id)', schema_name, schema_name);
	END IF;

	IF link_gene_go_biological_process_to_gene IS NULL THEN
		RAISE NOTICE 'Constraint link_gene_go_biological_process_to_gene inexistant. Constraint added';
		EXECUTE format('ALTER TABLE %I.gene_go_biological_process ADD CONSTRAINT link_gene_go_biological_process_to_gene
			FOREIGN KEY(fk_gene_id)
			REFERENCES %I.gene(id)', schema_name, schema_name);
	END IF;

	IF link_gene_go_biological_process_to_go_biological_process IS NULL THEN
                RAISE NOTICE 'Constraint link_gene_go_biological_process_to_gene inexistant. Constraint added';
                EXECUTE format('ALTER TABLE %I.gene_go_biological_process ADD CONSTRAINT link_gene_go_biological_process_to_go_biological_process
                        FOREIGN KEY(fk_go_biological_process_id)
                        REFERENCES %I.go_biological_process(id)', schema_name, schema_name);
        END IF;

	IF link_gene_go_molecular_function_to_gene IS NULL THEN
                RAISE NOTICE 'Constraint link_gene_go_molecular_function_to_gene inexistant. Constraint added';
                EXECUTE format('ALTER TABLE %I.gene_go_molecular_function ADD CONSTRAINT link_gene_go_molecular_function_to_gene
                        FOREIGN KEY(fk_gene_id)
                        REFERENCES %I.gene(id)', schema_name, schema_name);
        END IF;

        IF link_gene_go_molecular_function_to_go_molecular_function IS NULL THEN
                RAISE NOTICE 'Constraint link_gene_go_biological_process_to_gene inexistant. Constraint added';
                EXECUTE format('ALTER TABLE %I.gene_go_molecular_function ADD CONSTRAINT link_gene_go_molecular_function_to_go_molecular_function
                        FOREIGN KEY(fk_go_molecular_function_id)
                        REFERENCES %I.go_molecular_function(id)', schema_name, schema_name);
        END IF;


	-- Addition of comments on the table constraints
	EXECUTE format('COMMENT ON CONSTRAINT link_expression_to_cell ON %I.expression IS ''Constraint linking the expression level to a cell''', schema_name);

        EXECUTE format('COMMENT ON CONSTRAINT link_expression_to_gene ON %I.expression IS ''Constraint linking the expression level to a gene''', schema_name);

        EXECUTE format('COMMENT ON CONSTRAINT link_cell_to_embryo ON %I.cell IS ''Constraint linking the cell with its origin embryo''', schema_name);

	EXECUTE format('COMMENT ON CONSTRAINT link_gene_go_biological_process_to_gene ON %I.gene_go_biological_process IS ''Contraint linking the gene_go_biological_process to the gene''', schema_name);

	EXECUTE format('COMMENT ON CONSTRAINT link_gene_go_biological_process_to_go_biological_process ON %I.gene_go_biological_process IS ''Contraint linking the gene_go_biological_process to the go biological process''', schema_name);


	EXECUTE format('COMMENT ON CONSTRAINT link_gene_go_molecular_function_to_gene ON %I.gene_go_molecular_function IS ''Contraint linking the gene_go_molecular_function to the gene''', schema_name);

        EXECUTE format('COMMENT ON CONSTRAINT link_gene_go_molecular_function_to_go_molecular_function ON %I.gene_go_molecular_function IS ''Contraint linking the gene_go_molecular_function to the go_molecular_function''', schema_name);


	RETURN;

END $body$ language plpgsql;


---------------------- Execution block ------------------------------------------------------

DO $$
DECLARE
BEGIN
	EXECUTE build_new_schema('public');
END $$;
