# RNAniseed Specification Book

The RNAniseed specification book (*"cahier des charge"* in french) is a document listing 
the goals of the project, the public for whom the tool is design for and the technical 
specifications that are involved in the conception of the project.

## The public

The public of the project is the ascidian community and the scientific community at large 
with none or little background in informatics but who still want to explore and visualize 
large single cell RNAseq datasets. 

First the project will focus on the ascidian community and will be tight to the Aniseed 
database as a data provider of single cell RNA seq data. The proximity with the Aniseed 
database will allow to deploy a visualization tool that can be used easily by the ascidian
community. 

Later when the project will be mature enough and the visualization tool will be reworked 
in order to be reused by the scientific community more broadly by providing a simple 
integration with external databases.

## The Goals 

Visualisation of single cell RNA seq data require using R or python, which many biologists
are not familiar with. This is a pain point that prevent the adoption of single cell data 
exploration despite all the potential of this method for ascidian development. 

The main goal of this project is to eliminate this pain point by providing an easy to use 
visualization tool for biologist having none or little background in informatics.

In general, statistics and clusterization are performed on such large datasets. This is 
also the case for this tool, which makes the biologist able to identify clusters in the 
single cell data and filter them using a rich variety of filters.

The clusterization and the filters gives the RNAniseed tool two purposes: 

1. **Exploration of a dataset:** The user should be able to find a dataset to explore using 
                                 the virtual tool and navigate in the data easily using the 
                                 filters disponible to guid the data exploration

2. **Comparison of datasets:** The biologist should be able to compare visually two datasets
                               using the clusterisation as a visual indicator as well as the 
                               the level of gene expression and laveraging the filtration of 
                               certain parameters for more accurate dataset comparisons  

The main focus of the tool is to be easy to use. Developping a well designed user interface
and a solid link with all the databases serving as data providers will be mendatory for the 
success of the project.

## Project pieces 

RNAniseed serves as an iterface for the user between a database and a visual tool while 
giving some context as well as filters to use during the visualization process. The project 
is composed of 3 distinct parts: 

1. A database : the database has a collection of single cell data formated using a predifined
                schema or composed of documents to read. The database also include some 
                metadata (also called tags) that are used to query a part of the available 
                data or to realize filtrations during the visualization process in order for 
                the user to explore the data more efficiently and to observe paterns within
                the single cell RNA seq data

2. A query interface : the query interface allow the user to choose the mode of experiment 
                       the user wants to perform as well as selecting the data he wants to 
                       use for his experiment. The UI should be simple and encourage the 
                       biologist to select some criterias before launching a visualization
                       blindly with no clear goal in mind.

3. A visualization interface : the visualisation interface is a way for the user to have a 
                               clear picture of the data selected and to explore, find 
                               paterns or compare datasets using the filters on the data
                               displayed.

These 3 pieces of the project are detailed in specific sections of this specification book 
but the entire project rely on data filtration and data tagging to make sense, this is the 
topic discussed in the next section.

## Data filtration

The main exploration and comparison features of the project rely on the flexibilty for the 
users to laverage filters upon the data. Filters rely on tags surrounding the sequencing 
data, so the metadata collected with the single cell RNA seq data should be used to make 
usefull tags.

### Choosing the right filters

To ensure the usability of the project for a biologist, precise data filters should be 
laveraged. A filter is a data characteristic the user can use to exclude a part of the 
data from an exploration or a comparison process. 

Picking the right types of filters for the project is crutial for the usability and the 
stability of the project. As such, the implemented filters should fill in multiple 
characteristics : 

1. A filter should be self explanatory, easy to understand for biologist. Excluding any 
   statistical metrics to become a filter (At least for now. When the community will 
   have a better understanding of the underlying technics used for visualisation, 
   statistical filters might be implemented if the community needs these)

2. A filter should make sense biologically and should be compatible

3. A filter should rely on pre-annotated boolean tags. It would make sense that a tag
   could have a numerical value to be enter by the user and a threshold validation of 
   the tag will be computed but this method should be avoided in order the project 
   more usable of biologists

### Relevant tags and filters

Some relevant tags found for single cell RNA seq data are :

1. The Specie
2. The Dataset
3. The Cell Stage
4. The Cell Fate
5. The Cell Name within embryo
6. The Gene Expressed
7. The intensity of the Gene Expression

Filtering using these tags will help the community tremendously especially if the filters 
can be combined in a query or for data exploration purposes.

### Exploration Filters vs Query Filters

To explore available single cell data visually, using the entire database would be way to 
hard to start with. In order to counter this issue, some of the tags can be used as a 
primary filter to eliminate unwanted data even before the visualization process. 

The Specie, Dataset and Cell Stage tags are especially interesting for this primary database
query because it massively reduce the amount of data that the biologist have to work with and 
also force the end user to choose a preset of filters to guid his exploration right out the bat which require him to think a little bit about the exploration goals even before launching
the visualization process.

Thus, the Specie, Dataset and Cell Stage are called Query filters because of their used during the data selection phase before the visualization of the data occurs. These filters 
are required select a part of the data contained in the database. They also are required to launch a visualization process

The remaining tags will be used as Exploration Filters (aka filters that can be optionnally
used during the visualization of the data)



## Database Part

## Handeling the data

### Data structure




## Query Interface






## Visualisation Interface





### Requirements related

### Parterships (some scientists and ressources)