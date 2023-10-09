# CellxGene Documentation

The project uses the CellxGene project display and explore the data. 
The full documentation of CellxGene can be found [here](https://github.com/chanzuckerberg/cellxgene) as well as a modified version of it called 
[CellxGene Gateway](https://github.com/Novartis/cellxgene-gateway) which is the one used as the visual tool.

## Installing cellxgene gateway

Compared to the classic version of cellxgene, cellxgene gateway allows multiple analysis to be run at 
the same time in parallel. The official guide to set up cellxgene gateway can be found [here](https://github.com/Novartis/cellxgene-gateway/blob/master/README.md)

Are some steps to keep in mind when creating a new project with cellxgene gateway:

- Creating a new python virtual environment (with anaconda) using the required dependancies (listed in the
environment.yml file present in the CellxGene Gateway github repo)

```bash
conda env create -f environment.yml
```

- Launch the virutal env and download cellgene-gateway in it

```bash
conda activate cellxgene-gateway
pip install cellxgene-gateway
```

Afterwards, the installation is complete.

## Launching cellxgene gateway

To visualize the data with RNAniseed, launching Cellxgene-Gateway is mendatory. To launch it 
simply activate the **cellxgene-gateway** virtual env with conda.

In the virutal environment, two variables needs to be exported:
- the cellxgene path
- the path to the directory containing the h5ad files

````bash
export CELLXGENE_DATA=../cellxgene_data  # change this directory if you put data in a different place.
export CELLXGENE_LOCATION=`which cellxgene
```

**The directory containing the h5ad files is in the API part of the project, in "api/app/external"**

launch Cellxgene Gateway with this command:

```bash
cellxgene-gateway
```

## Change launching parameters

By default launching CellxGene Gateway serve clients on a local url (localhost:5005). The host and port
as well as other parameters can be changed. Check the [official documentation](https://github.com/Novartis/cellxgene-gateway/blob/master/README.md#running-cellxgene-gateway) for more details.
