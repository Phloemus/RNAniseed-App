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

### Filtering the data

The main exploration and comparison features of the project rely on the flexibilty for the 
users to laverage filters upon the data. Filters rely on tags surrounding the sequencing 
data, so the metadata collected with the single cell RNA seq data should be used to make 
usefull tags.

### Important filters

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



### Requirements related

### Parterships (some scientists and ressources)

### Boundaries of the project















## Technical execution

### Technologies choosen and justifications

### 