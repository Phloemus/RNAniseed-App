# RNAniseed Application : The single cell RNA seq visual tool

The RNAniseed Application is a tool allowing the ascidian community to explore large single cell 
RNA seq datasets visually. RNAniseed uses the Aniseed database making the exploration easier and 
more accurate.

The project is to ensure an easy way to explore single cell data as well as proposing a tool 
to centralize the datasets in order to improve the comparison potential of such data.

# How to use RNAniseed ?

RNAniseed is currently in developement. But the tool will soon be disponible on Aniseed website *(https://aniseed.fr)*
Anyone should have access to the visual tool as well as the public datasets uploaded by the community.

Using RNAniseed is easy:

1. Go on RNAniseed *(https://aniseed.fr/rnaniseed)*
2. Select the mode you want to use (**exploration** for 1 dataset, **comparison** for multiple datasets)
3. Indicate the **species**, the **datasets** and the **development cell stage** you want to investigate on
4. Hit the "Launch visualization" button
5. Explore the data as you want by using the **filters** disponible and the by looking for the expression of a **gene** or **geneset**

## Using the virtual tool 

The virtual tool of RNAniseed rely on cellxgene: an easy to use interface for single cell RNA seq exploration. This interface allow you to perform custom queries using the filters disponible on the 
left side bar.

Usually the main issue of single cell data is the lack of information needed to perform these kind of 
queries like the cell type, the development stage, metadata about genes etc...

To counter this problem, RNAniseed uses relevant data from Aniseed. This way, many more filters are disponible to perform a queries in the visual interface. 

## Possible queries using RNAniseed 

Earing about queries might scare you a bit as it often heavily related to informatics but performing a query doesn't need to be tedious. 

For instance, combining filters by clicking on the buttons of the left side bar of the visual interface is a way to query your data so easily. You might not even realized that you performed any kind of complicated query by doing so.

A query is performed when you select a filter, every cell in matching the selected filter will be highlighted in the visual interface. Colors may also help you to differenciate the different filters for each category.

## Concrete scenario

Let's say you want to investigate only on **A5 cells** disponible in a **specific dataset**. 

### Using the RNAniseed exploration mode

Even before your exploration you need to launch the virtual tool by filling the info about the dataset you want to use, the specie and the development stage. This phase before the visualization is important to help filter the data that might be valuable for your exploration and will prevent you to be lost in all the data available in Aniseed.

<p align="center" width="100%">
    <img width="60%" src="assets/readme/exploration-page.png">
</p>

As you are currently working on **Phallusia mammillata**, you select this specie the first associate dataset present in the list.

<p align="center" width="100%">
    <img width="60%" src="assets/readme/specie-dataset-selection.png">
</p>

Depending on the dataset you selected, different development stages will be displayed. Select those you are interested in. As you want to investigate on **A5 cells**, You want to select the 16 cell stage with any other stage that might be relevant to you as well. 

<p align="center" width="100%">
    <img width="60%" src="assets/readme/select-stage.png">
</p>

After all the fields have been filled in, just hit the "Launch visualization" button

The visualization takes some time to be launched but don't worry it takes at most 30 seconds. When you click on this button, the **RNAnissed** program filters only the relevant data from its database then this data is completed using the Aniseed database catching relevant informations such as genes names, functions etc... 

In a final step, a file is created containing all this information and displayed using the visualization tool. Everything is done automatically, don't worry about it.

### Using the virtual tool 

When the visualization tool is launched you should end up in a screen looking like this. If you know cellxgene a bit you might have notice some similarities. In fact, the visual tool used for RNAniseed is based on a modified version of cellxgene where some RNAniseed specific features have been added.




## Licence

RNAniseed is under MIT licence, check the details in the LICENCE.md file