# API Documentation

The RNAniseed projet contains API serving as a bridge between the frontend (also called application) 
and the database. This structure ensure that anyone can make calls to the API directly to get data 
from the database or perform jobs (such as producing h5ad file for scRNA-Seq data visualization)

## Technical details

This API is located in the backend. It's built using the Laravel framework. For any more details about
the Laravel framework check the [Laravel official documentation](https://laravel.com/docs)

## API Routes

The frontend of the RNAniseed application relies on this API by calling different useful endpoints.

Here is a list of them:

| Name                                  | Endpoint                  | Method | Usage Details                                                                                                      | Response Format | Request Parameters |
|---------------------------------------|---------------------------|--------|--------------------------------------------------------------------------------------------------------------------|-----------------|--------------------|
| Get a list of all species             | api/species               | GET    | Allow to get a list of all the species present in the database                                                     | JSON            | None               |
| Get the datasets of a specific specie | api/species/{id}/datasets | GET    | Allow to get a list of all the datasets a specific specie is involved in by indicated its {id} in the url endpoint | JSON            | None               |
| Get the stages of a dataset           | api/datasets/{id}/stages  | GET    | Allow to get all the stages present a specific dataset (indicated by its {id} in the url endpoint)                 | JSON            | None               |
| Get all the cells                     | api/cells                 | GET    | Allow to get all the cells present in the database                                                                 | JSON            | None               |
| Get info on a cell                    | api/cells/{id}            | GET    | Allow to get the information about a specific cell (indicated by its {id} in the url endpoint)                     | JSON            | None               |
| Get all the genes                     | api/genes                 | GET    | Allow to get all the genes present in the database                                                                 | JSON            | None               |
| Get info on a gene                    | api/genes/{id}            | GET    | Allow to get the information about a specific gene (indicated by its {id} in the url endpoint)                     | JSON            | None               |
| Get info on gene using its name       | api/genes/name/{name}     | GET    | Allow to get the information about a specific gene (indicated by its {name} in the url endpoint)                   | JSON            | None               |
| Create a h5ad file                    | api/visualize/explore     | POST   | Perform the creation of a h5ad file with the right parameters (check the requests params columns)                  | JSON            | {}                 |
| Get all the genes of a cell           | api/genes/cells/{id}      | GET    | Allow to get all the genes available for a certain cell (indicated by its {id} in the url endpoint)                | JSON            | None               |
| Get the genes of an embryo            | api/genes/embryos/{id}    | GET    | Allow to get all the genes available for a certain embryo (indicated by its {id} in the url endpoint)              | JSON            | None               |


Check them all by going in the routes/api.php file. Each route is composed of an url and a function. 
When calling the right url endpoint of the API, the function will trigger and perform the expected task.
To go further check out the documentation about the [API routing and the syntaxe details](https://laravel.com/docs/10.x/eloquent-resources#main-content)

Most of these endpoint only perform simple requests which are used to allow a very responsive frontend 
application when the user enter the fields before performing a visualization. 

However the viusalisation endpoint is more complex. It allows to create the h5ad file which is used by
the visulizer (aka cellxgene).

## Visualization endpoint explaination

**Be warn: this section needs to be improved. It's the main non working bottleneck of this whole project**

The visualization endpoint (the API endpoint responsible for the creation of the h5ad file) is 
specific to this project, thus a small section about this endpoint may be useful.

Find the code of the endpoint in **Http/Controllers/VisualizationController.php**. The code of the 
explore function essentially delegate all the heavy lifting to a python script located at **external/create_h5ad.py** 
and return a response to the frontend depending on the success or failure of the h5ad file creation.

Essentially the create_h5ad file get the data from the database and fill an [AnnData object](https://anndata.readthedocs.io/en/latest/) with the 
relevant data as well as the annotations (cell stages).

After what normalization and umap are steps are performed following this [tutorial](https://scverse-tutorials.readthedocs.io/en/latest/notebooks/basic-scrna-tutorial.html). 
This tutorial is great and shows the interesting possibilities of clustering using the AnnData object.

### Patch and improve the visualization endpoint

Some things need to be patched to make the application working:

- The python scripts should receive the data selected by the user in the frontend (for now the input 
values are hardcoded in the python script). Then the goal is to pass the request gotten by the API as
a parameter for the python script so it could request the database with user relevant data.
- A bug occurs in the release version of the application. Cellxgene has trouble reading the h5ad file 
produced by the live dev server version of the API. This issue doesn't occur in locally. A potential 
source of the issue may be the data imported from the database in the python script that may contain a 
dummy character messing up the h5ad file.
