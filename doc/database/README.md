# Database documentation

The database of the single cell RNA seq module is a relational SQL database created on postgresql (version 12.15)
The following documentation provide further informations about:

- A guide to create the cellxgene database from scratch
- The organization of the tables and their relationships

## How to set up a database for the single cell RNA seq project ?

To set up a database for the project. Follow the steps below
But first, be sure your system has the following requirements

- Using postgres as the database
- Running the commands on maintained version of Linux (tested using ubuntu)

### Creating a new user associated with the database

As the database to set up in the project needs to be assessible by the project
backend, a specific user needs to be associated with it in order to give an 
access to the database content via this user in the code.

Creating a user is simple. Open a terminal and run:

```bash
sudo -u postgres psql postgres
sudo postgres create user cellxgene ## create the user you want
```

You will be invited to create a password. Please provide a diversified and long
password to ensure an high level of security

### Connect to postgres using the new user on an already existing database

Replace the {already_existing_database_name} by the name of a database that 
already exists. The goal is just to connect to postgres and get the postgres
terminal

```bash
psql -U cellxgene -h localhost {already_existing_database_name}
```

### Launch the database creation 

In the postgres terminal. You can simply launch the sql file (build_database.sql) 
containing all the sql queries needed to build the database from scratch using 
the current user. This user will become the owner of the new database created.

```
\i build_database.sql
``` 

All the priviledges will be given to the user 

Note that if the database already exists the database will not be rebuilt and 
the data in it will remain untouched.

### Checking if the database is created properly

To check if the new database has been created properly. Quit the postgres terminal
and try to connect to it using the owner user (the one used when you created the 
database)

```
\q
psql -h localhost -U {username} {dbname}
```

If you can connect to it and find all the tables present in the database structure
provided in the documentation, the database seems to have been created properly


## Structure of the database
